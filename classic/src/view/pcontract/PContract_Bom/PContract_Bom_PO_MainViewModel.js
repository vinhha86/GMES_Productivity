Ext.define('GSmartApp.view.pcontract.PContract_Bom.PContract_Bom_PO_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_Bom_PO_MainViewModel',
    requires: ['GSmartApp.store.pcontract.PContractPOStore'],
    stores: {
        PContractBom_PO_Store: {
            type: 'PContractPOStore'
        }
    },
    data: {
        pcontractid_link: 0,
        productid_link: 0,
        material_skuid_link: 0
    }
})