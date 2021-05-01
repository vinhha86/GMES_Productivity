Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_LotSpace_EditViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_M_Edit_LotSpace_EditViewModel',
    requires: [
        
    ],
    stores: {
        
    },
    data: {
        selectedLotRecord: null, // lot truyen vao
        unitid_link: null,
        // thông tin lot


        // thông tin khoang
        spaces: [], // list
		lotSpace: null, // khoang
		lotSpaceAmount: null, // sl cây khoang
    },
    formulas: {
        isMetColumnHidden: function (get) {
            var unitid_link = get('unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('unitid_link');
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