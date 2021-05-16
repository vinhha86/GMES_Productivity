Ext.define('GSmartApp.view.stockout.Stockout_M_MainViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_M_MainViewModel',
	stores:{
		
	},
	data: {
		
	},
	formulas: {
        isEdit: function (get) {
            if (get('stockin.id') == 0 || get('stockin.id') == null) {
                return false
            }
            else {
                return true;
            }
        },
		isBtnConfirmHidden: function (get) {
            if (get('stockin.status') == 1) {
                return true;
            }else if (get('stockin.status') == 0) {
                return false;
            }else {
                return true;
            }
        },
		isMetColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
		isStockin_M_Edit_PHidden: function (get) {
			var stockinD = get('stockinD');
			if(stockinD != null){
                return false;
			}
			return true
		},
		isPklSelected: function (get) {
			var selectedPklRecord = get('selectedPklRecord');
			if(selectedPklRecord == null){
                return false;
			}
			return true
		},
		isobjRecheckSelected: function(get){
			var objRecheck = get('objRecheck');
			if(objRecheck == null){
                return false;
			}
			return true
		}
    },

	
})