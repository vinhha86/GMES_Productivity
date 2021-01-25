Ext.define('GSmartApp.view.invoice.InvoicePickup_List', {
    extend: 'Ext.grid.Panel',
	xtype: 'InvoicePickup_List',
	id: 'InvoicePickup_List',
	bind: {
		store: '{InvoiceList_Store}'
	},
	columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
		text: 'Số hóa đơn',
		dataIndex: 'invoicenumber',
		width: 100
	},{
		text: 'Ngày hóa đơn',
		xtype: 'datecolumn',
		format: 'd/m/Y',
		dataIndex: 'invoicedate',
		width: 120
	},{
		text: 'Nhà cung cấp',
		dataIndex: 'orgfrom_name',
		flex: 1
	}],
	dockedItems: [{
		dock: 'top',
		layout: 'hbox',
		items: [{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Ngày HĐ từ',
			itemId: 'invociedate_from',
			editable: false,
			margin: '5 0 5 0',
			value: new Date(),
			width: 110,
            format:'d/m/y'
		},{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Ngày HĐ đến',
			itemId: 'invociedate_to',
			editable: false,
			margin: '5 0 5 0',
			width: 110,
			value: new Date(),
            format:'d/m/y'
		},{
            xtype: 'combobox',
			emptyText: 'Nhà cung cấp',
			itemId: 'org_prodviderid_link',
            bind:{
                store: '{OrgProviderStore}'
            },
            queryMode: 'local',
            margin: '5 0 5 0',
            displayField: 'name',
            valueField: 'id'
        },{
            xtype: 'button',
            margin: 5,
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
	}]	
});

