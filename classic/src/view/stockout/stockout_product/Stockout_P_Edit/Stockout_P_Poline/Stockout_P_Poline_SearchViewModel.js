Ext.define('GSmartApp.view.stockout.Stockout_P_Poline_SearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_P_Poline_SearchViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContract_PO',
    ],
    stores: {
        PContract_PO: {
            type: 'PContract_PO'
        },
    },
    data: {
        stockout: null,
        stockoutId: null,
        objSearch: {
            po_buyer: null,
            productbuyercode: null,
            pcontractcode: null,
            shipdateFrom: null,
            shipdateTo: null,
            stockoutid_link: null,
        },
    }
})