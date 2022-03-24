Ext.define('GSmartApp.view.stockin.Stockin_P_Poline_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_P_Poline_MainViewModel',
    requires: [
        // 'GSmartApp.store.warehouse.WarehouseStore',
    ],
    stores: {
        // WarehouseStore: {
        //     type: 'WarehouseStore'
        // },
    },
    data: {
        stockin: null,
    }
})