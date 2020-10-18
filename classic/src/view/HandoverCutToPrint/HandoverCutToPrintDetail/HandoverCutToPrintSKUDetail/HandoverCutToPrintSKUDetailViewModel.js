Ext.define('GSmartApp.view.handovercuttoprint.HandoverCutToPrintSKUDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutToPrintSKUDetailViewModel',
    requires: [
        'GSmartApp.store.handover.HandoverSkuStore',
    ],
    stores: {
        HandoverSkuStore: {
            type: 'HandoverSkuStore'
        },
    },
    data: {
        handoverid_link: null, 
        handoverproductid_link: null, 
        porderid_link: null, 
        productid_link: null,
        isIn: false
    }
})