Ext.define('GSmartApp.store.stockin.StockinStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StockinStore',
	model: 'GSmartApp.model.stockin.Stockin',
	loadStore: function(orgid_from_link, stockindate_from, stockindate_to, stockintypeid_link, status, limit, page){
		var me=this;
		var params = new Object();
		params.orgid_from_link = orgid_from_link;
		params.stockindate_from = stockindate_from;
		params.stockindate_to = stockindate_to;
		params.stockintypeid_link = stockintypeid_link;
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
			url: config.getAppBaseUrl()+'/api/v1/stockin/stockin_list',
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
	}
});
