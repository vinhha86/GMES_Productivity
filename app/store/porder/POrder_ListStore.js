Ext.define('GSmartApp.store.porder.POrder_ListStore', {
    extend: 'Ext.data.Store',
    storeId: 'POrder_ListStore',
    alias: 'store.POrder_ListStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'ordercode', type: 'string'},
        {name: 'stylebuyer', type: 'string'},
        {name: 'buyername', type: 'string'},
        {name: 'po_buyer', type: 'string'},
        {name: 'vendorname', type: 'string'},
        {name: 'po_vendor', type: 'string'},
        {name: 'orderdate', type: 'date'},
        {name: 'golivedate', type: 'date'},
        {name: 'totalorder', type: 'string'}
	],
	loadStore: function(){
		var me=this;
		var params = new Object();

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porderlist/getall',
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
			}
		});
	},  	
	loadStore: function(ordercode, po, style, buyerid, vendorid, orderdatefrom, orderdateto){
		var me=this;
		var params = new Object();
		params.ordercode = ordercode;
		params.po = po;
		params.style = style;
		params.buyerid = buyerid;
		params.vendorid = vendorid;
		params.orderdatefrom = orderdatefrom;
		params.orderdateto = orderdateto;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porderlist/getallbysearch',
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
			}
		});
	}
});
