Ext.define('GSmartApp.store.warehouse.WarehouseStore', {
    extend: 'Ext.data.Store',
    alias: 'store.WarehouseStore',
    storeId: 'WarehouseStore',
	model: 'GSmartApp.model.warehouse.WarehouseModel',
	sorters: {
        direction: 'ASC',
        property: 'material_product_code'
    },
    loadbyorg: function(callback){
        var me=this;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/warehouse/getby_org',
			paramsAsJson:true,
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
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				callback.call(records, operation, success);
			}
		});
    }	
});
