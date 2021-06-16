Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.CutplanProcessing_Main_ViewModel',
	stores:{
		CutplanProcessingStore:{
			type :'CutplanProcessingStore'
		},
		CutplanProcessingDStore:{
			type :'CutplanProcessingDStore'
		},
	},
	data: {
		fromDate: null, // tim kiem
        toDate: null, // tim kiem
	},
	formulas: {

    }
})