Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_Pkl', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl',
    itemId: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl',
    reference: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl',
    controller: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Controller',
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
        store: '{Stockout_order_pkl_Store}',
    },
    columns: [
		{
			text: 'Khoang', 
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
			text: 'Số Lot', 
			// dataIndex: 'mat_sku_color_name',
			// width: 85,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Số cây', 
			// dataIndex: 'mat_sku_color_name',
			// width: 85,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Khổ', 
			// dataIndex: 'mat_sku_color_name',
			// width: 85,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Dài (m)', 
			align:'right',
			// dataIndex: 'mat_sku_demand',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
		},
	],
});

