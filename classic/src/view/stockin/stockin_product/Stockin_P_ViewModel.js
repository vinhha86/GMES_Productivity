Ext.define('GSmartApp.view.stockin.Stockin_P_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_P_ViewModel',
	requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
	'GSmartApp.store.SkuStore','GSmartApp.store.stockin.Stockin_d_Store',
	'GSmartApp.store.stockin.StockinDetailEpcStore',
	'GSmartApp.store.stockin.StockinTypeStore',
	'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
	'GSmartApp.store.VatTypeStore', 'GSmartApp.store.CurrencyStore', 
	'GSmartApp.store.stockin.StockinStatusStore', 'GSmartApp.store.stockin.StockinStore',
	'GSmartApp.store.porder.POrder_ListStore','GSmartApp.store.stockin.StockinGroupStore'],
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
		StockinGroupStore: {
			type: 'StockinGroupStore'
		}
	},
	data: {
		urlback:'',
		IsformMaster:false,
		isTabEpc:true,
		isNhapMoi:true,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'red-button',
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
		groupstockin: 1,
		isHidden: false
	},
	formulas: {
        isEdit: function (get) {
            if (get('stockin.id') == 0 || get('stockin.id') == null) {
                return false
            }
            else {
                return true;
            }
        }
    }
})