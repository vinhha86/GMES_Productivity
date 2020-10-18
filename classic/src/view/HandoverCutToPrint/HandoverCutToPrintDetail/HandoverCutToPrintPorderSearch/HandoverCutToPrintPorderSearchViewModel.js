Ext.define('GSmartApp.view.handovercuttoprint.HandoverCutToPrintPorderSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutToPrintPorderSearchViewModel',
    requires: [
        'GSmartApp.store.porder.POrder_ListStore',
    ],
    stores: {
        POrder_ListStore: {
            type: 'POrder_ListStore'
        },
    },
    data: {
        
    }
})