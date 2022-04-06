Ext.define('GSmartApp.store.pcontract.PContract_PO', {
    extend: 'Ext.data.Store',
	alias: 'store.PContract_PO',
	storeId: 'PContract_PO',
	model: 'GSmartApp.model.pcontract.PContractPO',
	sorters: [{
        direction: 'ASC',
		// property: 'attributeName'
		property: 'shipdate'
	},{
        direction: 'ASC',
		// property: 'attributeName'
		property: 'po_buyer'
	}],
	loadStore: function(pcontractid_link, productid_link){
		var me=this;
		var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getbycontractproduct',
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
	loadStore_bypairid:function(id){
		var me=this;
		var params = new Object();
		params.product_pairid_link = id;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/product/get_by_pairid',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
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
	loadStoreByContract: function(pcontractid_link){
		var me=this;
		var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = 0;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getbycontract',
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
	loadStoreForPOrderListPContractPO: function(porderid_link, pcontract_poid_link){
		var params = new Object();
        params.porderid_link = porderid_link;
        params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getForPOrderListPContractPO',
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
	loadPOLine_Confirm: function(pcontract_poid_link){
		var params = new Object();
        params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getPOLine_Confirm',
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
	loadStoreByStockin: function(stockinid_link){
		var me=this;
		var params = new Object();
        params.id = stockinid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getByStockin',
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
	loadStoreBySearch_POLine_Stockin: function(objSearch){
		var me=this;
		var params = new Object();
        params.stockinid_link = objSearch.stockinid_link;
        params.po_buyer = objSearch.po_buyer;
        params.productbuyercode = objSearch.productbuyercode;
		params.pcontractcode = objSearch.pcontractcode;
		params.shipdateFrom = objSearch.shipdateFrom;
		params.shipdateTo = objSearch.shipdateTo;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getBySearch_POLine_Stockin',
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
	loadStoreByStockout: function(stockoutid_link){
		var me=this;
		var params = new Object();
        params.id = stockoutid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getByStockout',
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
	loadStoreBySearch_POLine_Stockout: function(objSearch){
		var me=this;
		var params = new Object();
        params.stockoutid_link = objSearch.stockoutid_link;
        params.po_buyer = objSearch.po_buyer;
        params.productbuyercode = objSearch.productbuyercode;
		params.pcontractcode = objSearch.pcontractcode;
		params.shipdateFrom = objSearch.shipdateFrom;
		params.shipdateTo = objSearch.shipdateTo;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getBySearch_POLine_Stockout',
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
	loadPolineByPcontractProduct: function(obj){
		var me=this;
		var params = new Object();
        params.pcontract_product_id = obj.pcontract_product_id;
		params.pcontractid_link = obj.pcontractid_link;
		params.isSpBo = obj.isSpBo;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getPolineByPcontractProduct',
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
	loadPolineByPcontractProduct_async: function(obj){
		var me=this;
		var params = new Object();
        params.pcontract_product_id = obj.pcontract_product_id;
		params.pcontractid_link = obj.pcontractid_link;
		params.isSpBo = obj.isSpBo;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getPolineByPcontractProduct',
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
		// this.load();
	},
});
