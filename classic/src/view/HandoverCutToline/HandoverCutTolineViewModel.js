Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutTolineViewModel',
    requires: ['GSmartApp.store.handover.HandoverStore'],
    stores: {
        HandoverStore: {
            type: 'HandoverStore'
        },
    },
    data: {
        
    },
})