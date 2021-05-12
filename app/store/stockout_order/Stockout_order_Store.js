Ext.define('GSmartApp.store.stockout_order.Stockout_order_Store', {
    extend: 'Ext.data.Store',
    storeId: 'Stockout_order_Store',
    alias: 'store.Stockout_order_Store',

    model: 'GSmartApp.model.stockout.Stockout_Order',
    GetByPorder: function(porderid_link){
		var params = new Object();
        params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/stockoutorder/getby_porder',
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
    loadStore_byPage: function(stockoutorderdate_from, stockoutorderdate_to, page, limit, status){
        var me=this;
        var params = new Object();
        params.stockoutorderdate_from = stockoutorderdate_from;
        params.stockoutorderdate_to = stockoutorderdate_to;
        params.page = page;
        params.limit = limit;
        params.status = status;

        me.pageSize = limit;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_Jitin()+'/api/v1/stockoutorder/getStockoutorder',
            paramsAsJson:true,
            extraParams : params,
            noCache: false,
            headers :{
                'Accept': "application/json", 
                'Content-Type':"application/json"
                },
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'totalCount'
            }
        });
        this.loadPage(page,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
			}
		});
    },

	loadStore_byPage_async: function(stockoutorderdate_from, stockoutorderdate_to, page, limit){
            var me=this;
            var params = new Object();
            params.stockoutorderdate_from = stockoutorderdate_from;
            params.stockoutorderdate_to = stockoutorderdate_to;
            params.page = page;
            params.limit = limit;

            me.pageSize = limit;

            this.setProxy({
                type: 'ajax',
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                // url: config.getAppBaseUrl_Jitin()+'/api/v1/invoice/getlist_bypage',
                url: config.getAppBaseUrl_Jitin()+'/api/v1/stockoutorder/getStockoutorder',
                paramsAsJson:true,
                extraParams : params,
                noCache: false,
                headers :{
                    'Accept': "application/json", 
                    'Content-Type':"application/json"
                    },
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'totalCount'
                }
            });
    },
});
