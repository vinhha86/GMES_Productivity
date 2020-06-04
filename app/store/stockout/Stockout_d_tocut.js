Ext.define('GSmartApp.store.Stockout_d_tocut', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout_d_tocut',
    alias: 'store.stockout_d_tocut',
    autoLoad: false,
    model: 'GSmartApp.model.Stockout_d',
    groupField: 'pordercode',
    loadByDate:function(stockouttypeid, stockoutdate_from, stockoutdate_to, skucode){
        var param=new Object();
        param.stockoutdate_from = stockoutdate_from;
        param.stockoutdate_to = stockoutdate_to;
        param.skucode = skucode;
        param.stockouttypeid = stockouttypeid;
        this.removeAll();

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
			url: config.getAppBaseUrl()+'/api/v1/stockout/getstockoutdbydate',
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
                var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    },    
    loadByStockoutID:function(stockinid){
        var param=new Object();
        param.stockinid = stockinid;
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
			url: config.getAppBaseUrl()+'/api/v1/stockin/getstockin_d',
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
                var response = Ext.decode(response.responseText);
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
