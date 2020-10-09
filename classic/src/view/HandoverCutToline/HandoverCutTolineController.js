Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutTolineController',
    init: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var HandoverStore = viewModel.getStore('HandoverStore');
        HandoverStore.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#handover_cut_toline': {
            itemdblclick: 'onCapNhatdbl'
        }
    },
    // onActivate: function () {
    //     var me = this;
    //     if (me.isActivate) {
    //         this.onloadPage();
    //     }
    //     me.isActivate = true;
    // },
    onThemMoi: function (m, record) {
        // this.redirectTo("handover_cut_toline/" + 0 + "/edit");
        this.redirectTo("handover_cut_toline/" + 0 + "/edit");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("handover_cut_toline/" + id + "/edit");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("handover_cut_toline/" + id + "/edit");
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
    onloadPage: function() {
        // var me = this.getView();

        // var viewmodel = this.getViewModel();
        // var store = viewmodel.getStore('ContractBuyerStore');

        // var limit = me.down('#limitpage').getValue();
        // var contract_code = me.down('#contract_code').getValue();
        // var contract_year = me.down('#contract_year').getValue();
        // var contract_datefrom = me.down('#contract_datefrom').getValue();
        // var contract_dateto = me.down('#contract_dateto').getValue();
        // var buyerid_link = me.down('#buyerid_link').getValue();
        // var vendorid_link = me.down('#vendorid_link').getValue();

        // var page = store.currentPage;

        // if (limit == null) {
        //     limit = 25;
        // }

        // if (page == null) {
        //     page = 1;
        // }

        // if (contract_code == null) {
        //     contract_code = "";
        // }

        // if (contract_year == null) {
        //     contract_year = null;
        // }

        // if (contract_datefrom == null) {
        //     contract_datefrom = null;
        // }

        // if (contract_dateto == null) {
        //     contract_dateto = null;
        // }

        // if (buyerid_link == null) {
        //     buyerid_link = 0;
        // }

        // if (vendorid_link == null) {
        //     vendorid_link = 0;
        // }

        // store.loadStore_ByPage(limit, page, contract_code, contract_year, contract_datefrom,
        //     contract_dateto, buyerid_link, vendorid_link);
            
    }
})