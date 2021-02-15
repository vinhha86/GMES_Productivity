Ext.define('GSmartApp.view.balance.Balance_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Balance_ViewModel',
    requires: [
			'GSmartApp.store.SKUBalanceStore'
		],	
	stores: {
		SKUBalanceStore: {
			type: 'SKUBalanceStore'
		}
	},
	data: {
		pcontractid_link: null,
		pcontract_poid_link: null
	}
})