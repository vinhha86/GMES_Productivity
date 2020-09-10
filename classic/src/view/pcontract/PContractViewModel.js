Ext.define('GSmartApp.view.pcontract.PContractViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContractViewModel',
    requires: ['GSmartApp.store.pcontract.PContractStore', 
            'GSmartApp.store.org.ListOrgStore',
            'GSmartApp.branch.BranchStore',
            'GSmartApp.season.SeasonStore',
            'GSmartApp.store.pcontract.PContractProductStore',
            'GSmartApp.store.pcontract.PContractAttributeValueStore',
            'GSmartApp.store.pcontract.PContractProductColorStore',
            'GSmartApp.store.pcontract.PContractDocumentStore',
            'GSmartApp.store.pcontract.PContractSKUStore',
            'GSmartApp.store.pcontract.PContractProductBomStore', 
            'GSmartApp.store.pcontract.PContractProductBom2Store',
            'GSmartApp.store.product.ProductStore',
            'GSmartApp.store.product.ProductTypeStore',
            'GSmartApp.store.unit.UnitStore',
            'GSmartApp.store.pcontract.PContractProductPairStore',
            'GSmartApp.store.pcontract.PContractBomColorStore',
            'GSmartApp.store.org.ListOrgStore',
            'GSmartApp.store.pcontract.PContractProductTreeStore',
            'GSmartApp.store.pcontract.PContractBom2ColorStore',
            'GSmartApp.store.market.MarketStore',
            'GSmartApp.store.PayerStore'],
    stores: {
        PContractStore: {
            type: 'PContractStore'
        },
        CustomerStore:{
            type : 'ListOrgStore'
        },
        BranchStore:{
            type :'BranchStore'
        },
        SeasonStore:{
            type :'SeasonStore'
        },
        Vender:{
            type : 'ListOrgStore'
        },
        EndBuyer:{
            type : 'ListOrgStore'
        },
        ContractTypes:{
            type : 'ContractTypeStore'
        },
        PContractProductStore:{
            type :'PContractProductStore'
        },
        PContractProduct_PO_Store:{
            type :'PContractProductStore'
        },
        PContractAttValueStore:{
            type :'PContractAttributeValueStore'
        },
        PContractProductColorStore:{
            type :'PContractProductColorStore'
        },
        PContractDocumentStore:{
            type : 'PContractDocumentStore'
        },
        PContractSKUStore:{
            type: 'PContractSKUStore'
        },
        PContractSKUPorderStore:{
            type: 'PContractSKUStore'
        },
        PContractProductBomStore: {
            type: 'PContractProductBomStore'
        },
        PContractProductBom2Store: {
            type: 'PContractProductBom2Store'
        },
        productStore: {
            type: 'ProductStore'
        },
        ProductFilterStore: {
            type: 'ProductStore'
        },
        ProductTypeStore: {
            type: 'ProductTypeStore'
        },
        UnitStore:{
            type:'UnitStore'
        },
        PContractProductPairStore:{
            type: 'PContractProductPairStore'
        },
        PContractBomColorStore:{
            type: 'PContractBomColorStore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        },
        porders: {
            type: 'POrderFilter'
        },
        PContractProductTreeStore: {
            type: 'PContractProductTreeStore'
        },
        PContractPOList: {
            type: 'PContractPOStore'
        },
        PContractProductPOStore: {
            type: 'PContractPOStore'
        },
        POShippingStore: {
            type: 'PContract_PO_Shipping_Store'
        },
        PContractBom2ColorStore: {
            type: 'PContractBom2ColorStore'
        },
        porderStore: {
            type: 'POrderFilter'
        },
        porderSKUStore: {
            type: 'porderSKUStore'
        },    
        porderReqStore: {
            type: 'POrder_Req'
        },
        MarketStore: {
            type: 'MarketStore'
        },
        PayerStore: {
            type: 'PayerStore'
        },
        ContractBuyerStore: {
            type: 'ContractBuyerStore'
        }                
    },
    data:{
        titleAttvalue: 'Thuộc tính ',
        titleDoccument: 'Tài liệu ',
        titleDeliveryPlan: 'Kế hoạch giao hàng ',
        titleSKU : 'Phân loại ',
        IdProduct: 0 ,
        IdProduct_filterPO: 0,
        PContract: {
            id: 0
        },
        pcontract_poid_link: 0,
        isReadOnlycmbSanPham: false, // binding thuộc tính được chọn combo sản phẩm hay ko
        ishiddenActionColumn: false,
        ordercode: '',
        orderdate: new Date(),
        productpairid_link: 0,
        isproductpair: 0,
        po_selected: null,
        isproductleaf: false,

        isWindow: false,
        tabActivate: 0,
        pcontract_poid_link_filter: 0, // dung de filter chi theo po 
        productid_link_filter : 0, // dung de filter theo product
        Product_pquantity: 0, // SL Tổng chi tiết màu, cỡ
        ProductSKUSummaryCssStyle: '<div style="color:red; font-weight: bold; align: right">', // màu tổng summary chi tiết màu, cỡ
    },
    formulas: {
        ishidden_addproduct : function(get){
            if(get('productid_link_filter') > 0) return true;
            return false;
        }
    }
})