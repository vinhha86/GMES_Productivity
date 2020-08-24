Ext.define('GSmartApp.view.pcontract.PContract_General_InfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_General_InfoViewController',
    init: function () {
        let me = this.getView();

        this.loadStoreForPopUpWindow();
        this.loadDataForPopUpWindow();
        this.disableInfoViewBtn();
        this.disableListProductViewBtn();
        this.disablePairProductViewBtn();
        this.disableDocumentViewBtn();
        this.disableAttributeViewBtn();

        common.Check_Object_Permission();
    },


    loadStoreForPopUpWindow: function(){
        let me = this.getView();
        let viewmodel = this.getViewModel();

        let KHStore = viewmodel.getStore('CustomerStore');
        let VenderStore = viewmodel.getStore('Vender');
        let EndBuyerStore = viewmodel.getStore('EndBuyer');
        let BranchStore = viewmodel.getStore('BranchStore');
        let SeasonStore = viewmodel.getStore('SeasonStore');
        let UnitStore = viewmodel.getStore('UnitStore');
        let MarketStore = viewmodel.getStore('MarketStore');
        let PContractTypeStore = viewmodel.getStore('ContractTypes');

        KHStore.loadStore(10, false);
        VenderStore.loadStore(11, false);
        EndBuyerStore.loadStore(12, false);
        BranchStore.loadStore(false);
        SeasonStore.loadStore(false);
        UnitStore.loadStore();
        MarketStore.loadStore(1);
        PContractTypeStore.loadStore();
    },

    loadDataForPopUpWindow: function(){
        let me = this.getView();
        let viewmodel = this.getViewModel();

        // window.IdPContract = 34;

        let infoView = me.down('#PContractInfoView');
        infoView.IdPContract = me.IdPContract;
        infoView.getController().loadInfo(me.IdPContract);

        let listProducView = me.down('#PContractListProductView');
        listProducView.IdPContract = me.IdPContract;

        let productpair = me.down('#PContractPairProductView');
        productpair.IdPcontract = me.IdPContract;

        let storepair = viewmodel.getStore('PContractProductPairStore');
        let store = viewmodel.getStore('PContractProductStore');
        store.loadStore(me.IdPContract);
        store.getFilters().add({
            property: 'productid_link',
            value: me.IdProduct,
            exactMatch: true
        });
        storepair.loadStore(me.IdPContract);
    },

    disableInfoViewBtn: function(){
        let me = this.getView();
        let infoView = me.down('#PContractInfoView');
        if (infoView.down('#contractcode') != null) infoView.down('#contractcode').setReadOnly(true);
        if (infoView.down('#contractdate') != null) infoView.down('#contractdate').setReadOnly(true);
        if (infoView.down('#confirmdate') != null) infoView.down('#confirmdate').setReadOnly(true);
        if (infoView.down('#orgbuyerid_link') != null) infoView.down('#orgbuyerid_link').setReadOnly(true); // duplicate id
        if (infoView.down('#orgvenderid_link') != null) infoView.down('#orgvenderid_link').setReadOnly(true);
        if (infoView.down('#contracttypeid_link') != null) infoView.down('#contracttypeid_link').setReadOnly(true);
        if (infoView.down('#orgpayerid_link') != null) infoView.down('#orgpayerid_link').setReadOnly(true); // duplicate id
        if (infoView.down('#orgshowid_link') != null) infoView.down('#orgshowid_link').setReadOnly(true);
        if (infoView.down('#market') != null) infoView.down('#market').setReadOnly(true);
        if (infoView.down('#contractcode') != null) infoView.down('#contractcode').setReadOnly(true);
    },

    disableListProductViewBtn: function(){
        let me = this.getView();
        let listProductView = me.down('#PContractListProductView');
        if(listProductView.down('#btnAddProduct_PContractListProductView') != null) listProductView.down('#btnAddProduct_PContractListProductView').setVisible(false);
        let col = listProductView.getColumns()[5];
        if (col) col.hide();
    },

    disablePairProductViewBtn: function(){
        let me = this.getView();
        let pairProductView = me.down('#PContractPairProductView');
        if(pairProductView.down('#btnPair_PContractPairProductView') != null) pairProductView.down('#btnPair_PContractPairProductView').setVisible(false);
        let col = pairProductView.getColumns()[2];
        col.hide();
        let cellEditing = pairProductView.getPlugins()[0];
        if (cellEditing) cellEditing.destroy();
    },

    disableDocumentViewBtn: function(){
        let me = this.getView();
        let listDocumentView = me.down('#PContractDocumentView');
        if(listDocumentView.down('#btnDoc_PContractDocumentView') != null) listDocumentView.down('#btnDoc_PContractDocumentView').setVisible(false);
    },

    disableAttributeViewBtn: function(){
        let me = this.getView();
        let attributeView = me.down('#PContractAttributeView');
        if(attributeView.down('#btnThemMoi') != null) attributeView.down('#btnThemMoi').setVisible(false);
        let col = attributeView.getColumns()[2];
        if (col) col.hide();
    },
})