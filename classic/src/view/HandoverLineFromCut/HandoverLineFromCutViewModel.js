Ext.define('GSmartApp.view.HandoverLineFromCut.HandoverLineFromCutViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverLineFromCutViewModel',
    requires: ['GSmartApp.store.handover.HandoverStore'],
    stores: {
        HandoverStore: {
            type: 'HandoverStore'
        },
    },
    data: {
        
    },
})