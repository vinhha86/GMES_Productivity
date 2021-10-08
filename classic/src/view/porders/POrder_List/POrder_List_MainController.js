Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_MainController',
    isActivate: false,
    init: function () {
        var viewModel = this.getViewModel();

        var VendorStore = viewModel.getStore('POrder_ListVendorStore');
        VendorStore.loadStore(11);
        VendorStore.sort('vendorname', 'ASC');
        var BuyerStore = viewModel.getStore('POrder_ListBuyerStore');
        BuyerStore.loadStore(12);
        BuyerStore.sort('buyername', 'ASC');
        var ListStatusStore = viewModel.getStore('POrder_ListStatusStore');
        ListStatusStore.loadStore();
        var ListOrgStore = viewModel.getStore('ListOrgStore');
        ListOrgStore.loadStore(13, null);

        //
        var objSearchPorder = GSmartApp.util.State.get('objSearchPorder');
        if (objSearchPorder != null) {
            objSearchPorder.golivedatefrom = new Date(objSearchPorder.golivedatefrom);
            objSearchPorder.golivedateto = new Date(objSearchPorder.golivedateto);
            viewModel.set('objSearch', objSearchPorder);
            GSmartApp.util.State.set('objSearchPorder', null);
        }else{
            viewModel.set('objSearch.golivedatefrom', new Date(new Date().getTime() - 30 * 86400000));
            viewModel.set('objSearch.golivedateto', new Date((new Date()).getFullYear(), (new Date()).getMonth() + 6, 1));
        }
    },
    control: {
        '#porderlistmain': {
            // activate: 'onActivate',
            itemdblclick: 'onitemdblclick',
        },
        '#btnTimKiem': {
            click: 'onBtnTimKiem'
        },
    },
    listen: {
        store: {
            'POrder_ListStore': {
                'loadStoreBySearch_Done': 'onloadStoreBySearch_Done'
            }
        }
    },
    onloadStoreBySearch_Done: function () {
        this.getView().setLoading(false);
    },
    
    onBtnTimKiem: function () {
        var me = this.getView();
        me.setLoading("Đang tải dữ liệu");

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('POrder_ListStore');
        //

        var objSearch = viewModel.get('objSearch'); // console.log(objSearch);
        var pobuyer = objSearch.pobuyer;
        var povendor = objSearch.povendor;
        var style = objSearch.style;
        var contractcode = objSearch.contractcode;
        var buyerid = objSearch.buyerid;
        var vendorid = objSearch.vendorid;
        var factoryid = objSearch.factoryid;
        var orderdatefrom = objSearch.orderdatefrom;
        var orderdateto = objSearch.orderdateto;
        var golivedatefrom = objSearch.golivedatefrom;
        var golivedateto = objSearch.golivedateto;
        var status = objSearch.status;

        if (pobuyer == "" || pobuyer == null) {
            pobuyer = "";
        }
        if (povendor == "" || povendor == null) {
            povendor = "";
        }
        if (style == "" || style == null) {
            style = "";
        }
        if (contractcode == "" || contractcode == null) {
            contractcode = "";
        }
        if (buyerid == "") {
            buyerid = null;
        }
        if (vendorid == "") {
            vendorid = null;
        }
        if (factoryid == "") {
            factoryid = null;
        }
        if (golivedatefrom == "") {
            golivedatefrom = null;
        }
        if (golivedateto == "") {
            golivedateto = null;
        }
        if (status == null || status == "") {
            status = [];
        }

        store.loadStoreBySearch(pobuyer, povendor, style, contractcode,
            buyerid, vendorid, factoryid,
            golivedatefrom, golivedateto,
            status, 500, 1);
    },
    onitemdblclick: function (m, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        var objSearch = viewModel.get('objSearch');
        GSmartApp.util.State.set('objSearchPorder', objSearch);
        console.log(objSearch);

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
                    handler: function () {
                        if (record.get('status') > 0 && record.get('status') < 4) {   // 2   
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
                        } else {
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
                    handler: function () {
                        // console.log(record.data.id);
                        if (record.get('status') > 4) {     // 6
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
                        } else {
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
                },
                {
                    text: 'Kế hoạch cắt',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-cut violetIcon',
                    handler: function () {
                        me.onCutPlan(record);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.showAt(position);
    },
    onCutPlan: function (record) {
        console.log(record);
        var viewmodel = this.getViewModel();
        var porderid_link = record.get('id');

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Kế hoạch cắt',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'CutPlan_MainView',
                viewModel: {
                    data: {
                        porderid_link: porderid_link,
                        porder: record.data
                    }
                }
            }]
        });
        form.show();

        form.down('#CutPlan_MainView').getController().on('Thoat', function () {
            form.close();
        })
    },
    updatePorderStatus: function (porderid_link, status) {
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
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onOrderCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POrder_ListStore = viewmodel.get('POrder_ListStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('ordercodeFilterField'),
            filters = POrder_ListStore.getFilters();

        if (filterField.value) {
            this.ordercodeFilter = filters.add({
                id: 'ordercodeFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ordercodeFilter) {
            filters.remove(this.ordercodeFilter);
            this.ordercodeFilter = null;
        }
    },
    onStyleBuyerFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POrder_ListStore = viewmodel.get('POrder_ListStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('stylebuyerFilterField'),
            filters = POrder_ListStore.getFilters();

        if (filterField.value) {
            this.stylebuyerFilter = filters.add({
                id: 'stylebuyerFilter',
                property: 'stylebuyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stylebuyerFilter) {
            filters.remove(this.stylebuyerFilter);
            this.stylebuyerFilter = null;
        }
    },
    onPo_BuyerFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POrder_ListStore = viewmodel.get('POrder_ListStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('po_buyerFilterField'),
            filters = POrder_ListStore.getFilters();

        if (filterField.value) {
            this.po_buyerFilter = filters.add({
                id: 'po_buyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.po_buyerFilter) {
            filters.remove(this.po_buyerFilter);
            this.po_buyerFilter = null;
        }
    },
})