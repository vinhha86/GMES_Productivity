Ext.define('GSmartApp.store.TimeSheetAbsence.TimeSheetAbsenceStore', {
    extend: 'Ext.data.Store',
	alias: 'store.TimeSheetAbsenceStore',
	storeId: 'TimeSheetAbsenceStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link', type: 'int'},
		{name: 'personnelid_link', type: 'int'},
        {name: 'absencedate_from', type: 'date', dateFormat: 'c'},
        {name: 'absencedate_to', type: 'date', dateFormat: 'c'},
		{name: 'absence_reason', type: 'string'},
		{name: 'absencetypeid_link', type: 'int'},
		{name: 'usercreatedid_link', type: 'int'},
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
		{name: 'userapproveid_link', type: 'int'},
        {name: 'timeapprove', type: 'date', dateFormat: 'c'},
    ],
    pageSize: 25,
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
			url: config.getAppBaseUrl()+'/api/v1/timesheetabsence/getAllTimeSheetAbsence',
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
					console.log(records);
				}
			}
		});
	},
	loadStore_ByPage:function(limit, page, contract_code, contract_year, contract_datefrom,
		contract_dateto, buyerid_link, vendorid_link){
		var me=this;
		var params = new Object();
		params.contract_code = contract_code;
		params.contract_year = contract_year;
		params.contract_datefrom = contract_datefrom;
		params.contract_dateto = contract_dateto;
		params.buyerid_link = buyerid_link;
		params.vendorid_link = vendorid_link;
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
			url: config.getAppBaseUrl()+'/api/v1/contractbuyer/getbypaging',
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
    loadYearsStore:function(){
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
			url: config.getAppBaseUrl()+'/api/v1/contractbuyer/getyears',
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
				}
			}
		});
	},
	loadStoreByBuyer:function(buyerid_link){
		var me=this;
		var params = new Object();
		params.id = buyerid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			// url: config.getAppBaseUrl()+'/api/v1/pcontract/getbypaging',
			url: config.getAppBaseUrl()+'/api/v1/contractbuyer/getByBuyer',
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
	},
});
