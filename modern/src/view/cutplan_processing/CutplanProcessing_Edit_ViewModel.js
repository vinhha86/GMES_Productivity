Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.CutplanProcessing_Edit_ViewModel',
	stores:{
		CutPlanRowStore:{
			type :'CutPlanRowStore'
		},
		OrgStore:{
			type: 'orgstore'
		},
	},
	data: {
		cutplanProcessing: { // main obj
			id: null,
			cutplanProcessingD: [],
		}
	},
	formulas: {
        
    }
})