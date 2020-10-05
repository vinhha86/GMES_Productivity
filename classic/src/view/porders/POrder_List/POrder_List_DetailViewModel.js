Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_List_DetailViewModel',
    requires: [
        'GSmartApp.store.porder.POrder_ListStatusStore',
        'GSmartApp.store.porder.POrder_ListVendorStore', 
        'GSmartApp.store.porder.POrder_ListBuyerStore', 
        'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.porder.porderSKUStore',
        'GSmartApp.store.porder.POrder_ListGrantStore',
        'GSmartApp.store.porder.POrder_ListGrantSKUStore',
        'GSmartApp.store.pcontract.POrderBomColorStore',
        'GSmartApp.store.porder.PorderSewingCostStore',
        'GSmartApp.store.pprocess.POrderGrantStore'
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
        POrder_ListGrantStore: {
            type: 'POrder_ListGrantStore'
        },
        POrder_ListGrantSKUStore: {
            type: 'POrder_ListGrantSKUStore'
        },
        POrder_ListGrantSKUStoreForWindow: {
            type: 'POrder_ListGrantSKUStore'
        },
        POrderBomColorStore: {
            type: 'POrderBomColorStore'
        },
        PorderSewingCostStore: {
            type: 'PorderSewingCostStore'
        },
        POrderGrantStore: {
            type: 'POrderGrantStore'
        },
        porderprocessing: {
            type: 'porderprocessing'
        },
    },
    data:{
        IdPOrder: null,
        IdGrant: null,
        //
        grantSKUViewTabInfoTitle: 'Chi tiết màu, cỡ',
        //
        porderinfo: '',
        amount: 0
    }
})