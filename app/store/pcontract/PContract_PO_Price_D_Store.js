Ext.define('GSmartApp.store.pcontract.PContract_PO_Price_D_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.PContract_PO_Price_D_Store',
	storeId: 'PContract_PO_Price_D_Store',
	idProperty: 'idx',
	model: 'GSmartApp.model.pcontract.PContractPO_Price_D',
	sorters: [{
        direction: 'ASC',
        property: 'fobpriceid_link'
	}],
	loadStore: function(pcontractpriceid_link){
		var me=this;
		var params = new Object();
        params.pcontractpriceid_link = pcontractpriceid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_price_d/getbyprice',
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
});
