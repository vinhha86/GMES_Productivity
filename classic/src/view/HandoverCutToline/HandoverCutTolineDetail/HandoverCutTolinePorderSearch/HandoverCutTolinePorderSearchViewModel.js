Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolinePorderSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutTolinePorderSearchViewModel',
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