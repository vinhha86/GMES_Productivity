Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Pklist_Main_ViewModel',
    requires: [
        'GSmartApp.store.warehouse.WarehouseStore'
    ],
    stores: {
        StockStore:{
			// type: 'StockStore'
		},
        WarehouseStore:{
			type: 'WarehouseStore'
		},
    },
    data: {
        skuid_link: null,
        stockout: null,
        stockoutDRec: null,
        storeData: null,
    }
})