Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_DetailViewController',
    init: function () {
        // this.onActivate();
        // if (this.getView().IdPContract > 0){
        //    this.onLoadData(this.getView().IdPContract,null);
        //    dockBottomBar = this.lookupReference('dockBottomBar');
        //    dockBottomBar.setHidden(true);
        // }
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        // '#btnLuu': {
        //     click: 'onLuu'
        // },
        // '#PContractView': {
        //     activate: 'onActivate'
        // },
        '#tabmain': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        let me = this.getView();
        if (newCard.xtype == "POrder_Tab_Info") {
            let infoView = me.down('#POrder_InfoView');
            infoView.IdPOrder = me.IdPOrder;
            infoView.getController().loadInfo(me.IdPOrder);

            let productSkuView = me.down('#POrder_ProductSKUView');
            productSkuView.IdPOrder = me.IdPOrder;
            productSkuView.getController().loadInfo(me.IdPOrder);
        }
        if (newCard.xtype == "POrder_Tab_Grant") {
            let listGrantView = me.down('#POrder_List_GrantView');
            listGrantView.IdPOrder = me.IdPOrder;
            listGrantView.getController().loadInfo(me.IdPOrder);
        }
        // let viewmodel = this.getViewModel();
        // if (newCard.xtype == "PContractProduct_BomColor_MainView") {
        //     viewmodel.set('ishiddenActionColumn', true);
        // }
        // else {
        //     viewmodel.set('ishiddenActionColumn', false);
        //     if(newCard.xtype == 'PContract_PO_Main'){
        //         var storeproduct = viewmodel.getStore('PContractProductTreeStore');
        //         storeproduct.loadStore(viewmodel.get('PContract.id'));
        //     } else {
        //         if(newCard.xtype == 'PContractSKUMainView'){
        //             var productFilterStore = viewmodel.getStore('ProductFilterStore');
        //             productFilterStore.loadStore_pair_andnotpair(viewmodel.get('PContract.id'));

        //             var PContractPOList = viewmodel.getStore('PContractPOList');
        //             PContractPOList.loadLeafOnly(viewmodel.get('PContract.id'), viewmodel.get('IdProduct_filterPO'));
                    
        //         } 
        //         else if (newCard.xtype == 'PContract_POrder_Main') {
        //             viewmodel.set('po_selected', null);
        //             var productFilterStore = viewmodel.getStore('ProductFilterStore');
        //             productFilterStore.loadStore_pair_andnotpair(viewmodel.get('PContract.id'));

        //             var PContractPOList = viewmodel.getStore('PContractPOList');
        //             PContractPOList.loadLeafOnly(viewmodel.get('PContract.id'), viewmodel.get('IdProduct_filterPO'));
        //         } 
        //         else if (newCard.xtype == 'PContractProduct_Bom2_TabColorView') {
        //            var tab = Ext.getCmp('PContractProduct_Bom2_TabColorView');
        //            tab.getController().onChangeProduct();
        //         } 
        //         else if (newCard.xtype == 'PContractProduct_Bom_TabColorView') {
        //             var tab = Ext.getCmp('PContractProduct_Bom_TabColorView');
        //             tab.getController().onChangeProduct();
        //         }
        //     }
        // }
    },
    onLoadData: function (id) {
        let me = this.getView();

        me.IdPOrder = id;

        let infoView = me.down('#POrder_InfoView');
        infoView.IdPOrder = id;
        infoView.getController().loadInfo(me.IdPOrder);

        let productSkuView = me.down('#POrder_ProductSKUView');
        productSkuView.IdPOrder = id;
        productSkuView.getController().loadInfo(me.IdPOrder);

        let listGrantView = me.down('#POrder_List_GrantView');
        listGrantView.IdPOrder = id;
        listGrantView.getController().loadInfo(me.IdPOrder);
        
        // var productpair = me.down('#PContractPairProductView');
        // productpair.IdPcontract = id;

        // var storepair = viewmodel.getStore('PContractProductPairStore');
        // var store = viewmodel.getStore('PContractProductStore');
        // if (id > 0) {
        //     store.loadStore(id);
        //     storepair.loadStore(id);
        // }
        // else {
        //     store.removeAll();
        // }
    },
    onQuayLai: function () {
        this.redirectTo('porderlistmain');
    },
    // onActivate: function () {
    //     var me = this.getView();
    //     var viewmodel = this.getViewModel();

    //     var KHStore = viewmodel.getStore('CustomerStore');
    //     var VenderStore = viewmodel.getStore('Vender');
    //     var EndBuyerStore = viewmodel.getStore('EndBuyer');
    //     var BranchStore = viewmodel.getStore('BranchStore');
    //     var SeasonStore = viewmodel.getStore('SeasonStore');
    //     var UnitStore = viewmodel.getStore('UnitStore');
    //     var MarketStore = viewmodel.getStore('MarketStore');
    //     var PContractTypeStore = viewmodel.getStore('ContractTypes');

    //     KHStore.loadStore(10, false);
    //     VenderStore.loadStore(11, false);
    //     EndBuyerStore.loadStore(12, false);
    //     BranchStore.loadStore(false);
    //     SeasonStore.loadStore(false);
    //     UnitStore.loadStore();
    //     MarketStore.loadStore(1);
    //     PContractTypeStore.loadStore();
    // },
    // onLuu: function () {
    //     var me = this.getView();
    //     me.setLoading("Đang lưu dữ liệu");

    //     var t = this;
    //     var viewmodel = this.getViewModel();

    //     var params = new Object();
    //     var data = new Object();

    //     data = viewmodel.get('PContract');
    //     data.id = me.IdPContract;
    //     data.orgrootid_link = 0;
    //     data.status = 1;
    //     data.usercreatedid_link = 0;
    //     data.datecreated = '';

    //     if(data.payer == 1){
    //         data.orgpayerid_link = data.orgvendorid_link;
    //         data.orgshowid_link = data.orgvendorid_link;
    //     }            
    //     else{
    //         data.orgpayerid_link = data.orgbuyerid_link;
    //         data.orgshowid_link = data.orgbuyerid_link;
    //     }

    //     if(data.orgshow == 1){
    //         data.orgshowid_link = data.orgvendorid_link;
    //     }            
    //     else{
    //         data.orgshowid_link = data.orgbuyerid_link;
    //     }

    //     params.data = data;
    //     params.msgtype = "PContract_CREATE";
    //     params.message = "Tạo đơn hàng";

    //     GSmartApp.Ajax.post('/api/v1/pcontract/create', Ext.JSON.encode(params),
    //         function (success, response, options) {
    //             if (success) {
    //                 var response = Ext.decode(response.responseText);
    //                 if (response.respcode == 200) {
    //                     Ext.MessageBox.show({
    //                         title: "Thông báo",
    //                         msg: "Lưu thành công",
    //                         buttons: Ext.MessageBox.YES,
    //                         buttonText: {
    //                             yes: 'Đóng',
    //                         }
    //                     });

    //                     if (data.id == 0) {
    //                         t.redirectTo("lspcontract/" + response.id + "/edit");
    //                     }
    //                 }
    //                 else {
    //                     Ext.MessageBox.show({
    //                         title: "Thông báo",
    //                         msg: response.message,
    //                         buttons: Ext.MessageBox.YES,
    //                         buttonText: {
    //                             yes: 'Đóng',
    //                         }
    //                     });
    //                     var viewInfo = me.down('#PContractInfoView');
    //                     viewInfo.down('#contractcode').focus();
    //                 }

    //             } else {
    //                 Ext.MessageBox.show({
    //                     title: "Thông báo",
    //                     msg: "Lưu thất bại",
    //                     buttons: Ext.MessageBox.YES,
    //                     buttonText: {
    //                         yes: 'Đóng',
    //                     }
    //                 });
    //             }
    //             me.setLoading(false);
    //         })
    // }     
})