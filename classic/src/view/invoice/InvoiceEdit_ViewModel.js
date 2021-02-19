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
        },
        UnitStore: {
            type: 'UnitStore'
        },
        BalanceProductStore: {
			type: 'BalanceProductStore'
		},
		SKUBalanceStore: {
			type: 'SKUBalanceStore'
		}
    },
	data: {
        IsformMaster: false,
        invoice: {
            id: null,
            invoicedate: '',
            invoice_d: []
        },
        skucode: '',
    }
})