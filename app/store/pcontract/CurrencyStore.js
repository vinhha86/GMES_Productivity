Ext.define('GSmartApp.store.CurrencyStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurrencyStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',   type: 'string'}
	],
	data:[
		{id:1,	name:'USD'},
		{id:2,	name:'EUR'},
		{id:3,	name:'CHN'}
	]
});
