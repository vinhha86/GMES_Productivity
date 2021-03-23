Ext.define('GSmartApp.view.stockout.Stockout_P_EditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_P_EditModel',
    requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
	'GSmartApp.store.SkuStore','GSmartApp.store.stockout.Stockout_d',
	'GSmartApp.store.stockout.StockoutTypeStore',
	'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
	'GSmartApp.store.VatTypeStore', 'GSmartApp.store.CurrencyStore',
	'GSmartApp.store.Stockout','GSmartApp.store.stockout.StockoutGroupStore'],
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
		},
		StockoutGroupStore: {
			type: 'StockoutGroupStore'
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
		clsbtnStop:'red-button',
        clsbtnSkuError:'',        
        IsformMaster: false,
		groupstockout: 2,
		isHidden: true
	},
	formulas: {
		isEdit: function (get) {
            if (get('stockout.id') == 0 || get('stockout.id') == null) {
                return false
            }
            else {
                return true;
            }
        },
		iseditSL: function(get){
			if(get('groupstockout') == 2) return true;
			return false;
		}
    }
});
