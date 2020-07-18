Ext.define('GSmartApp.store.porder.porderSKUStore', {
    extend: 'Ext.data.Store',
	alias: 'store.porderSKUStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'porderid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
		{name: 'skuid_link',   type: 'int'},
		{name: 'pquantity_sample',   type: 'int'},
        {name: 'pquantity_porder',   type: 'int'},
        {name: 'pquantity_total',   type: 'int'},
        // calculate: function(data) {
        //     return data.pquantity_porder + data.pquantity_sample;
		// }},
        {name: 'skuName',   type: 'string'},
        {name: 'skuCode',   type: 'string'},
        {name: 'mauSanPham',   type: 'string'},
		{name: 'coSanPham', type: 'string'},
		{name: 'ordercode', type: 'string'}
	],
	groupField: 'ordercode',
	sorters: [{
        direction: 'ASC',
        property: 'mauSanPham'
	},{
        direction: 'ASC',
        property: 'coSanPham'
	}],
	loadStore: function(productid_link){
		var me=this;
		var params = new Object();
		params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder/get_byproduct',
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
	loadByPorderID: function(porderid_link){
		var me=this;
		var params = new Object();
		params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder/get_product_sku',
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
	loadByPorderID_ASync: function(porderid_link){
		var me=this;
		var params = new Object();
		params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder/get_product_sku',
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
