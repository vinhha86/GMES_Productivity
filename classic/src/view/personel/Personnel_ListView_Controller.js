Ext.define('GSmartApp.view.personel.Personnel_ListView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_ListView_Controller',
    init: function () {

    },
    control: {
        '#btnThemMoi_Personnel': {
            click: 'onThemMoi'
        },
        '#Personnel_ListView': {
            itemdblclick: 'onitemdblclick'
        },
        '#btnPrint_Personnel': {
            click: 'onPrint'
        },
        '#fileUpload': {
            change: 'onSelect'
        },
        '#splbtn_Upload': {
            click: 'onUpload'
        },
    },
    onUpload: function () {
        var viewmodel = this.getViewModel();
        var me = this.getView();
        var donvi=viewmodel.get('donvi.id');
        if(!donvi){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: "Bạn chưa chọn đơn vị!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        }else{
            me.down('#fileUpload').fileInputEl.dom.click();
        }
    },
    onSelect: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('orgmanageid_link', viewmodel.get('donvi.id'));
        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/upload_personnel/personnel', data, 3 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Upload Thành Công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                        //load lai ds
                        var store = viewmodel.getStore('Personnel_Store');
                        store.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                }
            })
       
    },

    onPrint: function () {
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        var select = grid.getSelectionModel().getSelection();
        if (select.length > 0)
            GSmartApp.ux.grid.print_test.print(select);
    },
    onThemMoi: function () {
        var viewModel = this.getViewModel();
        var data = new Object();
        data.id = null;

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới nhân viên',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .85,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Personnel_info_main',
                viewModel: {
                    data: {
                        personnel: data
                    }
                }
            }]
        });
        form.show();
        form.down('#code').focus();

        form.down('Personnel_info_main').getController().on('Thoat', function () {
            var store = viewModel.getStore('Personnel_Store');
            store.load();
            form.close();
        });
    },
    onEdit: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.showEditForm(rec);
    },
    onitemdblclick: function (m, record, item, index, e, eOpts) {
        console.log(record);
        this.showEditForm(record);
    },
    showEditForm: function (rec) {
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Cập nhật nhân viên',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .85,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Personnel_info_main',
                viewModel: {
                    data: {
                        personnel: rec.data
                    }
                }
            }]
        });
        form.show();
        form.down('#code').focus();

        form.down('Personnel_info_main').getController().on('Thoat', function () {
            var store = viewModel.getStore('Personnel_Store');
            store.load();
            form.close();
        });
    }
})