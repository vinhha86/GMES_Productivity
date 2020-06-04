Ext.define('GSmartApp.store.OrgTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.orgtypestore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'code',  type: 'string'},
		{name: 'name_vi',   type: 'string'},
		{name: 'name_en',   type: 'string'},
		{
			name: 'name', 
			calculate: function(data) {
				if('vi'==GSmartApp.Locales.currentLocale){
					return data.name_vi;
				}else{
					return data.name_en;
				}
                
			}}
	],
	data:[
		{id:'1',name_vi:'Trụ sở chính',name_en:'Head quater'},
		{id:'2',name_vi:'Chi nhánh',name_en:'Branch'},
		{id:'3',name_vi:'Kho nguyên liệu',name_en:'Material Store'},
		{id:'4',name_vi:'Cửa hàng',name_en:'Shop'},
		{id:'5',name_vi:'Nhà cung cấp',name_en:'Provider'},
		{id:'6',name_vi:'Chủ hàng (đặt gia công)',name_en:'Boss'},
		{id:'7',name_vi:'Đơn vị gia công',name_en:'Outsource'},
		{id:'8',name_vi:'Kho thành phẩm',name_en:'Product Store'},
		{id:'9',name_vi:'Phòng hoàn thiện SP',name_en:'Product QC'},
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
	
});
