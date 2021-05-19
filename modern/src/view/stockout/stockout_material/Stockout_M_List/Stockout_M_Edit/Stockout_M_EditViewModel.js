Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_List.Stockout_M_Edit.Stockout_M_EditViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_M_EditViewModel',
	stores:{
		Stockout_d: {
			type: 'Stockout_d'
		},
		stockout_pklist: {
			type: 'stockout_pklist'
		},
		stockout_pklist_rip: {
			type: 'stockout_pklist'
		},
	},
	data: {
		stockout: null,

		// Stockout_M_Edit_D
		selectedDRecord: null, // loại vải đang chọn

		// Stockout_M_Edit_Pkl
		selectedPklRecord: null, // pkl đang chọn
		pkl_stockoutdId: null, // kiểm cây combobox value
		maPklFilter: '', // filter field pkl

		// Stockout_M_Edit_Pkl_Rip
		selectedPklRipRecord: null, // pkl xé vải đang chọn
		pklRip_stockoutdId: null, // xé vải combobox value
		maPklRipFilter: '', // filter field pkl xé vải
		objRip: null, // obj chứa các trường thông tin
	},
	formulas: {
        isMetColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return false;
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
		isobjRipSelected: function (get) {
            var selectedPklRipRecord = get('selectedPklRipRecord');
            if(selectedPklRipRecord == null){
                return false;
            } 
            return true;
        },
    },

	
})