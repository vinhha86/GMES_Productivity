Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_PackingListViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_M_Edit_PackingListViewModel',
	stores:{
		// DeviceInvStore:{
		// 	type :'DeviceInvStore'
		// },
	},
	data: {
		stockin: null,
		stockinD: null,

		// textfield
		lotnumberTxt: '',
		packageidTxt: '',
		yTxt: '',
		mTxt: '',
        colorTxt: '',
        widthTxt: '',
		yTxtCls: 'yTxtClsWhiteBG', // yTxtClsYellowBG
	},
	formulas: {
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
    }
})