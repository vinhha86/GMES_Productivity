Ext.define('GSmartApp.store.stockout_order.Stockout_order_pkl_Store', {
    extend: 'Ext.data.Store',
    storeId: 'Stockout_order_pkl_Store',
    alias: 'store.Stockout_order_pkl_Store',

    model: 'GSmartApp.model.stockout.Stockout_order_pkl',
    GetByDetail: function(stockoutorderdid_link){
		var params = new Object();
        params.id = stockoutorderdid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/stockoutorder/getpkl_bydetail',
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
	}

});
