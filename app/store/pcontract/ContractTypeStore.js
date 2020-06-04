Ext.define('GSmartApp.store.ContractTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ContractTypeStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',   type: 'string'}
	],
	data:[
		{id:1,	name:'CMP'},
		{id:2,	name:'FOB'},
		{id:3,	name:'Gia công nội địa'},
		{id:4,	name:'Thuê gia công'}
	]
});
