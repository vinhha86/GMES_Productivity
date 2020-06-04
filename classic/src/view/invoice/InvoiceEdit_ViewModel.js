Ext.define('GSmartApp.view.invoice.InvoiceEdit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.InvoiceEdit_ViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores:{
        OrgProviderStore: {
            type: 'ListOrgStore'
        },
        OrgToStore: {
            type: 'ListOrgStore'
        },
        PortFromStore: {
            type: 'ListOrgStore'
        },
        PortToStore: {
            type: 'ListOrgStore'
        }
    },
	data: {
        ishiddenMaster: false,
        invoice: {
            id: null,
            invoicedate: '',
            invoice_d: []
        }
    }
})