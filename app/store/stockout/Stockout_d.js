Ext.define('GSmartApp.store.Stockout_d', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout_d',
    alias: 'store.stockout_d',
    autoLoad: false,
    model: 'GSmartApp.model.Stockout_d',
    groupField: 'productcolor_name',
      
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
			url: config.getAppBaseUrl()+'/api/v1/stockout/getstockoutd_bystockoutid',
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
            },
            success : function(response,options ) {
                //var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    } 
    // sorters: [{
    //     property: 'stockincode',
    //     direction: 'ASC'
    // }]

});
