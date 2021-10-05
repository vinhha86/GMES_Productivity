Ext.define('GSmartApp.store.porder.POrderGrant_SKU_PlanStore', {
	extend: 'Ext.data.Store',
	storeId: 'POrderGrant_SKU_PlanStore',
	alias: 'store.POrderGrant_SKU_PlanStore',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'id', type: 'int'},
		{name: 'date',   type: 'date', dateFormat: 'c'},
		{name: 'porder_grant_skuid_link',   type: 'int'},
		{name: 'amount',   type: 'int'},
	],
	// sorters: [{
    //     property: 'id',
    //     direction: 'ASC'
    // }],
	loadStore:function(porder_grant_skuid_link){
		var params = new Object();
		params.porder_grant_skuid_link = pordergrantid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant_sku_plan/getByPOrderGrantSku',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		// this.load();
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},
	loadStore_byPorderGrant:function(porder_grantid_link){
		var params = new Object();
		params.porder_grantid_link = porder_grantid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant_sku_plan/getByPOrderGrant',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		// this.load();
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},
});
