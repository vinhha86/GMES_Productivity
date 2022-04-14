Ext.define('GSmartApp.view.stockin.stockin_submaterial.stockin_subm_edit.Stockin_SubM_Edit_ViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_SubM_Edit_ViewModel',
	requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
		'GSmartApp.store.SkuStore', 'GSmartApp.store.stockin.Stockin_d_Store',
		'GSmartApp.store.stockin.StockinTypeStore',
		'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
		'GSmartApp.store.porder.POrder_ListStore', 'GSmartApp.store.stockin.StockinGroupStore',
        'GSmartApp.store.unit.UnitStore', 'GSmartApp.store.stockin.Stockin_product_Store',
	],
	stores: {
		DeviceInvStore: {
			type: 'DeviceInvStore'
		},
        UnitStore: {
			type: 'UnitStore'
		},
		SkuStore: {
			type: 'skustore'
		},
		StockinD_Store: {
			type: 'Stockin_d_Store'
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
		StatusStore: {
			type: 'stockinstatusstore'
		},
		POrder_ListStore: {
			type: 'POrder_ListStore'
		},
		POrder_ListGrantStore: {
			type: 'POrder_ListGrantStore'
		},
		GpayUserOrg: {
			type: 'GpayUserOrg'
		},
		StockinGroupStore: {
			type: 'StockinGroupStore'
		},
		Sku_AutoComplete: {
			type: 'Sku_AutoComplete'
		},
		StockinProduct_Store:{
			type: 'Stockin_product_Store'
		},
	},
	data: {
		urlback: '',
		IsformMaster: false,
		isTabEpc: true,
		isNhapMoi: true,
		clsbtn: 'red-button',
		clsbtnStart: 'blue-button',
		clsbtnStop: 'red-button',
		clsbtnSkuError: '',
		isStart: false,
		stockin: {
			stockin_d: [],
			id: null
		},
		listepc: new Map(),
		deviceid: 0,
		curencycode: '',
		ordercode: "",
		groupstockin: 1,
		isHidden: false,
		isRFIDHidden: true,
		isBarcodeHidden: true,
		isManualHidden: false,
		deviceid_link: 0,
		device: null,

		//Chi dung cho View trong PContract
		pcontractid_link: null,
		stockinid_link: null,
		stockintypeid_link: 11,
		isAdd_Pcontract_Stockin: false, // true = pcontractView
		isNewStockin: false,
		
		//dashboard mer view
		isAdd_DashboardMer_Stockin: false, // true = dashboard_mer view
		skuNplIdList: [], // ds id sku npl gửi vào từ dashboard_mer
		productid_link: null, // productid_link gửi vào từ dashboard_mer
		product_typeid_link: null, // product_typeid_link gửi vào từ dashboard_mer
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
		isBtnLuuHidden: function (get){
			if(get('stockin.status') >=1 ){
				return true;
			}
			return false;
		},
		iseditSL: function (get) {
			if(get('isAdd_Pcontract_Stockin')){
				return false;
			}
			if (get('groupstockin') == 1) return true;
			return false;
		},
		iseditSL_YC: function (get) {
			//Neu la nhap theo PO thi ko cho sua SL YC
			if(get('isAdd_Pcontract_Stockin')){
				return true;
			}
			if (get('stockin.stockintypeid_link') == null) {
				return false;
			}
			if (get('stockin.stockintypeid_link') == 11) {
				if (get('stockin.id') == null || get('stockin.id') == 0) {
					return true;
				}
				return false;
			}
			if (get('stockin.stockintypeid_link') == 12) {
				return false;
			}
			
			return true;
		},
		// isTypeMuaMoiNguyenPhuLieu: function (get){
		// 	if(get('stockin.stockintypeid_link') ==11){
		// 		return true;
		// 	}
		// 	return false;
		// },
		isTypeMuaMoiNguyenPhuLieu: function (get){
			if(get('stockin.stockintypeid_link') ==11){
				return 343;
			}
			return 375;
		},
		isBtnAddNoiGiaoHidden: function (get){
			if(get('stockin.stockintypeid_link') ==11){
				return false;
			}
			return true;
		},
		isbtnDSPolineHidden: function(get){
			var stockin = get('stockin');
			if(stockin.id == null || stockin.id == 0){
				return true;
			}
			return false;
		},
		isBtnBackHidden: function(get){
			var isAdd_Pcontract_Stockin = get('isAdd_Pcontract_Stockin');
			var isAdd_DashboardMer_Stockin = get('isAdd_DashboardMer_Stockin');
			if(isAdd_Pcontract_Stockin || isAdd_DashboardMer_Stockin){
				return true;
			}
			return false;
		},
		isBtnCloseHidden: function(get){
			var isAdd_Pcontract_Stockin = get('isAdd_Pcontract_Stockin');
			var isAdd_DashboardMer_Stockin = get('isAdd_DashboardMer_Stockin');
			if(isAdd_Pcontract_Stockin || isAdd_DashboardMer_Stockin){
				return false;
			}
			return true;
		},
	}
})