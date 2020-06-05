Ext.define('GSmartApp.store.pcontract.PContract_PO_Price_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.PContract_PO_Price_Store',
	storeId: 'PContract_PO_Price_Store',
	idProperty: 'idx',
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
	sorters: [{
        direction: 'ASC',
        property: 'id'
	}]
});
