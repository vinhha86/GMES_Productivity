Ext.define('GSmartApp.store.Stockout_watinglist', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout_waitinglist',
    alias: 'store.stockout_waitinglist',

    model: 'GSmartApp.model.Stockout',
 
    loadByDate:function(){
        var param=new Object();
        param.processingdate_to = new Date();
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
			url: config.getAppBaseUrl()+'/api/v1/porders/getwaitinglist',
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
         
    sorters: [{
        property: 'priority',
        direction: 'ASC'
    }]

});
