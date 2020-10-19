Ext.define('GSmartApp.view.HandoverPackFromLine.HandoverPackFromLineViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverPackFromLineViewModel',
    requires: ['GSmartApp.store.handover.HandoverStore'],
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
    },
    data: {
        
    },
})