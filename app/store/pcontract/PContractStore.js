Ext.define('GSmartApp.store.pcontract.PContractStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContractStore',
	storeId: 'PContractStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'orgcustomerid_link',   type: 'int'},
		{name: 'orgcustomerName',   type: 'string'},
		{name: 'orgvenderid_link',   type: 'int'},
		{name: 'orgbuyerid_link',   type: 'int'},
		{name: 'cust_contractcode',   type: 'string'},
		{name: 'contractcode',   type: 'string'},
        {name: 'contractdate', type: 'date', dateFormat: 'c'},
        {name: 'deliverydate',   type: 'date', dateFormat: 'c'},
		{name: 'seasonid_link',   type: 'int'},
		{name: 'seasonName',   type: 'string'},
		{name: 'branchid_link',   type: 'int'},
		{name: 'branchName',   type: 'string'},
        {name: 'description',   type: 'string'},
		{name: 'usercreatedid_link',   type: 'int'},
		{name: 'usercreatedName',   type: 'string'},
		{name: 'datecreated',   type: 'string'}
    ],
    pageSize: 25,
	sorters: [{
        direction: 'ASC',
        property: 'deliverydate'
	}],
	loadStore_ByPage:function(limit, page, cust_contractcode, contractcode, orgbuyerid_link,
		branchid_link, seasonid_link){
		var me=this;
		var params = new Object();
		params.cust_contractcode = cust_contractcode;
		params.contractcode = contractcode;
		params.orgbuyerid_link = orgbuyerid_link;
		params.branchid_link = branchid_link;
		params.seasonid_link = seasonid_link;
		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract/getbypaging',
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
				else{
					console.log(records);
				}
			}
		});
	},
});
