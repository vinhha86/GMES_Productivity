Ext.define('GSmartApp.view.HandoverPackFromLine.HandoverPackFromLineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverPackFromLineController',
    init: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var HandoverStore = viewModel.getStore('HandoverStore');
        // HandoverStore.loadStoreByType(1, 0); // type, in_out
        HandoverStore.loadStoreBySearch(4, '', 
            null, null, null, null, [1], 25, 1);
        //
        var ListOrgStoreFrom = viewModel.getStore('ListOrgStoreFrom');
        var orgtypestring = '14';
        ListOrgStoreFrom.loadStoreByOrgTypeString(orgtypestring);
        ListOrgStoreFrom.getSorters().remove('id');
        ListOrgStoreFrom.getSorters().add('parentid_link');
        ListOrgStoreFrom.getSorters().add('name');
        //
        var ListOrgStoreTo = viewModel.getStore('ListOrgStoreTo');
        var orgtypestring2 = '20';
        ListOrgStoreTo.loadStoreByOrgTypeString(orgtypestring2);
        ListOrgStoreTo.getSorters().remove('id');
        ListOrgStoreTo.getSorters().add('parentid_link');
        ListOrgStoreTo.getSorters().add('name');
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        },
        '#handover_pack_fromline': {
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
    onSearch: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('HandoverStore');
        //
        var handovertypeid_link = 4;
        var ordercode, handover_datefrom, handover_dateto, orgid_from_link, orgid_to_link, status;
        if (me.down('#ordercode').getValue() == "") {
            ordercode = null;
        }else ordercode = me.down('#ordercode').getValue();
        if (me.down('#handover_datefrom').getValue() == "") {
            handover_datefrom = null;
        }else handover_datefrom = me.down('#handover_datefrom').getValue();
        if (me.down('#handover_dateto').getValue() == "") {
            handover_dateto = null;
        }else handover_dateto = me.down('#handover_dateto').getValue();
        if (me.down('#orgid_from_link').getValue() == "") {
            orgid_from_link = null;
        }else orgid_from_link = me.down('#orgid_from_link').getValue();
        if (me.down('#orgid_to_link').getValue() == "") {
            orgid_to_link = null;
        }else orgid_to_link = me.down('#orgid_to_link').getValue();
        // if(me.down('#status').getValue() == null || me.down('#status').getValue() == ""){
        //     status = [];
        // }else status = me.down('#status').getValue();

        var limit = me.down('#limitpage').getValue();
        var page = store.currentPage;
        if (limit == null) {
            limit = 25;
        }
        if (page == null) {
            page = 1;
        }
        store.loadStoreBySearch(handovertypeid_link, ordercode, 
            handover_datefrom, handover_dateto, orgid_from_link, orgid_to_link, [1], limit, page);
    },
    onThemMoi: function (m, record) {
        // this.redirectTo("handover_cut_toline/" + 0 + "/edit");
        this.redirectTo("handover_pack_fromline/" + 0 + "/edit");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("handover_pack_fromline/" + id + "/edit");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("handover_pack_fromline/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
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

        GSmartApp.Ajax.post('/api/v1/handover/delete', Ext.JSON.encode(params),
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