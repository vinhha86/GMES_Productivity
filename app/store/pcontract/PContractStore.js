Ext.define('GSmartApp.store.pcontract.PContractStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractStore',
	storeId: 'PContractStore',
	requires: ['GSmartApp.model.pcontract.PContractModel'],
	model: 'GSmartApp.model.pcontract.PContractModel',
    pageSize: 25,
	sorters: [{
        direction: 'ASC',
        property: 'deliverydate'
	}],
	loadStore_ByPage:function(limit, page, cust_contractcode, contractcode, orgbuyerid_link,
		orgvendorid_link, style, po){
		var me=this;
		var params = new Object();
		params.cust_contractcode = cust_contractcode;
		params.contractcode = contractcode;
		params.orgbuyerid_link = orgbuyerid_link;
		params.orgvendorid_link = orgvendorid_link;
		params.style = style;
		params.po = po;
		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			// url: config.getAppBaseUrl()+'/api/v1/pcontract/getbypaging',
			url: config.getAppBaseUrl()+'/api/v1/pcontract/getlistbypaging',
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
				// else{
				// 	console.log(records);
				// }
			}
		});
	},
	loadStore: function(productbuyer_code, po_code, orgbuyerid_link, orgvendorid_link, 
		contractbuyer_code, contractbuyer_yearfrom, contractbuyer_yearto){
		var me=this;
		var params = new Object();
		params.productbuyer_code = productbuyer_code;
		params.po_code = po_code;
		params.orgbuyerid_link = orgbuyerid_link;
		params.orgvendorid_link = orgvendorid_link;
		params.contractbuyer_code = contractbuyer_code;
		params.contractbuyer_yearfrom = contractbuyer_yearfrom;
		params.contractbuyer_yearto = contractbuyer_yearto;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract/getbysearch',
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
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
				// else{
				// 	console.log(records);
				// }
			}
		});
	}
});
