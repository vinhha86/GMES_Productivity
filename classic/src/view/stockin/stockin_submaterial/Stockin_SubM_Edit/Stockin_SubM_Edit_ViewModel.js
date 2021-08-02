Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_Edit.Stockin_SubM_Edit_ViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_SubM_Edit_ViewModel',
	requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
		'GSmartApp.store.SkuStore', 'GSmartApp.store.stockin.Stockin_d_Store',
		'GSmartApp.store.stockin.StockinTypeStore',
		'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
		'GSmartApp.store.porder.POrder_ListStore', 'GSmartApp.store.stockin.StockinGroupStore',
        'GSmartApp.store.unit.UnitStore'
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
		device: null
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
		}
	}
})