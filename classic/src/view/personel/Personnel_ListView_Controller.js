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
        }
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