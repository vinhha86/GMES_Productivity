Ext.define('GSmartApp.store.UserListStore', {
    extend: 'Ext.data.Store',
    alias: 'store.userliststore',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'useremail',  type: 'string'},
		{name: 'lastname',   type: 'string'},
		{name: 'midlename',   type: 'string'},
		{name: 'firtname',   type: 'string'},
		{name: 'status',   type: 'number'},
		'index',
		'org_grant_id_link',
		{
			name: 'statusname',
			type: 'string',
			calculate: function(data) {
				if(1==data.status){
					 return GSmartApp.Locales.trangthai_hoatdong[GSmartApp.Locales.currentLocale] ;
				}else{
					return GSmartApp.Locales.trangthai_dunghoatdong[GSmartApp.Locales.currentLocale] 
				}
			}
		}
	],
	sorters: [{
        property: 'status',
        direction: 'DESC'
    },{
        property: 'orgname',
        direction: 'ASC'
    }],
	loadStore: function(){
        var params = new Object();

        params.textsearch ="";
        params.status = 1;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/users/user_list',
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
	},
	loadStore_bypage: function(firstname, middlename, lastname, username, groupuserid_link){
        var params = new Object();

        params.firstname =firstname;
		params.middlename = middlename;
		params.lastname =lastname;
		params.username = username;
        params.groupuserid_link = groupuserid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/users/user_list_bypage',
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
	},
	loadUserinOrg: function(){
        this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/users/user_getuserinorg',
			paramsAsJson:true,
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
	loadUserbyOrg: function(orgid_link){
		var params = new Object();
		params.orgid_link = orgid_link;
        this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/users/getbyorg',
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
	},
	loadUserbyOrg_Buyer: function(orgid_link, orgbuyerid_link){
		var params = new Object();
		params.orgid_link = orgid_link;
		params.orgbuyerid_link = orgbuyerid_link;
        this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/users/getby_org_buyer',
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
