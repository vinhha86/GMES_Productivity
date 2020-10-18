Ext.define('GSmartApp.store.personnel.PersonnelStatus_Store', {
	extend: 'Ext.data.Store',
	storeId: 'PersonnelStatus_Store',
    alias: 'store.PersonnelStatus_Store',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'name',  type: 'string'}
	],
	data: [{
        name: 'Hoạt động', id: 1
    },{
        name: 'Dừng hoạt động', id: 0
    }]
});