Ext.define('GSmartApp.view.stockin.PContract_Product_Select_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_Product_Select_ViewModel',
    stores: {
        PContractProductStore: {
            type: 'PContractProductStore'
        },
    },
    data:{
        pcontractid_link: null
    }
})