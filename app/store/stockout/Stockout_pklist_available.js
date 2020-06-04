Ext.define('GSmartApp.store.Stockout_pklist_available', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout_pklist_available',
    alias: 'store.stockout_pklist_available',

    model: 'GSmartApp.model.Stockout_pklist',
    autoLoad: false,
    loadAvailable:function(skuid, skucode, skutypeid_link){
        var param=new Object();
        param.sku_id = skuid;
        param.sku_code = skucode;
        param.skutypeid_link = skutypeid_link;
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
			url: config.getAppBaseUrl()+'/api/v1/stockout/pklist_getavailablebysku',
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
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    },    
    loadFilter:function(skuid, skucode, skutypeid_link){
        var param=new Object();
        param.sku_id = skuid;
        param.sku_code = skucode;
        param.skutypeid_link = skutypeid_link;
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
			url: config.getAppBaseUrl()+'/api/v1/stockoutpklist/getavailablefilter',
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
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    },     
    sorters: [{
        property: 'ydsprocessed',
        direction: 'ASC'
    }]

});
