Ext.define('GSmartApp.view.PContract.PContractViewModel', {
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
        PContractBom2ColorStore: {
            type: 'PContractBom2ColorStore'
        },
        porderStore: {
            type: 'POrderFilter'
        },
        porderSKUStore: {
            type: 'porderSKUStore'
        },    
        MarketStore: {
            type: 'MarketStore'
        },
        PayerStore: {
            type: 'PayerStore'
        }          
    },
    data:{
        titleAttvalue: 'Thuộc tính ',
        titleDoccument: 'Tài liệu ',
        titleDeliveryPlan: 'Kế hoạch giao hàng ',
        titleSKU : 'Phân loại ',
        IdProduct: 0 ,
        PContract: {
        },
        pcontract_poid_link: 0,
        isReadOnlycmbSanPham: false, // binding thuộc tính được chọn combo sản phẩm hay ko
        ishiddenActionColumn: false,
        ordercode: '',
        orderdate: new Date(),
        productpairid_link: 0,
        isproductpair: 0,
        po_selected: null
    }
})