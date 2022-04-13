Ext.define('GSmartApp.store.Dashboard_Mer.ProductShipDateChartStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ProductShipDateChartStore',
	storeId: 'ProductShipDateChartStore',
	fields: ['status', 'sum'],

	fields: [
        {
            name: 'sum2',
            convert : function (value, rec) {
                var sum = rec.get('sum');
				var sum2 = 100 - sum;
            	return sum2;
            }
        },
    ],

    // data : [
	// 	{status: 1, statusName: '3 ngày F', sum: 40},
	// 	{status: 2, statusName: '5 ngày F', sum: 30},
	// 	{status: 3, statusName: '10 ngày F', sum: 60},
	// 	{status: 0, statusName: 'Chậm giao hàng F', sum: 50},
	// ],

    loadStore:function(objSearch){
		var me=this;
		var params = new Object();
		params.contract_code = objSearch.contract_code;
		params.product_code = objSearch.product_code;
		params.po_code = objSearch.po_code;
		params.buyer = objSearch.buyer;
		params.vendor = objSearch.vendor;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			// url: config.getAppBaseUrl()+'/api/v1/pcontract/getbypaging',
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getProductShipDateChart',
			paramsAsJson:true,
			timeout: 120 * 1000,
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
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				this.fireEvent('ProductShipDateChartStore_Done');
				if(!success){
					//  this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},
    // loadStore_async:function(){
	// 	var me=this;
	// 	var params = new Object();
	// 	this.setProxy({
	// 		type: 'ajax',
	// 		actionMethods: {
	// 			create : 'POST',
	// 			read   : 'POST',
	// 			update : 'POST',
	// 			destroy: 'POST'
	// 		},
	// 		// url: config.getAppBaseUrl()+'/api/v1/pcontract/getbypaging',
	// 		url: config.getAppBaseUrl()+'/api/v1/porder/getPOrderStatusChart',
	// 		paramsAsJson:true,
	// 		extraParams : params,
	// 		noCache: false,
	// 		headers :{
	// 			'Accept': "application/json", 
	// 			'Content-Type':"application/json"
	// 		 },
	// 		reader: {
	// 			type: 'json',
	// 			rootProperty: 'data'
	// 		}
	// 	});
	// },

});