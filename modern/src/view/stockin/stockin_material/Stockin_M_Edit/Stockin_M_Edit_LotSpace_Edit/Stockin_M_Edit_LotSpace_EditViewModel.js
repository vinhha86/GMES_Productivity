Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_LotSpace_EditViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_M_Edit_LotSpace_EditViewModel',
    requires: [
        
    ],
    stores: {
        
    },
    data: {
        selectedLotRecord: null, // lot truyen vao
        spaces: [], // list
		lotSpace: null, // khoang
		lotSpaceAmount: null, // sl cây khoang
    },
    formulas: {
    }
})