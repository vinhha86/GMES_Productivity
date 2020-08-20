Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_Info_Main_ViewModel',
    stores:{
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
        },     
    },
    data: {
        id: null,
        parentpoid_link: null,
        po: null,
        isedit: false
    }
})