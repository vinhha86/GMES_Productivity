Ext.define('GSmartApp.store.pcontract.PContract_porder_gantt_store', {
    extend: 'Gnt.data.TaskStore',
	alias: 'store.PContract_porder_gantt_store',
	// requires: ['GSmartApp.model.pcontract.PContract_porder_gantt_model'],
    // model: 'GSmartApp.model.pcontract.PContract_porder_gantt_model',
    data: [{

	}]
    // loadStore: function(){
	// 	var me=this;
    //     var params = new Object();
    //     params.porder_fromdate = new Date();
    //     params.porder_todate = new Date();

	// 	this.setProxy({
	// 		type: 'ajax',
	// 		actionMethods: {
	// 			create : 'POST',
	// 			read   : 'POST',
	// 			update : 'POST',
	// 			destroy: 'POST'
	// 		},
	// 		url: config.getAppBaseUrl()+'/api/v1/plan/getall',
	// 		paramsAsJson:true,
	// 		noCache: false,
	// 		extraParams : params,
	// 		headers :{
	// 			'Accept': "application/json", 
	// 			'Content-Type':"application/json"
	// 		 },
	// 		reader: {
	// 			type: 'json',
	// 			rootProperty: 'children'
	// 		}
	// 	});
	// 	this.load();
	// }
});
