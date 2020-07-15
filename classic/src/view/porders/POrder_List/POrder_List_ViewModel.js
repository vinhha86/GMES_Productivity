Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_List_ViewModel',
    requires: [
        'GSmartApp.store.porder.POrder_ListVendorStore', 
        'GSmartApp.store.porder.POrder_ListBuyerStore', 
        'GSmartApp.store.porder.POrder_ListStore'
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
        }
    }
})