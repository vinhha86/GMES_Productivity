Ext.define('GSmartApp.view.planporder.PContract_POViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_POViewModel',
    stores:{
        PContractProductPOStore: {
            type: 'PContractPOStore'
        }
    },
})