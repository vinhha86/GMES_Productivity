Ext.define('GSmartApp.view.handoverlinetopack.HandoverLineToPackViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverLineToPackViewModel',
    requires: [
        'GSmartApp.store.handover.HandoverStore',
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.handover.HandOverStatusStore'
    ],
    stores: {
        HandoverStore: {
            type: 'HandoverStore'
        },
        ListOrgStoreFrom: {
            type: 'ListOrgStore'
        },
        ListOrgStoreTo: {
            type: 'ListOrgStore'
        },
        HandOverStatusStore: {
            type: 'HandOverStatusStore'
        },
    },
    data: {
        
    },
})