Ext.define('GSmartApp.store.porder.POrder_ListGrantSKUStore', {
    extend: 'Ext.data.Store',
	alias: 'store.POrder_ListGrantSKUStore',
	groupField: 'pcontractPo_PoBuyer',
	fields: [
        {name: 'id', type: 'int'},
        {name: 'skuname', type: 'string'},
        {name: 'skucode', type: 'string'},
        {name: 'coSanPham', type: 'string'},
        {name: 'mauSanPham', type: 'string'},
		{name: 'grantamount', type: 'int'},
		{name: 'amount_break', type: 'int'},
		{name: 'pcontractPo_PoBuyer', type: 'string'},
		{name: 'pcontract_poid_link', type: 'int'}
	],
	sorters: [{
        direction: 'ASC',
        property: 'mauSanPham'
	},{
        direction: 'ASC',
        property: 'sort_size'
	}],
	loadStore: function(pordergrantid){
		var me=this;
		var params = new Object();
		params.pordergrantid = pordergrantid;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porderlist/getgrantskubygrantid',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	},

	loadStore_NotAsync: function(pordergrantid){
		var me=this;
		var params = new Object();
		params.pordergrantid = pordergrantid;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porderlist/getgrantskubygrantid',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
	}
});
