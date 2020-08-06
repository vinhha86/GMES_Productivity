Ext.define('GSmartApp.view.pcontract.PContract_PO.Export_Quotation.SelectPO_Quotation_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SelectPO_Quotation_ViewModel',
    stores: {
        PO_Quotation_Store : {
            type: 'PContractPOStore'
        }  
    },
    data: {
        pcontractid_link: 0
    }
})