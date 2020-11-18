Ext.define('GSmartApp.store.SalarySumStore', {
	extend: 'Ext.data.Store',
	storeId: 'SalarySumStore',
	alias: 'store.SalarySumStore',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'id', type: 'int'},
		{name: 'personnelid_link',   type: 'int'},
		{name: 'year',   type: 'int'},
		{name: 'month',   type: 'int'},
		{name: 'fromdate',   type: 'date'},
		{name: 'todate',   type: 'date'},
		{name: 'sumcolid_link',   type: 'int'},
		{name: 'sumcoltypeid_link',   type: 'int'},
		{name: 'sumvalue',   type: 'number'},
		{name: 'personel_fullname',   type: 'string'},
		{name: 'sumcol_code',   type: 'string'},
		{name: 'sumcoltype_name',   type: 'string'}
	],
	sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
	loadStore:function(orgid_link,year,month){
        var params = new Object();
        params.orgid_link = orgid_link;
        params.year = year;
        params.month = month;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/salarysum/salary_sum_calculate',
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
		// this.load();
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	}
});
