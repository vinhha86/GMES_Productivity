Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract_MaterialList.Stockout_Pcontract_MaterialList_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Pcontract_MaterialList_ViewModel',
    requires: [
        'GSmartApp.store.stockout.Stockout_d'
    ],
    stores: {
        StockoutD_Store:{
			type: 'Stockout_d'
		},
    },
    data: {
        pcontractid_link: null,
        productid_link: null,
    }
})