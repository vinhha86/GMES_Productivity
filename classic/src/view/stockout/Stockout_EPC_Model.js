Ext.define('GSmartApp.view.stockout.Stockout_EPC_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.stockoutepc',
	data: {
        stockout_d: null,
        isAutoChecked: false
    },
    formulas: {
		isEpcTxtfieldHidden: function (get) {
            if (get('isAutoChecked') == true) {
                return true;
            }
            else {
                return false;
            }
        },
    }
});
