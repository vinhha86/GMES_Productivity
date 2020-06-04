Ext.define('GSmartApp.model.pcontract.PContractProductTreeModel', {
    extend: 'Ext.data.TreeModel',
    fields: [
		{name: 'id'},
		{name: 'parent_id',  type: 'int'},
		{name: 'text',   type: 'string'},
		{name: 'code',   type: 'string'},
		{name: 'imgproduct'},
    ],
});