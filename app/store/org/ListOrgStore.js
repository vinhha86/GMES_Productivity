Ext.define('GSmartApp.store.org.ListOrgStore', {
    extend: 'Ext.data.Store',
	alias: 'store.ListOrgStore',
	storeId: 'ListOrgStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'code',  type: 'string'},
        {name: 'name',   type: 'string'},
		{name: 'orgtypeid_link',   type: 'int'},
		{name: 'countryid_link',   type: 'int'},
        {name: 'city', type: 'string'},
        {name: 'address',   type: 'string'},
        {name: 'gpslat',   type: 'number'},
        {name: 'gpslong',   type: 'number'},
        {name: 'mainbizid_link',   type: 'int'},
		{name: 'timezone',   type: 'int'},
		{name: 'contactperson',   type: 'string'},
		{name: 'email',   type: 'string'},
        {name: 'langid_link',   type: 'int'},
        {name: 'status',   type: 'int'},
		{name: 'parentid_link',   type: 'int'},
		{name: 'phone',   type: 'string'},
		{name: 'rootid_link',   type: 'int'}
	],
	sorters: {
        direction: 'ASC',
        property: 'id'
    },
	loadStore:function(type, isAll){
		var me=this;
		if(isAll == null)
		isAll = false;
		var params = new Object();
		params.orgtypeid_link = type;
		params.isAll = isAll;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/getOrgByTypeId',
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
	loadStore_Async:function(type, isAll){
		var me=this;
		if(isAll == null)
		isAll = false;
		var params = new Object();
		params.orgtypeid_link = type;
		params.isAll = isAll;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/getOrgByTypeId',
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
	},	
	loadStore_allchildren_byorg(listid){
		//Lấy tất cả các Org có loại trong danh sách listid và under Org của User đang đăng nhập
		var params = new Object();
		params.listid = listid;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/getallchildrenbyorg',
			paramsAsJson:true,
			extraParams: params,
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
	loadStore_allchildren_byorg_async(listid, isincludemyself){
		//Lấy tất cả các Org có loại trong danh sách listid và under Org của User đang đăng nhập
		var params = new Object();
		params.listid = listid;
		params.isincludemyself = isincludemyself;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/getallchildrenbyorg',
			paramsAsJson:true,
			extraParams: params,
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
	},	
	loadStoreByOrgId(id){
		var params = new Object();
		params.id = id;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/getOrgById',
			paramsAsJson:true,
			extraParams: params,
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
	loadOrg_Request: function(pcontract_poid_link) {
		var me=this;
		var params = new Object();
		params.pcontract_poid_link = pcontract_poid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			 url: config.getAppBaseUrl()+'/api/v1/org/get_orgreq',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			extraParams: params,
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
	loadOrg_NotRequest: function(pcontract_poid_link) {
		var me=this;
		var params = new Object();
		params.pcontract_poid_link = pcontract_poid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			 url: config.getAppBaseUrl()+'/api/v1/org/get_orgnotreq',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			extraParams: params,
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
	loadToSX:function(parentid_link){
		var params = new Object();
		params.id = parentid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/tosxbyparent',
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
	getbyParent:function(parentid_link){
		var params = new Object();
		params.id = parentid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/getbyparent',
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
	loadToSX_Async:function(parentid_link){
		var params = new Object();
		params.id = parentid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/tosxbyparent',
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
	},
	loadStore_byRoot(listid){
		//Lấy tất cả các Org có loại trong danh sách listid và under RootOrg, trừ Org của User đang đăng nhập
		var params = new Object();
		params.listid = listid;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/org/getallbyroot_notuser',
			paramsAsJson:true,
			extraParams: params,
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
});
