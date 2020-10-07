Ext.define('GSmartApp.store.Stockout', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout',
    alias: 'store.stockout',

    model: 'GSmartApp.model.Stockout',
 
    loadByDate:function(stockouttypeid,stockoutcode, stockoutdate_from, stockoutdate_to, page, limit,orgid_from_link, orgid_to_link){
        var me = this;
        var param=new Object();
        param.stockoutdate_from = stockoutdate_from;
        param.stockoutdate_to = stockoutdate_to;
        param.stockouttypeid_link = stockouttypeid;
        param.stockoutcode = stockoutcode;
        param.orgid_from_link = orgid_from_link;
        param.orgid_to_link = orgid_to_link;
        
        me.pageSize = limit;

		this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },          
			url: config.getAppBaseUrl()+'/api/v1/stockout/stockout_list',
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
    sorters: [{
        property: 'stockoutdate',
        direction: 'DESC'
    }]

});
