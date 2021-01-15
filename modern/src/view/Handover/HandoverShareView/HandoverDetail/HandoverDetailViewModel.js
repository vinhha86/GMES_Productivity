Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverDetail.HandoverDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverDetailViewModel',
    requires: [
        'GSmartApp.store.handover.HandoverStore',
    ],
    stores: {
        ListOrgStore_To: {
            type: 'ListOrgStore'
        },
        HandoverSkuStore: {
            type: 'HandoverSkuStore'
        },
    },
    data: {
        viewId: '', // handover detail view id
        isCreateNew: null,
        handoverid_link: null,

        currentRec: null, // handover obj
        pordercode: '', // txtfield pordercode
    },
    formulas: {
    }
})