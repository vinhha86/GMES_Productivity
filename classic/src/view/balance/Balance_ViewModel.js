Ext.define('GSmartApp.view.balance.Balance_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Balance_ViewModel',
    requires: [
			'GSmartApp.store.SKUBalanceStore'
		],	
	stores: {
		BalanceProductStore: {
			type: 'BalanceProductStore'
		},
		SKUBalanceStore: {
			type: 'SKUBalanceStore'
		},
        PContractProductStore: {
            type: 'PContractProductStore'
        },		
	},
	data: {
		pcontractid_link: null,
		pcontract_poid_link: null,
		isAdd_Pcontract_Stockin: false,
		ls_productid_link: null,
		IdProduct: 0,
	}
})