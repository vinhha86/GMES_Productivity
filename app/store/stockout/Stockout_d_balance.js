Ext.define('GSmartApp.store.Stockout_d_balance', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout_d_balance',
    alias: 'store.stockout_d_balance',
    autoLoad: false,
    model: 'GSmartApp.model.Stockout_d',
    groupField: 'mainskucode',
    loadByOrdercode:function(ordercode, isGetMaterialUsedBy){
        var param=new Object();
        param.ordercode = ordercode;
        param.isGetMaterialUsedBy = isGetMaterialUsedBy;
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
			url: config.getAppBaseUrl()+'/api/v1/porder/getbalance',
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
            // success : function(response,options ) {
            //     // var response = Ext.decode(response.responseText);
            //     console.log(response);
            // },
            // failure :function(response,options){
			// 	console.log(response);
			// }
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
                console.log(records);
				if(!success){
					 this.fireEvent('logout');
				}
			}
		});
    },  

});
