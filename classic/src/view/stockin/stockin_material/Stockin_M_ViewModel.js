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
        UnitStore: {
            type: 'UnitStore'
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
			id: null
		},
		listepc: new Map(),
		deviceid: 0,
		curencycode: '',
		ordercode: "",
		skucode: '',
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
    }
})