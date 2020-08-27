Ext.define('GSmartApp.store.Sku', {
    extend: 'Ext.data.Store',
    storeId: 'store_sku',
    alias: 'store.sku',

    model: 'GSmartApp.model.Sku',
    autoLoad: false,
    loadByProduct:function(productid_link){
        var param=new Object();
        param.productid_link = productid_link;
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
			url: config.getAppBaseUrl()+'/api/v1/sku/getall_byproduct',
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
                // var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    },      
    loadByCode:function(skucode){
        var param=new Object();
        param.skucode = skucode;
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
			url: config.getAppBaseUrl()+'/api/v1/sku/getsku_mainmaterial',
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
                // var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    },    
    loadFilter:function(skucode, skutypeid_link){
        var param=new Object();
        param.skucode = skucode;
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
			url: config.getAppBaseUrl()+'/api/v1/sku/getsku_bytype',
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
                // var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    }

});
