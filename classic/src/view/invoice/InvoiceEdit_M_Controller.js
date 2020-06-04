Ext.define('GSmartApp.view.invoice.InvoiceEdit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceEdit_M_Controller',
	init: function() {
        var viewmodel = this.getViewModel();
        var OrgProviderStore = viewmodel.getStore('OrgProviderStore');
        OrgProviderStore.loadStore(5, false);
        
        var listidtype = "4,8,9,11,12";
        var orgtostore = viewmodel.getStore('OrgToStore');
        orgtostore.loadStore_allchildren_byorg(listidtype);
        
        var portfromstore = viewmodel.getStore('PortFromStore');
        portfromstore.loadStore(15, false);

        var porttostore = viewmodel.getStore('PortToStore');
        porttostore.loadStore(16, false);
    }
})