Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_M_Controller',
	init: function() {
        var orgstore = this.getViewModel().getStore('OrgStore');
		orgstore.loadStore(5);

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();

		var listidtype = "13,4,8,9";
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
		},
		'#btnInvoice_Search':{
            click: 'onInvoice_Search'
        }
    },
    onSelectCurency: function(combo, record, eOpts ){
       var viewModel = this.getViewModel();
	   viewModel.set('stockin.vat_exchangerate', record.data.exchangerate);
	   viewModel.set('curencycode',record.data.code);
	},
	onInvoice_Search:function(){
		var form = Ext.create('Ext.window.Window', {
            height: 500,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chọn Invoice',
            closeAction: 'destroy',
			height: Ext.getBody().getViewSize().height * .95,
			width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'InvoicePickup_Main'
            }],
            viewModel: {
                data: {
                }
            }
        });
        form.show();
	}
})