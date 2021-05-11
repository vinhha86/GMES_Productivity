Ext.define('GSmartApp.view.stockin.Stockout_ForCheck_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_ForCheck_Edit_ViewModel',
	stores:{
		Stockout_order_d_store:{
			type :'Stockout_order_d_store'
		},
	},
	data: {
		stockout_order: {
			id: null
		},

		// Stockin_M_Edit_D
		selectedDRecord: null, // loại vải đang chọn

		// Stockin_M_Edit_Pkl_Recheck
		selectedPklRecheckRecord: null, // pkl đang chọn
		pklRecheck_stockindId: null, // kiểm 10% combobox value
		maPklRecheckFilter: '', // filter field pkl recheck 10%
		objRecheck: null, // obj chứa các trường thông tin

		//
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