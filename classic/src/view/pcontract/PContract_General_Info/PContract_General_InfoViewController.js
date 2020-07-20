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
        storepair.loadStore(me.IdPContract);
    },

    disableInfoViewBtn: function(){
        let me = this.getView();
        let viewmodel = this.getViewModel();
        let infoView = me.down('#PContractInfoView');
        infoView.down('#contractcode').setReadOnly(true);
        infoView.down('#contractdate').setReadOnly(true);
        infoView.down('#confirmdate').setReadOnly(true);
        infoView.down('#orgbuyerid_link').setReadOnly(true); // duplicate id
        infoView.down('#orgvenderid_link').setReadOnly(true);
        infoView.down('#contracttypeid_link').setReadOnly(true);
        infoView.down('#orgpayerid_link').setReadOnly(true); // duplicate id
        infoView.down('#orgshowid_link').setReadOnly(true);
        infoView.down('#market').setReadOnly(true);
        infoView.down('#contractcode').setReadOnly(true);
    },

    disableListProductViewBtn: function(){
        let me = this.getView();
        let viewmodel = this.getViewModel();
        let listProductView = me.down('#PContractListProductView');
        listProductView.down('#btnThemMoi').setVisible(false);
        let col = listProductView.getColumns()[6];
        col.hide();
    },

    disablePairProductViewBtn: function(){
        let me = this.getView();
        let viewmodel = this.getViewModel();
        let pairProductView = me.down('#PContractPairProductView');
        pairProductView.down('#btnThemMoi').setVisible(false);
        let col = pairProductView.getColumns()[2];
        col.hide();
        let cellEditing = pairProductView.getPlugins()[0];
        cellEditing.destroy();
    },

    disableDocumentViewBtn: function(){
        
    },

    disableAttributeViewBtn: function(){
        let me = this.getView();
        let viewmodel = this.getViewModel();
        let attributeView = me.down('#PContractAttributeView');
        attributeView.down('#btnThemMoi').setVisible(false);
        let col = attributeView.getColumns()[2];
        col.hide();
    },
})