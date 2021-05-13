Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_ForCheck_Edit_ViewModel',
	stores:{
		Stockout_order_d_store:{
			type :'Stockout_order_d_store'
		},
        Stockout_order_pkl_Store:{
			type :'Stockout_order_pkl_Store'
		},
	},
	data: {
		stockout_order: {
			id: null
		},

		// Stockout_ForCheck_Edit_D
		selectedDRecord: null, // loại vải đang chọn

		// Stockout_ForCheck_Edit_ToVai
        selectedPklRecord: null, // pkl đang chọn
		pkl_stockout_order_dId: null, // combobox value, hidden
		maPklFilter: '', // filter field pkl
		objPkl: null, // obj chứa các trường thông tin,
        isPklTextfieldFocus: false,

		//
	},
	formulas: {
        isEdit: function (get) {
            if (get('stockin.id') == 0 || get('stockout_order.id') == null) {
                return false
            }
            else {
                return true;
            }
        },
		isBtnConfirmHidden: function (get) {
            if (get('stockout_order.status') == 1) {
                return true;
            }else if (get('stockout_order.status') == 0) {
                return false;
            }else {
                return true;
            }
        },
		isMetColumnHidden: function (get) {
            var unitid_link = get('stockout_order.unitid_link');
            console.log(unitid_link);
            if(unitid_link == null){
                return false;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockout_order.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
		isbtnCheckDisabled: function (get) {
			var selectedPklRecord = get('selectedPklRecord');
            var isPklTextfieldFocus = get('isPklTextfieldFocus');
            var objPkl = get('objPkl');
            if(isPklTextfieldFocus){
                return true;
            }
			if(objPkl == null){
                return true;
			}
			return false;
		},
    },

	
})