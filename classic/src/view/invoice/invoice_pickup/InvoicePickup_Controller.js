Ext.define('GSmartApp.view.invoice.InvoicePickup_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoicePickup_Controller',
	init: function() {
		var viewmodel = this.getViewModel();
		var OrgProviderStore = viewmodel.getStore('OrgProviderStore');
		OrgProviderStore.loadStore(5, true);
	},
	control: {
        '#btnTimKiem': {
            click: 'onloadPage'
        }
	},
	onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Invoice_Store');

        var limit = me.down('#limitpage').getValue();
        var invoicenumber = me.down('#invoicenumber').getValue();
		var custom_declaration = me.down('#custom_declaration').getValue();
		var invociedate_from = me.down('#invociedate_from').getValue();
		var invociedate_to = me.down('#invociedate_to').getValue();
		var org_prodviderid_link = me.down('#org_prodviderid_link').getValue();
		var status = me.down('#status').getValue();

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (invoicenumber == null) {
            invoicenumber = "";
        }

        if (custom_declaration == null) {
            custom_declaration = "";
		}
		
		if (org_prodviderid_link == null) {
            org_prodviderid_link = 0;
		}
		
		if (status == null) {
            status = 0;
        }

        store.loadStore_byPage(invoicenumber, custom_declaration, invociedate_from, invociedate_to, org_prodviderid_link, status, page, limit);
    },
	onSearch:function(){
		var params = new Object();
		var view = this.getView();
		var formInvoice = this.lookupReference('formInvoice');
		var gridInvoice = this.lookupReference('gridInvoice');
		var store = gridInvoice.getStore();
		var values = formInvoice.getValues();
		values.shipdateto_from =  new Date(values.shipdateto_from);
		values.shipdateto_to =  new Date(values.shipdateto_to);
		values.msgtype ="INVOICE_LIST_COMMING";
		view.setLoading(true);
		GSmartApp.Ajax.setProxy(store,'/api/v1/invoice/invoice_list_comming',values,function(records, operation, success) {view.setLoading(false);});
	},
    onViewPackingList: function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var data = grid.getStore().getAt(rowIndex);
        var invoicedid_link = data.get('id');

        var form = Ext.create('Ext.window.Window', {
            height: 500,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chi tiết Packing List - SKU : ' + data.get('skucode'),
            closeAction: 'destroy',
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Invoice_packinglist'
            }],
            viewModel: {
                data: {
                    packinglist: {
                        invoicedid_link: invoicedid_link,
                        invoiceid_link: viewmodel.get('invoice.id'),
                        skuid_link: data.get('skuid_link')
                    }
                }
            }
        });
        form.show();
    },	
})