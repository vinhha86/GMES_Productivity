Ext.define('GSmartApp.view.stockin.StockIn_P_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockIn_P_Edit_M_Controller',
	init: function() {
        var orgstore = this.getViewModel().getStore('OrgStore');
		orgstore.loadStore(5);

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();

		var listidtype = "4,8,9";
		var orgfromstore = this.getViewModel().getStore('OrgFromStore');
		orgfromstore.loadStore_byRoot(listidtype);

		var orgtostore = this.getViewModel().getStore('OrgToStore');
		orgtostore.loadStore_allchildren_byorg(listidtype);

		var currencyStore = this.getViewModel().getStore('CurrencyStore');
		currencyStore.loadStore();

		var vattypeStore = this.getViewModel().getStore('VatTypeStore');
		vattypeStore.loadStore();
		
		var stockintype = this.getViewModel().getStore('StockinTypeStore');
		stockintype.loadStore();
	},
	control:{
		'#loaitien':{
            select: 'onSelectCurency'
        }
    },
    onSelectCurency: function(combo, record, eOpts ){
       var viewModel = this.getViewModel();
	   viewModel.set('stockin.vat_exchangerate', record.data.exchangerate);
	   viewModel.set('curencycode',record.data.code);
    }
})