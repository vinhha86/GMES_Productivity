Ext.define('GSmartApp.view.stockin.Stockin_P_Poline_SearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_P_Poline_SearchViewModel',
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
        stockinId: null,
        objSearch: {
            po_buyer: null,
            productbuyercode: null,
            pcontractcode: null,
            shipdateFrom: null,
            shipdateTo: null,
            stockinid_link: null,
        },
    }
})