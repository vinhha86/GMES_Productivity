Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist_Print.Stockout_Pklist_Print_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Pklist_Print_ViewModel',
    requires: [
        // 'GSmartApp.store.pcontract.PContractStore',
    ],
    stores: {
        PackingListStore:{
			// type: 'PContractStore'
		},
    },
    data: {
        stockout: null,
        storeData: null,
    }
})