Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutTolineViewModel',
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