Ext.define('GSmartApp.store.DashBoardView.POrderStatusChartStore', {
    extend: 'Ext.data.Store',
    alias: 'store.POrderStatusChartStore',
	storeId: 'POrderStatusChartStore',
	fields: ['status', 'sum'],
    // data: [
    //     { 
    //         status: 'Done', sum: 2995, 
    //         px_detail: [
    //             {
    //                 name: 'bn1',
    //                 sum: 100
    //             },
    //             {
    //                 name: 'bn2',
    //                 sum: 100
    //             },
    //         ]
    //     },
    //     { 
    //         status: 'Running', sum: 3611, 
    //         px_detail: [
    //             {
    //                 name: 'bn1',
    //                 sum: 200
    //             },
    //             {
    //                 name: 'bn2',
    //                 sum: 200
    //             },
    //         ]
    //     },
    //     { 
    //         status: 'Preparing', sum: 1640, 
    //         px_detail: [
    //             {
    //                 name: 'bn1',
    //                 sum: 300
    //             },
    //             {
    //                 name: 'bn2',
    //                 sum: 300
    //             },
    //         ]
    //     },
    // ],
    loadStore:function(){
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
			// url: config.getAppBaseUrl()+'/api/v1/pcontract/getbypaging',
			url: config.getAppBaseUrl()+'/api/v1/porder/getPOrderStatusChart',
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
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},

});