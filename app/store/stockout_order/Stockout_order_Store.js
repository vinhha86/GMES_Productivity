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

	loadStore_byPage_async: function(invoicenumber, custom_declaration, invoicedate_from, invoicedate_to, org_prodviderid_link,
        status, page, limit){
            var me=this;
            var params = new Object();
            params.invoicenumber = invoicenumber;
            params.custom_declaration = custom_declaration;
            params.invoicedate_from = invoicedate_from;
            params.invoicedate_to = invoicedate_to;
            params.org_prodviderid_link = org_prodviderid_link;
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
    }
});
