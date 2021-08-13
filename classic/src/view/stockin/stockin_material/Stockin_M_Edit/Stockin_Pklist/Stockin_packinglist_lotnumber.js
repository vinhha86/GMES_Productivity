Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_lotnumber', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_packinglist_lotnumber',
	id: 'Stockin_packinglist_lotnumber',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'Stockin_packinglist_lotnumber_Controller',
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
		store: '{LotStore}'
	},
	columns: [
		{
			text: 'Số Lot', 
			dataIndex: 'lotnumber',
            flex: 1,
            summaryType: 'count',
			summaryRenderer: 'renderCount'
		},
        // {
		// 	text: 'Khổ vải', 
        //     dataIndex: 'sizenumber'
		// }
	],
	dockedItems: [{
		dock: 'top',
        xtype: 'toolbar',
        layout: 'hbox',
		items: [
            {
			xtype: 'textfield',
			margin: 1,
			itemId:'lotnumber',
			emptyText: 'Số lót',
			width: 100,
			labelWidth: 0,
			hideLabel: true,			
            bind:{
				value: '{lotnumber.lot}'
            }
		},
		// {
		// 	xtype: 'textfield',
		// 	margin: 1,
		// 	itemId:'sizenumber',
		// 	emptyText: 'khổ vải',
		// 	flex: 1,
		// 	labelWidth: 0,
		// 	hideLabel: true,			
        //     bind:{
		// 		value: '{lotnumber.size}'
        //     }
		// },
		{
			tooltip: 'Thêm',
			margin: '0 5 0 5',
			itemId: 'btnThemLot',
			iconCls: 'x-fa fa-plus',
			weight: 30
		} 		
	]
	}]
});

