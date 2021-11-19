Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Plan_StockoutOrder_View',
    itemId: 'POrder_Grant_Plan_StockoutOrder_View',
    reference: 'POrder_Grant_Plan_StockoutOrder_View',
    controller: 'POrder_Grant_Plan_StockoutOrder_View_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    // features: [
    //     {
    //         id: 'group',
    //         ftype: 'groupingsummary',
    //         groupHeaderTpl: '<b>NPL: {name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store: '{SKUBalanceStore}',
    },
    columns: [
		{
			text: 'Mã lệnh cấp vải', 
			// width: 120,
			flex: 1,
			// dataIndex: 'mat_sku_code',
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldMaNPL',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueMaNPLKeyup',
			// 		buffer: 500
			// 	}
			// }
		},
		{
			text: 'Mã SP(Buyer)', 
			// dataIndex: 'mat_sku_color_name',
			// width: 85,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Mã NPL', 
			// dataIndex: 'mat_sku_color_name',
			// width: 85,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Tên NPL', 
			// dataIndex: 'mat_sku_color_name',
			// width: 85,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Mô tả', 
			// dataIndex: 'mat_sku_color_name',
			// width: 85,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Màu', 
			// dataIndex: 'mat_sku_color_name',
			// width: 85,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Cỡ/khổ', 
			// dataIndex: 'mat_sku_color_name',
			// width: 85,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{ 
            xtype: 'datecolumn',
            format: 'd/m/Y',
            header: 'Ngày tở', 
            // dataIndex: 'date', 
            flex: 1,
        },
		{ 
            xtype: 'datecolumn',
            format: 'd/m/Y',
            header: 'Ngày xuất', 
            // dataIndex: 'date', 
            flex: 1,
        },
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Cây Y/C', 
			align:'right',
			// dataIndex: 'mat_sku_demand',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Met Y/C', 
			align:'right',
			// dataIndex: 'mat_sku_demand',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Cây tở', 
			align:'right',
			// dataIndex: 'mat_sku_demand',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Met tở', 
			align:'right',
			// dataIndex: 'mat_sku_demand',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Cây xuất', 
			align:'right',
			// dataIndex: 'mat_sku_demand',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Met xuất', 
			align:'right',
			// dataIndex: 'mat_sku_demand',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
		},
	],
});

