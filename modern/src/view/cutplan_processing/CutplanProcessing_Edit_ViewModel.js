Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.CutplanProcessing_Edit_ViewModel',
	stores:{
		DeviceInvStore:{
			type :'DeviceInvStore'
		},
		OrgStore:{
			type: 'orgstore'
		},
	},
	data: {

	},
	formulas: {
        
    }
})