Ext.define('GSmartApp.store.personnel.Personnel_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.Personnel_Store',
	storeId: 'Personnel_Store',
	idProperty: 'idx',
	model: 'GSmartApp.model.personnel.PersonnelModel',
	sorters: [{
        direction: 'ASC',
        property: 'code'
	}]
});
