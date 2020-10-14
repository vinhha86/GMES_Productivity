Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineSKUDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutTolineSKUDetailViewModel',
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