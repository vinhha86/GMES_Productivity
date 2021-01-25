Ext.define('GSmartApp.view.stockout.Stockout_M_EditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_M_EditModel',
    requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
	'GSmartApp.store.SkuStore','GSmartApp.store.stockout.Stockout_d',
	'GSmartApp.store.stockout.StockoutTypeStore',
	'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
	'GSmartApp.store.VatTypeStore', 'GSmartApp.store.CurrencyStore',
	'GSmartApp.store.Stockout'],
    stores: {
        DeviceInvStore:{
			type :'DeviceInvStore'
        },
        OrgStore:{
			type: 'orgstore'
		},
		SkuStore:{
			type: 'skustore'
		},
		StockoutD_Store:{
			type: 'Stockout_d'
		},
		StockoutTypeStore: {
			type: 'StockoutTypeStore'
		},
		Stockout: {
			type: 'stockout'
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
		}
	},
	data: {
        stockout: {
			stockoutd: [],
			id: null
		},
		listepc: new Map(),
        isStart:false,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
        clsbtnSkuError:'',        
        IsformMaster: false
	},
	// formulas: {
    //     // We'll explain formulas in more detail soon.
    //     stockoutd: function (get) {
	// 		return get('stockout').get('stockoutd');
    //     }
    // }
});
