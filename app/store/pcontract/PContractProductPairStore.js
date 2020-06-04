Ext.define('GSmartApp.store.pcontract.PContractProductPairStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractProductPairStore',
	storeId: 'PContractProductPairStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
		{name: 'productName',   type: 'string'},
		{name: 'productCode',   type: 'string'},
		{name: 'productpairName',   type: 'string'},
		{name: 'productpairCode',   type: 'string'},
		{name: 'pquantity',   type: 'int'},
		{name: 'amount',   type: 'int'},
		{name: 'imgproduct'}
    ],
	sorters: [{
        direction: 'ASC',
        property: 'productName'
	},{
        direction: 'ASC',
        property: 'productpairName'
	}],
	loadStore: function(pcontractid_link){
		var me=this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontractproductpairing/getbypcontract',
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
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
			}
		});
	},
	load_product_not_pair: function(pcontractid_link, productpairid_link){
		var me=this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productpairid_link = productpairid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontractproductpairing/getproductnotpair',
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
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
			}
		});
	},
	load_product_pair_detail: function(pcontractid_link, productpairid_link){
		var me=this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productpairid_link = productpairid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontractproductpairing/getproductpairdetail',
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
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
			}
		});
	}
});
