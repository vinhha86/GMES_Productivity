Ext.define('GSmartApp.view.handoverlinetopack.HandoverLineToPackSKUDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverLineToPackSKUDetailViewModel',
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