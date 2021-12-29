Ext.define('GSmartApp.view.stockout.Stockout_EPC_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_EPC_Controller',
    init: function() {
        // this.callParent(arguments);
    },
    control: {
		'#Stockout_EPC_Window': {
			afterrender: 'onAfterrender'
		},
        '#btnLuu': {
            click: 'onSave'
        }
    },
    onAfterrender: function(){
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockout_d = viewModel.get('stockout_d');
        var TPGroupStore = viewModel.getStore('TPGroupStore');
    },
    onSave: function(){
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockout_d = viewModel.get('stockout_d');

        console.log(stockout);
        console.log(stockout_d);
    }
});    