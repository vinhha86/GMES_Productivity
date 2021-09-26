Ext.define('GSmartApp.view.Recon.Recon_D_Pcontract', {
	extend: 'Ext.grid.Panel',
	xtype: 'Recon_D_Pcontract',
	id: 'Recon_D_Pcontract',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'grouping',
		groupHeaderTpl: '{name}',
		collapseTip: "",
		expandTip: ""
	}],
	viewConfig: {
		enableTextSelection: true,
		stripeRows: false
	},
	// selModel: {
	//     selType: 'checkboxmodel',
	// },
	bind: {
		store: '{SKUReconStore}'
	},
	columns: [
		{
			text: 'Mã NPL',
			width: 150,
			dataIndex: 'mat_sku_code',
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldMaNPL',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueMaNPLKeyup',
					buffer: 500
				}
			},
			locked: true
		},
		{
			text: 'Màu NPL',
			dataIndex: 'mat_sku_color_name',
			// width: 150,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value == 'ALL' ? "" : value;
			}
		},
		{
			text: 'Thành phần vải',
			dataIndex: 'mat_sku_desc',
			width: 150,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Cỡ khổ',
			dataIndex: 'mat_sku_size_name',
			width: 100,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value == 'ALL' ? "" : value;
			}
		},
		{
			text: 'ĐVT',
			dataIndex: 'mat_sku_unit_name',
			width: 70
		},
		{
			text: 'Định mức',
			dataIndex: 'mat_sku_bom_amount',
			width: 70,
			xtype: 'numbercolumn',
			format: '0.0000',
			renderer: function (value, metaData, record) {
				if (value == 0) return "";
				return Ext.util.Format.number(value, '0.0000')
			}
		},
		{
			text: '%TH',
			dataIndex: 'mat_sku_bom_lostratio',
			width: 55,
			xtype: 'numbercolumn',
			format: '0.00',
			// renderer: function (value, metaData, record) {
			// 	return value+" %";
			// }
		}, 
		{//NPL can phai co de sx theo dinh muc can doi
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'Nhu cầu ĐH',
			align: 'right',
			dataIndex: 'mat_sku_demand_dh',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80
		},
		{//NPL da nhap ve kho
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'Nhập SX',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockin',
			width: 80
		},
		{//NPL da xuat sang sx
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'Xuất SX',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout',
			width: 80
		},
		{//NPL xuat theo san pham xuat kho
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'Xuất thành phẩm',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_byproduct_stockout',
			width: 90
		},
		{//NPL con ton trong kho
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'Tồn',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'in_stock',
			width: 80
		},
	],
});

