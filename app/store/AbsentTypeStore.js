Ext.define('GSmartApp.store.AbsentTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.AbsentTypeStore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'name',   type: 'string'}
	],
	data:[{ 
		id:'L',
		name:'Nghỉ lễ'
	},{
		id:'F',
		name:'Nghỉ phép'
	},{
		id:'RO',
		name:'Nghỉ không hưởng lương'
	}],
	// loadStore:function(){
	// 	var me=this;
	// 	this.setProxy({
	// 		type: 'ajax',
	// 		actionMethods: {
	// 			create : 'POST',
	// 			read   : 'POST',
	// 			update : 'POST',
	// 			destroy: 'POST'
	// 		},
	// 		url: config.getAppBaseUrl()+'/api/v1/device/getalldevicegroup',
	// 		paramsAsJson:true,
	// 		noCache: false,
	// 		headers :{
	// 			'Accept': "application/json", 
	// 			'Content-Type':"application/json"
	// 		 },
	// 		reader: {
	// 			type: 'json',
	// 			rootProperty: 'data'
	// 		}
	// 	});
	// 	this.loadPage(1,{
	// 		scope: this,
	// 		callback: function(records, operation, success) {
	// 			if(!success){
	// 				//  this.fireEvent('logout');
	// 			}
	// 		}
	// 	});
	// }
	
});
