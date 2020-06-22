Ext.define('GSmartApp.store.pcontract.PContractSKUStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractSKUStore',
	storeId: 'PContractSKUStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
		{name: 'skuid_link',   type: 'int'},
		{name: 'pquantity_sample',   type: 'int'},
        {name: 'pquantity_porder',   type: 'int'},
        {name: 'pquantity_total',   type: 'int',
        calculate: function(data) {
            return data.pquantity_porder + data.pquantity_sample;
		}},
		{name: 'pquantity_granted',   type: 'int'},
        {name: 'pquantity_free',   type: 'int',
        calculate: function(data) {
            return data.pquantity_total - data.pquantity_granted;
		}},		
        {name: 'skuName',   type: 'string'},
        {name: 'skuCode',   type: 'string'},
        {name: 'mauSanPham',   type: 'string'},
		{name: 'coSanPham', type: 'string'},
		'sizeid_link',
		'color_id'
    ],
	sorters: [{
        direction: 'ASC',
        property: 'mauSanPham'
	},{
        direction: 'ASC',
        property: 'coSanPham'
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
			url: config.getAppBaseUrl()+'/api/v1/pcontractsku/getbypcontract_product',
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
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
				else{
					var tabcolor = Ext.getCmp('PContractProduct_Bom_TabColorView').getController();
					tabcolor.createTab();
				}
			}
		});
	},
	loadStoreByPO: function(pcontractid_link, pcontract_poid_link){
		var me=this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontractsku/getbypcontract_po',
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
