Ext.define('GSmartApp.store.pcontract.PContractPOStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractPOStore',
	storeId: 'PContractPOStore',
	fields: [
		{name: 'id',   type: 'int'},
		{name: 'orgrootid_link',   type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'code',   type: 'string'},
		{name: 'po_buyer',   type: 'string'},
		{name: 'po_vendor',   type: 'string'},	
		{name: 'productid_link',   type: 'int'},
		{name: 'po_quantity',   type: 'int'},
		{name: 'unitid_link',   type: 'int'},
		{name: 'shipdate',   type: 'date', dateFormat: 'c'},
		{name: 'matdate',   type: 'date', dateFormat: 'c'},
		{name: 'actual_quantity',   type: 'int'},	
		{name: 'actual_shipdate',   type: 'date', dateFormat: 'c'},
		{name: 'price_cmpt',   type: 'number'},
		{name: 'price_fob',   type: 'number'},
		{name: 'price_sweingtarget',  type: 'number'},
		{name: 'price_sweingfact',   type: 'number'},
		{name: 'price_add',   type: 'number'},	
		{name: 'price_commission',   type: 'number'},	
		{name: 'salaryfund',   type: 'number'},	

		{name: 'currencyid_link',   type: 'int'},
		{name: 'exchangerate',    type: 'number'},	
		{name: 'productiondate',   type: 'date', dateFormat: 'c'},
		{name: 'packingnotice',   type: 'string'},	
		{name: 'qcorgid_link',   type: 'int'},
		{name: 'etm_from',   type: 'int'},
		{name: 'etm_to',   type: 'int'},
		{name: 'etm_avr',  type: 'int'},
		{name: 'usercreatedid_link',   type: 'int'},
		{name: 'datecreated',  type: 'date', dateFormat: 'c'},
		{name: 'status',   type: 'int'},	
		{name: 'factories',   type: 'string'},			
    ],
	sorters: [{
        direction: 'ASC',
        property: 'attributeName'
	}],
	loadStore: function(pcontractid_link, productid_link){
		var me=this;
		var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getbycontractproduct',
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
	loadStore_bypairid:function(id){
		var me=this;
		var params = new Object();
		params.product_pairid_link = id;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/product/get_by_pairid',
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
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
			}
		});
	},
	loadStoreByContract: function(pcontractid_link){
		var me=this;
		var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = 0;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getbycontract',
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
