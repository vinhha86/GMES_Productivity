Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_List_DetailViewModel',
    requires: [
        'GSmartApp.store.porder.POrder_ListStatusStore',
        'GSmartApp.store.porder.POrder_ListVendorStore', 
        'GSmartApp.store.porder.POrder_ListBuyerStore', 
        'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.porder.porderSKUStore'
    ],
    stores: {
        POrder_ListStore: {
            type: 'POrder_ListStore'
        },
        POrder_ListVendorStore: {
            type: 'POrder_ListVendorStore'
        },
        POrder_ListBuyerStore: {
            type: 'POrder_ListBuyerStore'
        },
        POrder_ListStatusStore: {
            type: 'POrder_ListStatusStore'
        },
        porderSKUStore: {
            type: 'porderSKUStore'
        },
    },
    data:{
        testdata: 'testdata123'
    }
})