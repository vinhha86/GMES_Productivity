Ext.define('GSmartApp.model.pcontract.PContractPO_Price', {
    extend: 'Ext.data.Model',
	fields: [
		'idx',
		{name: 'orgrootid_link',   type: 'int'},
		{name: 'id',   type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'pcontract_poid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
		{name: 'sizesetid_link',   type: 'int'},
		{name: 'price_cmp',   type: 'number'},
		{name: 'price_fob',   type: 'number'},
		{name: 'sewfobratio',   type: 'number'},
		{name: 'price_sewingtarget',   type: 'number'},
		{name: 'price_sewingcost',   type: 'number'},
		{name: 'totalprice',   type: 'number'},
		{name: 'salaryfund',   type: 'number'},	
		'sizesetname'
	],
	hasMany : {model: 'PContractPO_Price_D', name: 'pcontract_price_d'}
});