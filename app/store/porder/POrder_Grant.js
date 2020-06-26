Ext.define('GSmartApp.store.POrder_Grant', {
    extend: 'Ext.data.Store',
    storeId: 'store_porderfilter',
    alias: 'store.POrder_Grant',

	model: 'GSmartApp.model.POrder_Grant',
	loadOne: function(id){
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
			url: config.getAppBaseUrl()+'/api/v1/porder_grant/getone',
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

});
