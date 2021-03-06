Ext.define('GSmartApp.model.pcontract.PContractModel', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'orgcustomerid_link',   type: 'int'},
		{name: 'orgcustomerName',   type: 'string'},
		{name: 'orgvenderid_link',   type: 'int'},
		{name: 'orgbuyerid_link',   type: 'int'},
		{name: 'cust_contractcode',   type: 'string'},
		{name: 'contractcode',   type: 'string'},
        {name: 'contractdate', type: 'date', dateFormat: 'c'},
        {name: 'deliverydate',   type: 'date', dateFormat: 'c'},
		{name: 'seasonid_link',   type: 'int'},
		{name: 'seasonName',   type: 'string'},
		{name: 'branchid_link',   type: 'int'},
		{name: 'branchName',   type: 'string'},
        {name: 'description',   type: 'string'},
		{name: 'usercreatedid_link',   type: 'int'},
		{name: 'usercreatedName',   type: 'string'},
		{name: 'datecreated',   type: 'string'},
		'marketypeid_link',
		'orgshowid_link',
        'contracttypeid_link',
        'orgpayerid_link',
		'payer',
		'orgshow',
		'buyername',
		'vendorname',
		'contractbuyerid_link'
    ]
});