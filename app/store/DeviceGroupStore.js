Ext.define('GSmartApp.store.DeviceGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.devicegroupstore',
	fields: [
		{name: 'id', type: 'number'},
		{name: 'name',   type: 'string'}
	],
	data:[{ 
		id:1,
		name:'Nhóm thiết bị số 1'
	},{
		id:2,
		name:'Nhóm thiết bị số 2'
	}]
	
});
