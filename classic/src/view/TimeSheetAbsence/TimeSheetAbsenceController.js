Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsenceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetAbsenceController',
    init: function () {
        var viewModel = this.getViewModel();
        // this.onloadPage();

        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.loadStore();

        var ListOrgStore = viewModel.getStore('ListOrgStore');
        ListOrgStore.loadStore(13, null);
        var TimeSheetAbsenceTypeStore = viewModel.getStore('TimeSheetAbsenceTypeStore');
        TimeSheetAbsenceTypeStore.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        },
        '#TimeSheetAbsence': {
            itemdblclick: 'onCapNhatdbl'
        }
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa đăng ký nghỉ này ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id);
                }
            }
        });
    },
    Xoa: function (id) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/timesheetabsence/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });

                    var store = me.getStore();
                    store.load();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onloadPage: function() {
        var me = this.getView();

        var viewModel = this.getViewModel();
        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');

        var limit = me.down('#limitpage').getValue();
        var orgFactory = me.down('#orgFactoryList').getValue();
        var personnelCode = me.down('#personnelCode').getValue();
        var personnelName = me.down('#personnelName').getValue();
        var datefrom = me.down('#datefrom').getValue();
        var dateto = me.down('#dateto').getValue();
        var timeSheetAbsenceType = me.down('#timeSheetAbsenceTypeList').getValue();

        var page = TimeSheetAbsenceStore.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (orgFactory == null) {
            orgFactory = 0;
        }

        if (personnelCode == null) {
            personnelCode = "";
        }

        if (personnelName == null) {
            personnelName = "";
        }

        if (datefrom == null) {
            datefrom = null;
        }

        if (dateto == null) {
            dateto = null;
        }

        if (timeSheetAbsenceType == null) {
            timeSheetAbsenceType = 0;
        }

        TimeSheetAbsenceStore.loadStore_ByPage(limit, page, 
            orgFactory, personnelCode, personnelName, datefrom, dateto, timeSheetAbsenceType
            );
            
    },
    onThemMoi: function(){
        var viewModel = this.getViewModel();
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 700,
            closable: true,
            title: 'Đăng ký nghỉ, vắng mặt',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TimeSheetAbsenceDetail',
                viewModel: {
                    type: 'TimeSheetAbsenceDetailViewModel',
                    data: {
                        id: 0
                    }
                }
            }]
        });
        form.show();
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts) {
        var id = record.data.id;
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 700,
            closable: true,
            title: 'Chi tiết nghỉ, vắng mặt',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TimeSheetAbsenceDetail',
                viewModel: {
                    type: 'TimeSheetAbsenceDetailViewModel',
                    data: {
                        id: id,
                        isBtnConfirmHidden: false
                    }
                }
            }]
        });
        form.show();
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 700,
            closable: true,
            title: 'Chi tiết nghỉ, vắng mặt',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TimeSheetAbsenceDetail',
                viewModel: {
                    type: 'TimeSheetAbsenceDetailViewModel',
                    data: {
                        id: id
                    }
                }
            }]
        });
        form.show();
    },
})