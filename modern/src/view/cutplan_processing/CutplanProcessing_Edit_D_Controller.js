Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit_D_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.CutplanProcessing_Edit_D_Controller',
	channel: { cmd: null, dta: null },
	init: function () {
		// var devicestore = this.getViewModel().getStore('DeviceInvStore');
		// devicestore.loadStore(3);
	},
	control: {
		'#CutplanProcessing_Edit_D': {
			itemtap: 'onItemTap'
		},
	},

	onItemTap: function(grid, index, target, record, e, eOpts){
		// var viewModel = this.getViewModel();
		// var stockin = viewModel.get('stockin');
		// var id = record.data.id;

		// // console.log(stockin);
		// // console.log(record);
		
		// this.redirectTo("stockin_m_main/" + id + "/edit_detail");
	}
})