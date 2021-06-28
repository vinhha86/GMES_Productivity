Ext.define('GSmartApp.view.handover.HandoverPackToStock_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.HandoverPackToStock_Edit_ViewModel',
	requires: [
        
    ],
	stores:{
		DeviceInvStore:{
			type :'DeviceInvStore'
		},
		SkuStore:{
			type: 'skustore'
		},
		StockinD_Store:{
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
		StatusStore:{
			type: 'stockinstatusstore'
		},
		porderStore: {
			type: 'POrder_ListStore'
		},
		GpayUser: {
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
		isHidden: false,
		isRFIDHidden: true,
		isBarcodeHidden: true,
		isManualHidden: false,
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
		iseditSL: function(get){
			if(get('groupstockin') == 1) return true;
			return false;
		},
		iseditSL_YC: function(get){
			//Neu la nhap theo PO thi ko cho sua SL YC
			if(get('stockin.stockintypeid_link') == 21) 
				return false;
			else
				return true;
		},
		isPOLineHidden: function(get){
			if(get('stockin.stockintypeid_link') == 21) 
				return false;
			else
				return true;
		},
		isStockoutHidden: function(get){
			if(get('stockin.stockintypeid_link') == 22) 
				return false;
			else
				return true;
		},
		isBtnConfirmHidden: function (get) {
            if (get('stockin.status') < 1) {
                return false
            }
            else {
                return true;
            }
        },
    }
})