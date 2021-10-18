Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract.Stockout_Pcontract_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Pcontract_ViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContractStore'
    ],
    stores: {
        PContractStore:{
			type: 'PContractStore'
		},
    },
    data: {
        storeData: null,
    }
})