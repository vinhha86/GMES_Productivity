Ext.define('GSmartApp.view.stockin.Stockin_P_Poline_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_P_Poline_MainViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContract_PO',
    ],
    stores: {
        PContract_PO: {
            type: 'PContract_PO'
        },
    },
    data: {
        stockin: null,
    },
    formulas: {
        isBtnDeleteDisable: function(get){
			var stockin = get('stockin');
			if(stockin.status != null && stockin.status >= 1){
				return true;
			}
			return false;
		},
        isBtnAddDisable: function(get){
			var stockin = get('stockin');
			if(stockin.status != null && stockin.status >= 1){
				return true;
			}
			return false;
		},
    }
})