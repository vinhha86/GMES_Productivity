Ext.define('GSmartApp.view.stockout.StockoutOrderPickup_List', {
    extend: 'Ext.grid.Panel',
	xtype: 'StockoutOrderPickup_List',
	id: 'StockoutOrderPickup_List',
	bind: {
		store: '{Stockout_order_Store}'
	},
	columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
		text: 'Số yêu cầu',
		dataIndex: 'stockout_order_code',
		width: 100,
		items: {
			xtype: 'textfield',
			fieldStyle: "",
			reference: 'stockout_orderFilter',
			width: 1966,
			flex: 1,
			margin: 2,
			enableKeyEvents: true,
			listeners: {
				keyup: 'onStockout_orderFilterKeyup',
				buffer: 500
			},
			bind:{
				value: '{stockout_order_code}'
			}
		}
	},{
		text: 'Ngày yêu cầu',
		xtype: 'datecolumn',
		format: 'd/m/Y',
		dataIndex: 'timecreate',
		width: 120
	},{
		text: 'Nhà cung cấp',
		dataIndex: 'orgProviderName',
		flex: 1
	}],
	dockedItems: [{
		dock: 'top',
		layout: 'hbox',
		items: [{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Ngày HĐ từ',
			itemId: 'stockoutorderdate_from',
			editable: false,
			margin: '5 5 5 5',
			value: new Date(),
			width: 110,
            format:'d/m/y'
		},{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Ngày HĐ đến',
			itemId: 'stockoutorderdate_to',
			editable: false,
			margin: '5 5 5 0',
			width: 110,
			value: new Date(),
            format:'d/m/y'
		},{
            xtype: 'combobox',
			emptyText: 'Nơi xuất',
			itemId: 'orgid_from_link',
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

