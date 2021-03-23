Ext.define('GSmartApp.view.stockout.Stockout_packinglist_warehouse', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockout_packinglist_warehouse',
	id: 'Stockout_packinglist_warehouse',
	title: 'Danh sách hàng tồn kho',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
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
		store: '{WarehouseStore}'
	},
	columns: [
		{
			text: 'Số Lot', 
			dataIndex: 'lotnumber',
            flex: 1,
            // summaryType: 'count',
			// summaryRenderer: 'renderCount'
		},
		{
			text: 'Số cây', 
			dataIndex: 'packageid',
            flex: 1
		},
		{
			text: 'Mầu', 
			dataIndex: 'color_name',
            flex: 1
		},
		{
			text: 'Khổ', 
			dataIndex: 'width',
            flex: 1
		},
		{
			text: 'Dài (M)', 
			dataIndex: 'met',
            flex: 1
		},
	],
});

