Ext.define('GSmartApp.view.invoice.Invoice_packinglist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Invoice_packinglist_Controller',
	init: function() {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('LotStore');
        var invoicedid_link = viewmodel.get('packinglist.invoicedid_link');

        // console.log('viewmodel packinglist:');
        // console.log(viewmodel.get('packinglist'));

        if(isNaN(invoicedid_link)){
            // not existed in db

        }else{
            // existed in db
            store.loadStore(viewmodel.get('packinglist.invoicedid_link'));
        }
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