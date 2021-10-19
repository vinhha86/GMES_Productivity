Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract.Stockout_Pcontract_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Pcontract_ViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContractStore',
        'GSmartApp.store.stockout.Stockout_d'
    ],
    stores: {
        PContractStore:{
			type: 'PContractStore'
		},
        StockoutD_Store:{
			type: 'Stockout_d'
		},
    },
    data: {
        pcontractid_link: null,
        productid_link: null,
    }
})