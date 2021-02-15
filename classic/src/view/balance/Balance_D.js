Ext.define('GSmartApp.view.balance.Balance_D', {
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
		store: '{SKUBalanceStore}'
	},
	columns: [
		{
			text: 'Mã NPL', 
			width: 100,
			dataIndex: 'mat_sku_code'
		},{
			text: 'Tên NPL', 
			dataIndex: 'mat_sku_name',
			flex: 1
		},{
			text: 'Màu', 
			dataIndex: 'mat_sku_color_name',
			width: 85
		},{
			text: 'Cỡ', 
			dataIndex: 'mat_sku_size_name',
			width: 50
		},{
			text: 'ĐVT', 
			dataIndex: 'mat_sku_unit_name',
			width: 70
		},
		{
			text: 'Định mức',
			dataIndex: 'mat_sku_bom_amount',
			width: 65,
			xtype: 'numbercolumn',
			format: '0.0000',
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				return Ext.util.Format.number(value, '0.0000')
			}
		},				
		{
			text: '%TH',
			dataIndex: 'mat_sku_bom_lostratio',
			width: 55,
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
			dataIndex: 'mat_sku_demand',
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
			dataIndex: 'mat_sku_invoice',
			width: 80
		},
		{
			text:'Dự kiến về',
			dataIndex:'mat_sku_invoice_date',
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
			dataIndex: 'mat_sku_stockin',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Chênh lệch', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_dif',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Đã xuất', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout',
			width: 80
		},
	],
});

