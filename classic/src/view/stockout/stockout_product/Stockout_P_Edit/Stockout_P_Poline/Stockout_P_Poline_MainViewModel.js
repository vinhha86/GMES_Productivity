Ext.define('GSmartApp.view.stockout.Stockout_P_Poline_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_P_Poline_MainViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContract_PO',
    ],
    stores: {
        PContract_PO: {
            type: 'PContract_PO'
        },
    },
    data: {
        stockout: null,
    },
    formulas: {
        isBtnDeleteDisable: function(get){
			var stockout = get('stockout');
			if(stockout.status != null && stockout.status >= 1){
				return true;
			}
			return false;
		},
        isBtnAddDisable: function(get){
			var stockout = get('stockout');
			if(stockout.status != null && stockout.status >= 1){
				return true;
			}
			return false;
		},
    }
})