Ext.define('GSmartApp.view.stockout.Stockout_P_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Edit_M_Controller',
	init: function() {
        var orgstore = this.getViewModel().getStore('OrgStore');
		orgstore.loadStore(5);
		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();

		var listidtype = "4,8,9,11,12";
		var orgfromstore = this.getViewModel().getStore('OrgFromStore');
		orgfromstore.loadStore_allchildren_byorg(listidtype);
		var orgtostore = this.getViewModel().getStore('OrgToStore');
		orgtostore.loadStore_byRoot(listidtype);

		var currencyStore = this.getViewModel().getStore('CurrencyStore');
		currencyStore.loadStore();
		var vattypeStore = this.getViewModel().getStore('VatTypeStore');
		vattypeStore.loadStore();
		var StockoutType = this.getViewModel().getStore('StockoutTypeStore');
		StockoutType.loadStore();
	},
	control:{
		'#loaitien':{
            select: 'onSelectCurency'
        }
    },
    onSelectCurency: function(combo, record, eOpts ){
       var viewModel = this.getViewModel();
	   viewModel.set('stockin.vat_exchangerate', record.data.exrate);
    }
})