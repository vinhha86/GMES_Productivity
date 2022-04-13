Ext.define('GSmartApp.store.Dashboard_Mer.DashboardMer_ProgressStore', {
    extend: 'Ext.data.Store',
    alias: 'store.DashboardMer_ProgressStore',
	storeId: 'DashboardMer_ProgressStore',
	fields: ['name', 'sumDone', 'sumNotDone'],

	// fields: [
    //     {
    //         name: 'sum2',
    //         convert : function (value, rec) {
    //             var sum = rec.get('sum');
	// 			var sum2 = 100 - sum;
    //         	return sum2;
    //         }
    //     },
    // ],

    // data : [
	// 	{name: 'Tổ 1', sumDone: 40, sumNotDone: 60, total: 100},
	// 	{name: 'Tổ 2', sumDone: 10, sumNotDone: 50, total: 60},
    //     {name: 'Tổ 3', sumDone: 20, sumNotDone: 10, total: 30},
    //     {name: 'Tổ 4', sumDone: 30, sumNotDone: 20, total: 50},
    //     {name: 'Tổ 5', sumDone: 40, sumNotDone: 45, total: 85},
    //     {name: 'Tổ 6', sumDone: 50, sumNotDone: 20, total: 70},
    //     {name: 'Tổ 7', sumDone: 60, sumNotDone: 0, total: 60},
    //     {name: 'Tổ 8', sumDone: 20, sumNotDone: 50, total: 70},
    //     {name: 'Tổ 9', sumDone: 30, sumNotDone: 70, total: 100},
    //     // {name: 'Tổ 10', sumDone: 50, sumNotDone: 10, total: 60},
    //     // {name: 'Tổ 11', sumDone: 40, sumNotDone: 60, total: 100},
	// 	// {name: 'Tổ 12', sumDone: 10, sumNotDone: 50, total: 60},
    //     // {name: 'Tổ 13', sumDone: 20, sumNotDone: 10, total: 30},
    //     // {name: 'Tổ 14', sumDone: 30, sumNotDone: 20, total: 50},
    //     // {name: 'Tổ 15', sumDone: 40, sumNotDone: 45, total: 85},
    //     // {name: 'Tổ 16', sumDone: 50, sumNotDone: 20, total: 70},
    //     // {name: 'Tổ 17', sumDone: 60, sumNotDone: 0, total: 60},
    //     // {name: 'Tổ 18', sumDone: 20, sumNotDone: 50, total: 70},
    //     // {name: 'Tổ 19', sumDone: 30, sumNotDone: 70, total: 100},
    //     // {name: 'Tổ 20', sumDone: 50, sumNotDone: 10, total: 60},
	// ],

    loadStore:function(objSearch){
		var me=this;
		var params = new Object();
		params.pcontract_poid_link = objSearch.pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getForDashboardMer_ProgressStore',
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
				this.fireEvent('DashboardMer_ProgressStore_Done');
				if(!success){
					//  this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},
});