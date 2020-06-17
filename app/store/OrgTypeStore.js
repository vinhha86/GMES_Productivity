Ext.define('GSmartApp.store.OrgTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.orgtypestore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'name',   type: 'string'},
		{name: 'name_en',   type: 'string'}
	],
	data:[
		{id:'1',name:'Trụ sở chính',name_en:'Head quater'},
		{id:'2',name:'Chi nhánh',name_en:'Branch'},
		{id:'3',name:'Kho nguyên liệu',name_en:'Material Store'},
		{id:'4',name:'Cửa hàng',name_en:'Shop'},
		// {id:'5',name:'Nhà cung cấp',name_en:'Provider'},
		{id:'6',name:'Chủ hàng (đặt gia công)',name_en:'Boss'},
		{id:'7',name:'Đơn vị gia công',name_en:'Outsource'},
		{id:'8',name:'Kho thành phẩm',name_en:'Product Store'},
		{id:'9',name:'Phòng hoàn thiện SP',name_en:'Product QC'},
	],
	loadStore:function(type){
		var me=this;
		var params = new Object();
		params.type =type;
		var access_token = GSmartApp.Ajax.access_token();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			 url: config.getAppBaseUrl()+'/api/v1/org/getOrgByType',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
				'authorization': access_token
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
	
	loadAllOrgType:function(){
		var me=this;
		var params = new Object();
		var access_token = GSmartApp.Ajax.access_token();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			 url: config.getAppBaseUrl()+'/api/v1/orgtype/getAllOrgType',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
				'authorization': access_token
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
	}
});
