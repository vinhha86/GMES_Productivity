Ext.define('GSmartApp.view.stockout.Stockout_packinglist_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_packinglist_ViewModel',
    requires: [
        // 'GSmartApp.store.invoice.invoice_pkl_lotnumber_store', 
        // 'GSmartApp.store.invoice.invoice_packinglist_store'
    ],
    stores:{
        LotStore: {
            // type: 'invoice_pkl_lotnumber_store'
        },
        PackingListStore: {
            // type: 'invoice_packinglist_store'
        }
    },
	data: {
        lotnumber: {
            lot: '',
            size: ''
        },
        packinglist: {
            id: null,
            skuid_link: 0,
            lotnumber: '',
            sizenumber: '',
            packageid: null,
            ydsorigin: null,
            m3: null,
            netweight: null,
            grossweight: null,
            width: null
        },
        invoice: null,
        invoiceDRec: null 
    },
    formulas: {
		isMetColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
    }
})