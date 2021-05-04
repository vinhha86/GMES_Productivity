Ext.define('GSmartApp.view.pcontract.PContract_Bom.PContract_Bom_PO_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_Bom_PO_MainViewModel',
    requires: ['GSmartApp.store.pcontract.PContractPO_NPL_Store'],
    stores: {
        PContractBom_PO_Store: {
            type: 'PContractPO_NPL_Store'
        }
    }
})