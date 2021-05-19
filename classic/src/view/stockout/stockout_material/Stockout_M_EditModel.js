Ext.define('GSmartApp.view.stockout.Stockout_M_EditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_M_EditModel',
    requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
	'GSmartApp.store.SkuStore','GSmartApp.store.stockout.Stockout_d',
	'GSmartApp.store.stockout.StockoutTypeStore',
	'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
	'GSmartApp.store.VatTypeStore', 'GSmartApp.store.CurrencyStore',
	'GSmartApp.store.Stockout', 'GSmartApp.store.stockout_order.Stockout_order_Store'],
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
        StockinGroupStore: {
			type: 'StockinGroupStore'
		},
        UnitStore: {
            type: 'UnitStore'
        },
        Stockout_order_Store: {
            type: 'Stockout_order_Store'
        },
        SKUStore: {
            type: 'Sku_AutoComplete'
        },
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
        IsformMaster: false,
        groupstockin: 1,
		isHidden: false,
        isRFIDHidden: true,
		isBarcodeHidden: true,
		isManualHidden: false,
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
		isBtnConfirmHidden: function (get) {
            if(get('stockout.id') == 0 || get('stockout.id') == null){
                return true;
            }
            if (get('stockout.status') == 1) {
                return true;
            }else if (get('stockout.status') == 0) {
                return false;
            }else if (get('stockout.status') == 2) {
                return true;
            }else {
                return true;
            }
        },
		isMetColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
    }
});
