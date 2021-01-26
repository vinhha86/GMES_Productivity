Ext.define('GSmartApp.view.stockin.Balance_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Balance_D',
	id: 'Balance_D',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	columnLines: true,
	rowLines: true,
	border: true,
	// features: [{
	// 	ftype: 'summary',
	// 	dock: 'bottom'
	// }],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false                
    },
	bind:{
		store: '{Balance_D}'
	},
	columns: [
		{
			text: 'Mã NPL', 
			width: 120,
			dataIndex: 'sku_product_code'
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1
		},{
			text: 'Màu', 
			dataIndex: 'color_name',
			width: 70
		},{
			text: 'Cỡ', 
			dataIndex: 'size_name',
			width: 50
		},{
			text: 'ĐVT', 
			dataIndex: 'unit_name',
			width: 70
		},
		{
			text: 'Định mức',
			dataIndex: 'amount',
			width: 55,
			xtype: 'numbercolumn',
			format: '0.0000',
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				return Ext.util.Format.number(value, '0.0000')
			}
		},				
		{
			text: '%TH',
			dataIndex: 'lost_ratio',
			width: 50,
			xtype: 'numbercolumn',
			format: '0.000',
			renderer: function (value, metaData, record) {
				return value+" %";
			}
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Nhu cầu', 
			align:'right',
			dataIndex: 'totalpackage_require',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Đặt hàng', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackage_order',
			width: 80
		},
		{
			text:'Dự kiến về',
			dataIndex:'shipdate',
			renderer: Ext.util.Format.dateRenderer('d/m/y'),
			width: 75
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Nhập kho', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackage_stockin',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Chênh lệch', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackage_dif',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Đã xuất', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackage_stockout',
			width: 80
		},
	],
});

