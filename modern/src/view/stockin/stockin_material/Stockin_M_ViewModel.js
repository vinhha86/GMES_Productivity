Ext.define('GSmartApp.view.stockin.Stockin_M_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_M_ViewModel',
	stores:{
		DeviceInvStore:{
			type :'DeviceInvStore'
		},
		OrgStore:{
			type: 'orgstore'
		},
		SkuStore:{
			type: 'skustore'
		},
		StockinDetailStore:{
			type: 'Stockin_d_Store'
		},
		StockinDetailEpcStore:{
			type : 'stockindetailepcstore'
		},
		StockinTypeStore: {
			type: 'StockinTypeStore'
		},
		UserStore: {
            type: 'userliststore'
		},
		OrgFromStore: {
            type: 'ListOrgStore'
		},
		OrgToStore: {
            type: 'ListOrgStore'
		},
		VatTypeStore:{
			type : 'VatTypeStore'
		},
		CurrencyStore: {
			type : 'CurrencyStore'
		},
		StatusStore:{
			type: 'stockinstatusstore'
		},
		StockinStore: {
			type: 'StockinStore'
		},
		porderStore: {
			type: 'POrder_ListStore'
		},
		attributeValueStore:{
			type :'attributeValueStore'
		},
	},
	data: {
		urlback:'',
		IsformMaster:false,
		isTabEpc:true,
		isNhapMoi:true,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
		clsbtnSkuError:'',
		isStart:false,
		stockin: {
			stockin_d: [],
			stockin_product: [],
			stockin_lot: [],
			id: null
		},
		listepc: new Map(),
		deviceid: 0,
		curencycode: '',
		ordercode: "",
		skucode: '',

		// Stockin_M_Edit_P
		stockinD: null,
		lotnumberTxt: '',
		packageidTxt: '',
		yTxt: '',
		mTxt: '',
        mOriginTxt: '',
        yOriginTxt: '',
        sampleCheckTxt: '',
        colorTxt: null,
        widthTxt: '',
		yTxtCls: 'yTxtClsWhiteBG', // yTxtClsYellowBG

		// Stockin_M_Edit_D
		selectedDRecord: null,
		lotNumberTxt: '',
		cayNumberTxt: '',
		yNumberTxt: '',

		// Stockin_M_Edit_Lot
		selectedLotRecord: null,
		spaces: [],
		spacesString: '',
		lotRow: null, // dãy
		lotSpace: null, // hàng
		lotFloor: null, // tầng
		lotAmount: null, // sl cây

		// Stockin_M_Edit_Pkl
		storePackinglistArr: [],
		maPklFilterByMaVai: '',
		maPklFilter: '',

		// textfield
		lotnumberTxt: '',
		packageidTxt: '',
		yTxt: '',
		mTxt: '',
        mOriginTxt: '',
        yOriginTxt: '',
        sampleCheckTxt: '',
        colorTxt: null,
        widthTxt: '',
		grossweightTxt: '',

		// Stockin_M_Edit_Pkl_Recheck
		storePackinglistRecheckArr: [],
		selectedPklRecheckRecord: null,
		maPklRecheckFilterByMaVai: '',
		maPklRecheckFilter: '',

		// textfield
		lotnumberTxtRecheck: '',
		packageidTxtRecheck: '',
		yTxtRecheck: '',
		mTxtRecheck: '',
        mOriginTxtRecheck: '',
        yOriginTxtRecheck: '',
        sampleCheckTxtRecheck: '',
        colorTxtRecheck: null,
        widthTxtRecheck: '',
		grossweightTxtRecheck: '',
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
		}
    },

	
})