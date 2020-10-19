Ext.define('GSmartApp.view.handoverlinetopack.HandoverLineToPackPorderSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverLineToPackPorderSearchViewModel',
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