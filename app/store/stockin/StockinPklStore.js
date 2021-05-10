Ext.define('GSmartApp.store.stockin.StockinPklStore', {
    extend: 'Ext.data.Store',
	alias: 'store.StockinPklStore',
	model: 'GSmartApp.model.stockin.Stockin_pklist',

	loadStore_byStockinDIdAndGreaterThanStatus: function(stockindid_link, status){
		var me=this;
		var params = new Object();
		params.stockindid_link = stockindid_link;
        params.status = status;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_pklist/getByStockinDIdAndGreaterThanStatus',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_byStockinDIdAndGreaterThanStatus_async: function(stockindid_link, status){
		var me=this;
		var params = new Object();
		params.stockindid_link = stockindid_link;
        params.status = status;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_pklist/getByStockinDIdAndGreaterThanStatus',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
	},

    loadStore_byStockinDIdAndEqualStatus: function(stockindid_link, status){
		var me=this;
		var params = new Object();
		params.stockindid_link = stockindid_link;
        params.status = status;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_pklist/getByStockinDIdAndEqualStatus',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_byStockinDIdAndEqualStatus_async: function(stockindid_link, status){
		var me=this;
		var params = new Object();
		params.stockindid_link = stockindid_link;
        params.status = status;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_pklist/getByStockinDIdAndEqualStatus',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
	}
   
});
