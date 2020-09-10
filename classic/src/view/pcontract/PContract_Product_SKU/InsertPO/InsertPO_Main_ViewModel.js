Ext.define('GSmartApp.view.pcontract..PContract_Product_SKU.InsertPO.InsertPO_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.InsertPO_Main_ViewModel',
    stores:{
        PContractProductPOStore: {
            type: 'PContractPOStore'
        },
        porderReqStore: {
            type: 'POrder_Req'
        },
        PackingTypeStore:{
            type: 'PackingTypeStore'
        },
        POShippingStore: {
            type: 'PContract_PO_Shipping_Store'
        },   
        PortStore: {
            type: 'portstore'
        }
    },
    data: {
        pcontractid_link: 0,
        productid_link: 0,
        po : {
            parentpoid_link: null,
        },
        ishidden_tbd: true
    }
})