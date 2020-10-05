Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_DetailViewController',
    init: function () {

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
        '#btnTTSanPham': {
            click: 'onTTSanPham'
        },
        '#btnTTDonHang': {
            click: 'onTTDonHang'
        },
        '#tabmain': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        if (newCard.xtype == "POrder_Tab_Info") {
            let infoView = me.down('#POrder_InfoView');
            infoView.IdPOrder = me.IdPOrder;
            infoView.getController().loadInfo(me.IdPOrder);

            let productSkuView = me.down('#POrder_ProductSKUView');
            productSkuView.IdPOrder = me.IdPOrder;
            productSkuView.getController().loadInfo(me.IdPOrder);
        }
        else if (newCard.xtype == "POrder_Tab_Grant") {
            let listGrantView = me.down('#POrder_List_GrantView');
            listGrantView.IdPOrder = me.IdPOrder;
            listGrantView.getController().loadInfo(me.IdPOrder);
        }
        else if(newCard.xtype == "PorderBom_TabColor"){
            var tab = Ext.getCmp('PorderBom_TabColor').getController();
            tab.createTab();
        }
        else if(newCard.xtype == "PorderSewingCost_View"){
            var storeSewing = viewmodel.getStore('PorderSewingCostStore');
            var porderid_link = viewmodel.get('porder.id');
            storeSewing.loadby_porder(porderid_link);
        }
        else if(newCard.xtype == "PorderProcessingDetail"){
            var POrderGrantStore = viewmodel.getStore('POrderGrantStore');
            var porderid_link = viewmodel.get('IdPOrder');
            POrderGrantStore.loadStoreByPOrderId(porderid_link);
        }
    },
    onLoadData: function (id) {
        let me = this.getView();
        let viewmodel = this.getViewModel();
        viewmodel.set('IdPOrder', id);

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
    },
    onQuayLai: function () {
        this.redirectTo('porderlistmain');
    },
    onTTSanPham: function(){
        // pcontractid_link
        let viewModel = this.getViewModel();
        let pcontractid_link = viewModel.get('porder').pcontractid_link;
        let productid_link = viewModel.get('porder').productid_link;
        // console.log(pcontractid_link);
        // console.log(viewModel.get('porder'));
        let window = Ext.create('GSmartApp.view.PContract.PContract_General_InfoView', {
            IdPContract: pcontractid_link,
            IdProduct: productid_link
        });
        window.show();
    },
    onTTDonHang: function(){
        // pcontract_poid_link
        let viewModel = this.getViewModel();
        let pcontract_poid_link = viewModel.get('porder').pcontract_poid_link;
        // console.log(pcontract_poid_link);
        let window = Ext.create('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main_Window', {
            viewModel: {
                data: {
                    id: pcontract_poid_link
                }
            }
        });
        window.show();
    },
})