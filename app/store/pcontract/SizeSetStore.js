Ext.define('GSmartApp.store.SizeSetStore', {
    extend: 'Ext.data.Store',
    alias: 'store.SizeSetStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',   type: 'string'}
	],
	data:[
		{id:1,	name:'Monthly'},
		{id:2,	name:'Infant'},
		{id:3,	name:'Toddle'},
		{id:4,	name:'Big'},
		{id:5,	name:'Normal'},
		{id:6,	name:'Plus'}
	]
});
