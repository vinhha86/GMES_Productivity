Ext.define('GSmartApp.view.invoice.invoice_packinglist_detail', {
	extend: 'Ext.grid.Panel',
	xtype: 'invoice_packinglist_detail',
	id: 'invoice_packinglist_detail',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'invoice_packinglist_detail_Controller',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{PackingListStore}'
	},
	columns: [
		{
			text: 'Cây số', 
			dataIndex: 'packageid',
            flex: 1,
            summaryType: 'count',
			summaryRenderer: 'renderCount'
		},{
			text: 'N.W', 
            dataIndex: 'netweight',
            summaryType: 'sum',
			summaryRenderer: 'renderSum'
        },
        {
			text: 'G.W', 
            dataIndex: 'grossweight',
            summaryType: 'sum',
			summaryRenderer: 'renderSum'
        },
        {
			text: 'YDS', 
            dataIndex: 'ydsorigin',
            summaryType: 'sum',
			summaryRenderer: 'renderSum'
        },
        {
			text: 'M3', 
			dataIndex: 'm3',
			summaryType: 'sum',
			summaryRenderer: 'renderSum'
		}	
	],
	dockedItems: [{
		dock: 'top',
        xtype: 'toolbar',
		items: [
            {
			xtype: 'textfield',
			margin: 1,
			itemId:'packageid',
			emptyText: 'Cây số',
			width: 120,
			labelWidth: 0,
			hideLabel: true,	
			maskRe: /[0-9]/,		
            bind:{
				value: '{packinglist.packageid}'
            }
		},
		{
			xtype: 'textfield',
			margin: 1,
			itemId:'netweight',
			emptyText: 'N.W',
			flex: 1,
			labelWidth: 0,
			hideLabel: true,			
            bind:{
				value: '{packinglist.netweight}'
            }
        },
        {
			xtype: 'textfield',
			margin: 1,
			itemId:'grossweight',
			emptyText: 'G.W',
			flex: 1,
			labelWidth: 0,
			hideLabel: true,			
            bind:{
				value: '{packinglist.grossweight}'
            }
		},
        {
			xtype: 'textfield',
			margin: 1,
			itemId:'ydsorigin',
			emptyText: 'YDS',
			flex: 1,
			labelWidth: 0,
			hideLabel: true,			
            bind:{
				value: '{packinglist.ydsorigin}'
            }
		},
		{
			xtype: 'textfield',
			margin: 1,
			itemId:'m3',
			emptyText: 'M3',
			flex: 1,
			labelWidth: 0,
			hideLabel: true,			
            bind:{
				value: '{packinglist.m3}'
            }
        },
		{
			tooltip: 'Thêm',
			margin: '0 5 0 5',
			itemId: 'btnThemPKL',
			iconCls: 'x-fa fa-plus',
			weight: 30
		} 		
	]
	}]
});

