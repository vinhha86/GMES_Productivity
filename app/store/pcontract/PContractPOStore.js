Ext.define('GSmartApp.store.pcontract.PContractPOStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractPOStore',
	storeId: 'PContractPOStore',
	model: 'GSmartApp.model.pcontract.PContractPO',
	sorters: [{
        direction: 'ASC',
        property: 'shipdate'
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
	loadLeafOnly: function(pcontractid_link, productid_link){
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
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getleafonly',
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
	loadLeafOnly_ByContract: function(pcontractid_link, productid_link){
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
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getleafonly_bycontract',
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
	loadAccept_ByContract: function(pcontractid_link,productid_link){
		var me=this;
		var params = new Object();
        params.pcontractid_link = pcontractid_link;
		params.productid_link = productid_link;
		console.log(productid_link);

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getpo_offer_accept',
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
	loadStoreBySearch: function(pcontractid_link, buyercode, po_buyer){
		var me=this;
		var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.buyercode = buyercode;
        params.po_buyer = po_buyer;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getByContractAndProductBuyerCodeAndPOBuyer',
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
	}
});
