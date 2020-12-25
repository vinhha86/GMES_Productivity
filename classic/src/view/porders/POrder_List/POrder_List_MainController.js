Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_MainController',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('POrder_ListStore');
        // store.sort('orderdate','DESC');
        var golivedatefrom = new Date(new Date().getTime() - 30*86400000);
        var golivedateto = new Date((new Date()).getFullYear(), (new Date()).getMonth()+6, 1);
        store.loadStoreBySearch("", "", "", "", null, null, null, 
            golivedatefrom, golivedateto, [1, 2, 3, 0, -1], 50, 1);

        this.onActivate();
    },
    control: {
        '#porderlistmain': {
            // activate: 'onActivate',
            itemdblclick: 'onitemdblclick',
        },
        '#btnTimKiem': {
            click: 'onBtnTimKiem'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
    },
    onActivate: function () {
        var me = this;
        var viewModel = this.getViewModel();

        var VendorStore = viewModel.getStore('POrder_ListVendorStore');
        VendorStore.loadStore();
        VendorStore.sort('vendorname','ASC');
        var BuyerStore = viewModel.getStore('POrder_ListBuyerStore');
        BuyerStore.loadStore();
        BuyerStore.sort('buyername','ASC');
        var ListStatusStore = viewModel.getStore('POrder_ListStatusStore');
        ListStatusStore.loadStore();
        var ListOrgStore = viewModel.getStore('ListOrgStore');
        ListOrgStore.loadStore(13, null);

        // var startField = this.lookupReference('startdate');
        // var endField = this.lookupReference('enddate');
        // startField.getPicker().monthYearFormat = 'm-Y';
        // endField.getPicker().monthYearFormat = 'm-Y';

        if (me.isActivate) {
            me.onloadPage();
        }
        me.isActivate = true;
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('POrder_ListStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('POrder_ListStore');
        //
        var pobuyer, povendor, style, contractcode, buyerid, vendorid, orderdatefrom, orderdateto;
        var golivedatefrom, golivedateto, status;
        if (me.down('#txtpobuyer').getValue() == "" || me.down('#txtpobuyer').getValue() == null) {
            pobuyer = "";
        }else pobuyer = me.down('#txtpobuyer').getValue();
        if (null==me.down('#txtpovendor') || me.down('#txtpovendor').getValue() == "") {
            povendor = "";
        }else povendor = me.down('#txtpovendor').getValue();
        if (me.down('#txtstyle').getValue() == "" || me.down('#txtstyle').getValue() == null) {
            style = "";
        }else style = me.down('#txtstyle').getValue();
        if (me.down('#txtcontractcode').getValue() == "" || me.down('#txtcontractcode').getValue() == null) {
            contractcode = "";
        }else contractcode = me.down('#txtcontractcode').getValue();
        if (me.down('#txtbuyerid').getValue() == "") {
            buyerid = null;
        }else buyerid = me.down('#txtbuyerid').getValue();
        if (me.down('#txtvendorid').getValue() == "") {
            vendorid = null;
        }else vendorid = me.down('#txtvendorid').getValue();
        if (me.down('#txtfactoryid').getValue() == "") {
            factoryid = null;
        }else factoryid = me.down('#txtfactoryid').getValue();
        // if (me.down('#txtdatefrom').getValue() == "") {
        //     orderdatefrom = null;
        // }else orderdatefrom = me.down('#txtdatefrom').getValue();
        // if (me.down('#txtdateto').getValue() == "") {
        //     orderdateto = null;
        // }else orderdateto = me.down('#txtdateto').getValue();
        if (me.down('#txtgolivedatefrom').getValue() == "") {
            golivedatefrom = null;
        }else golivedatefrom = me.down('#txtgolivedatefrom').getValue();
        if (me.down('#txtgolivedateto').getValue() == "") {
            golivedateto = null;
        }else golivedateto = me.down('#txtgolivedateto').getValue();
        if(me.down('#txtstatus').getValue() == null || me.down('#txtstatus').getValue() == ""){
            status = [];
        }else status = me.down('#txtstatus').getValue();
        var limit = me.down('#limitpage').getValue();
        var page = store.currentPage;
        if (limit == null) {
            limit = 50;
        }
        if (page == null) {
            page = 1;
        }
        store.loadStoreBySearch(pobuyer, povendor, style, contractcode,
            buyerid, vendorid, factoryid, 
            golivedatefrom, golivedateto, 
            status, limit, page);
    },
    onBtnTimKiem: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('POrder_ListStore');
        //
        var pobuyer, povendor, style, contractcode, buyerid, vendorid, orderdatefrom, orderdateto;
        var golivedatefrom, golivedateto, status;
        if (me.down('#txtpobuyer').getValue() == "" || me.down('#txtpobuyer').getValue() == null) {
            pobuyer = "";
        }else pobuyer = me.down('#txtpobuyer').getValue();
        if (null==me.down('#txtpovendor') || me.down('#txtpovendor').getValue() == "") {
            povendor = "";
        }else povendor = me.down('#txtpovendor').getValue();
        if (me.down('#txtstyle').getValue() == "" || me.down('#txtstyle').getValue() == null) {
            style = "";
        }else style = me.down('#txtstyle').getValue();
        if (me.down('#txtcontractcode').getValue() == "" || me.down('#txtcontractcode').getValue() == null) {
            contractcode = "";
        }else contractcode = me.down('#txtcontractcode').getValue();
        if (me.down('#txtbuyerid').getValue() == "") {
            buyerid = null;
        }else buyerid = me.down('#txtbuyerid').getValue();
        if (me.down('#txtvendorid').getValue() == "") {
            vendorid = null;
        }else vendorid = me.down('#txtvendorid').getValue();
        if (me.down('#txtfactoryid').getValue() == "") {
            factoryid = null;
        }else factoryid = me.down('#txtfactoryid').getValue();
        // if (me.down('#txtdatefrom').getValue() == "") {
        //     orderdatefrom = null;
        // }else orderdatefrom = me.down('#txtdatefrom').getValue();
        // if (me.down('#txtdateto').getValue() == "") {
        //     orderdateto = null;
        // }else orderdateto = me.down('#txtdateto').getValue();
        if (me.down('#txtgolivedatefrom').getValue() == "") {
            golivedatefrom = null;
        }else golivedatefrom = me.down('#txtgolivedatefrom').getValue();
        if (me.down('#txtgolivedateto').getValue() == "") {
            golivedateto = null;
        }else golivedateto = me.down('#txtgolivedateto').getValue();
        if(me.down('#txtstatus').getValue() == null || me.down('#txtstatus').getValue() == ""){
            status = [];
        }else status = me.down('#txtstatus').getValue();


        var limit = me.down('#limitpage').getValue();
        var page = 1;
        if (limit == null) {
            limit = 50;
        }
        // if (page == null) {
        //     page = 1;
        // }
        store.loadStoreBySearch(pobuyer, povendor, style, contractcode,
            buyerid, vendorid, factoryid, 
            golivedatefrom, golivedateto,
            status, limit, page);

            me.down('#topDock').setCollapsed(true);
    },
    // onPOBuyerFilterKeyup:function(){
    //     var grid = this.getView(),
    //         filterField = this.lookupReference('POBuyerFilter'),
    //         filters = this.getView().store.getFilters();

    //     if (filterField.value) {
    //         this.POBuyerFilter = filters.add({
    //             id: 'POBuyerFilter',
    //             property: 'po_buyer',
    //             value: filterField.value,
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //     }
    //     else if (this.POBuyerFilter) {
    //         filters.remove(this.POBuyerFilter);
    //         this.POBuyerFilter = null;
    //     }
    // },
    onitemdblclick: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("porderlistmain/" + id + "/edit");
    },
    onMenu_POrderList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Chuẩn bị sản xuất',
                reference: 'pprocess_productivity',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-bell yellowIcon',
                handler: function() {
                    var record = this.parentMenu.record;
                    if (record.get('status') > 0 && record.get('status') < 4){   // 2   
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Đổi trạng thái lệnh thành chuẩn bị sản xuất ?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            buttonText: {
                                yes: 'Có',
                                no: 'Không'
                            },
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    me.updatePorderStatus(record.data.id, 2);
                                }
                            }
                        });
                    }else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Trạng thái lệnh phải là Đã phân chuyền hoặc Công đoạn phụ',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }
            }, 
            {
                text: 'Kết thúc sản xuất',
                reference: 'pprocess_subprocess',
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-stop violetIcon',
                handler: function() {
                    var record = this.parentMenu.record;
                    // console.log(record.data.id);
                    if (record.get('status') > 4){     // 6
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Đổi trạng thái lệnh thành kết thúc sản xuất ?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            buttonText: {
                                yes: 'Có',
                                no: 'Không'
                            },
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    me.updatePorderStatus(record.data.id, 6);
                                }
                            }
                        });
                    }else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Trạng thái lệnh phải là đã sản xuất xong',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }
            }
        ]
        });
          // HERE IS THE MAIN CHANGE
          var position = [e.getX()-10, e.getY()-10];
          e.stopEvent();
          menu_grid.record = record;
          menu_grid.showAt(position);
    },
    updatePorderStatus: function(porderid_link, status){
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");
        var params = new Object();
        params.porderid_link = porderid_link;
        params.status = status;

        GSmartApp.Ajax.post('/api/v1/porder/updateStatus', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thành công",
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
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
})