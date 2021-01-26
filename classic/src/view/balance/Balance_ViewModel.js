Ext.define('GSmartApp.view.stockin.Balance_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Balance_ViewModel',
	stores:{
		Balance_Color:{
			type :'Balance_Color'
		},
		Balance_POLine:{
			type: 'Balance_POLine'
		},
		Balance_D:{
			type: 'Balance_D'
		},
	},
	data: {
		pcontract_poid_link: null
	}
})