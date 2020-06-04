Ext.define('GSmartApp.view.invoice.Invoice_packinglist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Invoice_packinglist_Controller',
	init: function() {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('LotStore');
         store.loadStore(viewmodel.get('packinglist.invoicedid_link'));
    },
    control: {
        '#btnThoat': {
            click: 'onExit'
        }
    },
    onExit: function(){
        this.getView().up('window').close();
    }
})