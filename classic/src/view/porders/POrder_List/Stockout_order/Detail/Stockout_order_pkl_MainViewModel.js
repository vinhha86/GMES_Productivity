Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_order_pkl_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_order_pkl_MainViewModel',
    requires: [
        'GSmartApp.store.warehouse.WarehouseStore'
    ],
    stores: {
        WarehouseStore: {
            type: 'WarehouseStore'
        }
    },
    data: {
        width_npl: '100%',
        material_skuid_link: 0
    }
})