Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsenceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetAbsenceController',
    init: function () {
        var viewmodel = this.getViewModel();
        // this.onloadPage();

        var TimeSheetAbsenceStore = viewmodel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        // '#btnTimKiem': {
        //     click: 'onloadPage'
        // },
        '#TimeSheetAbsence': {
            itemdblclick: 'onCapNhatdbl'
        }
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var contract_code = rec.get('contract_code');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa hợp đồng "' + contract_code + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id, rec);
                }
            }
        });
    },
    Xoa: function (id, rec) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/contractbuyer/delete', Ext.JSON.encode(params),
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
                    store.remove(rec);
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
    // onloadPage: function () {
    //     var viewmodel = this.getViewModel();
    //     var ContractBuyerStore = viewmodel.getStore('ContractBuyerStore');
    //     ContractBuyerStore.loadStore();

    //     var EndBuyer = viewmodel.getStore('EndBuyer');
    //     var Vendor = viewmodel.getStore('Vendor');
    //     EndBuyer.loadStore(12);
    //     EndBuyer.sort('code','ASC');
    //     Vendor.loadStore(11);
    //     Vendor.sort('code','ASC');

    //     var ContractBuyerYearsStore = viewmodel.getStore('ContractBuyerYearsStore');
    //     ContractBuyerYearsStore.loadYearsStore();

    //     var contract_datefrom = this.lookupReference('contract_datefrom');
    //     contract_datefrom.getPicker().monthYearFormat = 'm-Y';
    //     var contract_dateto = this.lookupReference('contract_dateto');
    //     contract_dateto.getPicker().monthYearFormat = 'm-Y';
    // },
    onloadPage: function() {
        var me = this.getView();

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('ContractBuyerStore');

        var limit = me.down('#limitpage').getValue();
        var contract_code = me.down('#contract_code').getValue();
        var contract_year = me.down('#contract_year').getValue();
        var contract_datefrom = me.down('#contract_datefrom').getValue();
        var contract_dateto = me.down('#contract_dateto').getValue();
        var buyerid_link = me.down('#buyerid_link').getValue();
        var vendorid_link = me.down('#vendorid_link').getValue();

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (contract_code == null) {
            contract_code = "";
        }

        if (contract_year == null) {
            contract_year = null;
        }

        if (contract_datefrom == null) {
            contract_datefrom = null;
        }

        if (contract_dateto == null) {
            contract_dateto = null;
        }

        if (buyerid_link == null) {
            buyerid_link = 0;
        }

        if (vendorid_link == null) {
            vendorid_link = 0;
        }

        store.loadStore_ByPage(limit, page, contract_code, contract_year, contract_datefrom,
            contract_dateto, buyerid_link, vendorid_link);
            
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