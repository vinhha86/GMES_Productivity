Ext.define('GSmartApp.store.fabricprice.FabricPriceStore', {
    extend: 'Ext.data.Store',
	alias: 'store.FabricPriceStore',
    storeId: 'FabricPriceStore',
	groupField: 'producttype_name',
	fields: [
		{name: 'id'},
	],
	// sorters: {
    //     direction: 'ASC',
    //     property: 'id'
    // },
	loadStore:function(){
		var me=this;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/fabricprice/getall',
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
