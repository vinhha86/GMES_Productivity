Ext.define('GSmartApp.view.stockin.Stockin_P_Poline_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_P_Poline_MainViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContract_PO',
    ],
    stores: {
        PContract_PO: {
            type: 'PContract_PO'
        },
    },
    data: {
        stockin: null,
    }
})