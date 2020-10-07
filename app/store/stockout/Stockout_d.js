Ext.define('GSmartApp.store.stockout.Stockout_d', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout_d',
    alias: 'store.Stockout_d',
    autoLoad: false,
    model: 'GSmartApp.model.Stockout_d',
      
    loadByStockoutID:function(stockoutid_link){
        var param=new Object();
        param.stockoutid_link = stockoutid_link;
        console.log(Ext.JSON.encode(param));

		this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },
            pageParam: false, //to remove param "page"
            startParam: false, //to remove param "start"
            limitParam: false, //to remove param "limit"            
            cors: true,
			url: config.getAppBaseUrl()+'/api/v1/stockout/getbystockoutdid',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
            useDefaultXhrHeader: false,
			extraParams: param,
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
    // sorters: [{
    //     property: 'stockincode',
    //     direction: 'ASC'
    // }]

});
