Ext.define('GSmartApp.store.attribute.attributeValueStore', {
    extend: 'Ext.data.Store',
    alias: 'store.attributeValueStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'attributeid_link',  type: 'int'},
		{name: 'value',   type: 'string'},
		'isdefault'
	],
	sorters: {
        direction: 'ASC',
        property: 'name'
    },
	loadStore:function(id){
		var me=this;
		var params = new Object();
		params.id = id;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/attributevalue/getbyidattribute',
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
	loadStore_NotinPContractProduct:function(pcontractid_link, productid_link, attributeid_link){
		var me=this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productid_link = productid_link;
		params.attributeid_link = attributeid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/attributevalue/notin_pcontract_atrtibute',
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
	loadStoreForSizeset:function(id, sizesetid_link, _callbackfnc){
		var me=this;
		var params = new Object();
		params.id = id;
		params.sizesetid_link = sizesetid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/sizesetattribute/getbyidattributeforsizeset',
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
				}else{
					_callbackfnc();
				}
			}
		});
	}
});
