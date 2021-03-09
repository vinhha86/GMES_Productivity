Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_PackingListViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_M_Edit_PackingListViewModel',
	stores:{
		// DeviceInvStore:{
		// 	type :'DeviceInvStore'
		// },
	},
	data: {
		stockin: null,
		stockinD: null,

		// textfield
		lotnumberTxt: null,
		packageidTxt: null,
		yTxt: null
	},
	formulas: {
    }
})