Ext.define('GSmartApp.view.invoice.Invoice_packinglist_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Invoice_packinglist_ViewModel',
    requires: ['GSmartApp.store.invoice.invoice_pkl_lotnumber_store', 
            'GSmartApp.store.invoice.invoice_packinglist_store'],
    stores:{
        LotStore: {
            type: 'invoice_pkl_lotnumber_store'
        },
        PackingListStore: {
            type: 'invoice_packinglist_store'
        }
    },
	data: {
        lotnumber: {
            lot: '',
            size: ''
        },
        pakinglist: {
            id: null,
            invoiceid_link: 0,
            invoicedid_link: 0,
            skuid_link: 0,
            lotnumber: '',
            sizenumber: '',
            packageid: 0,
            ydsorigin: 0,
            m3: 0,
            netweight: 0,
            grossweight: 0
        }
    }
})