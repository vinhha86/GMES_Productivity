Ext.define('GSmartApp.store.personnel.PersonnelStatus_Store', {
	extend: 'Ext.data.Store',
	storeId: 'PersonnelStatus_Store',
    alias: 'store.PersonnelStatus_Store',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'name',  type: 'string'}
	],
	data: [{
        name: 'Đi làm', id: 1
    },{
        name: 'Nghỉ việc', id: 0
    }]
});