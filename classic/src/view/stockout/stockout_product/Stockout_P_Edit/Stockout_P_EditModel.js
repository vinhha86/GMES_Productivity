Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_EditModel', {
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
		GpayUser: {
			type: 'GpayUserOrg'
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
		groupstockout: 1,
		isRFIDHidden: true,
		isBarcodeHidden: true,
		isManualHidden: false
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
			if(get('groupstockout') == 1) return true;
			return false;
		},
		iseditSL_YC: function(get){
			//Neu la xuat theo PO thi ko cho sua SL YC
			if(get('stockout.stockouttypeid_link') == 21) 
				return false;
			else
				return true;
		},
		isBtnConfirmHidden: function (get) {
            if (get('stockout.status') < 1) {
                return false
            }
            else {
                return true;
            }
        },
		// isPOLineHidden: function(get){
		// 	if(get('stockouts.stockintypeid_link') == 22) 
		// 		return false;
		// 	else
		// 		return true;
		// },
    }
});
