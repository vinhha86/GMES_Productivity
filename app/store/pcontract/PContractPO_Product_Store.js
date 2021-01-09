Ext.define('GSmartApp.store.PContractPO_Product_Store', {
    extend: 'Ext.data.Store',
    alias: 'store.PContractPO_Product_Store',
    fields: [
		{name: 'pcontract_poid_link', type: 'int'},
		{name: 'productid_link',   type: 'int'},
        {name: 'granttoorgid_link', type:'int'},
        {name: 'shipdate', type: 'date', dateFormat: 'c'},
		{name: 'buyername',   type: 'string'},
        {name: 'vendorname', type:'string'},
		{name: 'product_buyername', type: 'string'},
		{name: 'orgname', type: 'string'}
	],
	groupField: 'orgname',
	sorters: [{
        direction: 'ASC',
        property: 'shipdate'
    },{
        direction: 'ASC',
        property: 'product_buyername'
    }],
	getOffers_byOrg(){
		var params = new Object();

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_req/getpoline_product_by_org',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			timeout: 240000,
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
	getOffers_byOrg_noLoad(){
		var params = new Object();

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_req/getpoline_product_by_org',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			timeout: 240000,
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
