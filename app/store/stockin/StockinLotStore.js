Ext.define('GSmartApp.store.stockin.StockinLotStore', {
    extend: 'Ext.data.Store',
	alias: 'store.StockinLotStore',
	model: 'GSmartApp.model.stockin.StockinLot',

	loadStore_byStockinId: function(stockinid_link){
		var me=this;
		var params = new Object();
		params.stockinid_link = stockinid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin/getStockinLotByStockinId',
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
	loadStore_byStockinId_async: function(stockinid_link){
		var me=this;
		var params = new Object();
		params.stockinid_link = stockinid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin/getStockinLotByStockinId',
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
