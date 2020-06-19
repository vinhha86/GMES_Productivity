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
            'GSmartApp.store.product.ProductStore',
            'GSmartApp.store.product.ProductTypeStore',
            'GSmartApp.store.unit.UnitStore',
            'GSmartApp.store.pcontract.PContractProductPairStore',
            'GSmartApp.store.pcontract.PContractBomColorStore',
            'GSmartApp.store.org.ListOrgStore',
            'GSmartApp.store.pcontract.PContractProductTreeStore'],
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
        productStore: {
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
            type: 'porderfilter'
        },
        PContractProductTreeStore: {
            type: 'PContractProductTreeStore'
        },
        PContractPOList: {
            type: 'PContractPOStore'
        },
        PContractProductPOStore: {
            type: 'PContractPOStore'
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
        isReadOnlycmbSanPham: false, // binding thuộc tính được chọn combo sản phẩm hay ko
        ishiddenActionColumn: false,
        ordercode: '',
        orderdate: new Date(),
        productpairid_link: 0,
        isproductpair: 0
    }
})