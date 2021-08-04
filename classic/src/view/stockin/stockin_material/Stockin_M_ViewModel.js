Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_M_ViewModel',
	requires: [
		'GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
		'GSmartApp.store.SkuStore', 'GSmartApp.store.stockin.Stockin_d_Store',
		'GSmartApp.store.stockin.StockinTypeStore',
		'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
		'GSmartApp.store.porder.POrder_ListStore', 'GSmartApp.store.stockin.StockinGroupStore',
		'GSmartApp.store.unit.UnitStore', 'GSmartApp.store.stockin.Stockin_product_Store',
	],
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
		StockinD_Store:{
			type: 'Stockin_d_Store'
		},
		Stockin_Order_Store: {
			type: 'StockinStore'
		},
		Stockin_Order_D_Store:{
			type: 'Stockin_d_Store'
		},
		StockinProduct_Store:{
			type: 'Stockin_product_Store'
		},
		porderStore: {
			type: 'POrder_ListStore'
		},
        UnitStore: {
            type: 'UnitStore'
        },
		GpayUserOrg: {
            type: 'GpayUserOrg'
        },
		StockinGroupStore: {
			type: 'StockinGroupStore'
		},
        SKUStore: {
            type: 'Sku_AutoComplete'
        },
	},
	data: {
		searchObj: {
			stockindate_from: new Date(),
			stockindate_to: new Date(),
			orgid_from_link: null,
			stockintypeid_link: null,
		},

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
		groupstockin: 1,
		isHidden: false,
		isRFIDHidden: true,
		isBarcodeHidden: true,
		isManualHidden: false,
		//Chi dung cho View trong PContract
		pcontractid_link: null,
		stockinid_link: null,
		stockintypeid_link: 1,
		isAdd_Pcontract_Stockin: false, // true = pcontractView
		isNewStockin: false,
		isCanDoiNplPopup: false, // dùng cho 2 cột nhập kho và xuất kho trong tab cân đối NPL của tab tiến độ giao hàng
		mat_skuid_link: null, // dùng cho 2 cột nhập kho và xuất kho trong tab cân đối NPL của tab tiến độ giao hàng
		isRecordNguyenLieu: true,
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
		isBtnLuuHidden: function (get){
			if(get('stockin.status') >=1 ){
				return true;
			}
			return false;
		}
    }
})