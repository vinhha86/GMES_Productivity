Ext.define('GSmartApp.view.handovercuttoprint.HandoverCutToPrintViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutToPrintViewModel',
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