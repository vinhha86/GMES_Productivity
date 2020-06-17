Ext.define('GSmartApp.model.pcontract.PContractPO_Price_D', {
    extend: 'Ext.data.Model',
	fields: [
		'idx',
		{name: 'orgrootid_link',   type: 'int'},
		{name: 'id',   type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'pcontract_poid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
		{name: 'price',   type: 'number'},
		{name: 'cost',   type: 'number'},
		{name: 'isfob'},
		{name: 'currencyid_link',   type: 'int'},
		'exchangerate',
		'status',
		'usercreatedid_link',
		'datecreated',
		'usercreatedName',
		'fobpriceid_link',
		'fobprice_name'
    ],
});