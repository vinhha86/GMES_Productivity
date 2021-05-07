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
		Stockin_d_Store:{
			type: 'Stockin_d_Store'
		},
		StockinLotStore: {
			type: 'StockinLotStore'
		},
		StockinPklStore: {
			type: 'StockinPklStore'
		},
		StockinPklRecheckStore: {
			type: 'StockinPklStore'
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
		isKiemcay_CheckEnable: true,
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

		// Stockin_M_Edit_D
		selectedDRecord: null, // loại vải đang chọn
		lotNumberTxt: '',
		cayNumberTxt: '',
		yNumberTxt: '',
		canNumberTxt: '',

		// Stockin_M_Edit_Lot
		selectedLotRecord: null, // lot đang chọn
		lot_stockindId: null, // kiểm lot combobox value
		spaces: [],
		spacesString: '',
		lotRow: null, // dãy
		lotSpace: null, // hàng
		lotFloor: null, // tầng
		lotAmount: null, // sl cây
		maLotFilter: null,

		// Stockin_M_Edit_Pkl
		selectedPklRecord: null, // pkl đang chọn
		pkl_stockindId: null, // kiểm cây combobox value
		maPklFilter: '', // filter field pkl

		// textfield
		lotnumberTxt: '',
		packageidTxt: '',
		yTxt: '',
		mTxt: '',
        mOriginTxt: '',
        yOriginTxt: '',
        sampleCheckTxt: '',
        colorTxt: null,
        // widthTxt: '',
		grossweightTxt: '',
		grossweightCheckTxt: '',
		widthYdsCheckTxt: '',
		widthYdsTxt: '',
		widthMetCheckTxt: '',
		widthMetTxt: '',

		// Stockin_M_Edit_Pkl_Recheck
		selectedPklRecheckRecord: null,
		// storePackinglistRecheckArr: [],
		// maPklRecheckFilterByMaVai: '',
		pklRecheck_stockindId: null, // kiểm 10% combobox value
		maPklRecheckFilter: '', // filter field pkl recheck 10%
		objRecheck: null,

		// textfield
		// idRecheck: null,
		// lotnumberTxtRecheck: '',
		// packageidTxtRecheck: '',
		// yTxtRecheck: '',
		// mTxtRecheck: '',
        // mOriginTxtRecheck: '',
        // yOriginTxtRecheck: '',
        // sampleCheckTxtRecheck: '',
        // colorTxtRecheck: null,
        // // widthTxtRecheck: '',
		// grossweightTxtRecheck: '',
		// grossweightCheckTxtRecheck: '',
		// widthYdsCheckTxtRecheck: '',
		// widthYdsTxtRecheck: '',
		// widthMetCheckTxtRecheck: '',
		// widthMetTxtRecheck: '',
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