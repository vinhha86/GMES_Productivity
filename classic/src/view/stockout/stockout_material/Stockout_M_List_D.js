Ext.define('GSmartApp.view.stockin.Stockout_M_List_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockout_M_List_D',
	id: 'Stockout_M_List_D',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        getRowClass: function(record, index) {
            var c = record.get('status');
            if (c == -1) {
                return 'epc-error';
            }
            else {
                return 'epc-ok';
            }
        }                     
    },
	// plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onDItemEdit',
    //             // beforeedit: 'onPriceDItemBeforeEdit'
    //         }             
    //     }
    // },
	bind:{
		store: '{StockoutD_Store}'
	},
	columns: [
		{
			text: 'Mã NPL', 
			width: 100,
			dataIndex: 'skucode'
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			width: 100,
		},{
			text: 'Mô tả', 
			dataIndex: 'sku_product_desc',
			flex: 1
		},{
			text: 'Màu', 
			dataIndex: 'sku_product_color',
			width: 120,
		},{
			text: 'Cỡ', 
			dataIndex: 'size_name',
			width: 70,
		},{
			text: 'ĐVT', 
			dataIndex: 'unitid_link',
			width: 70,
			editor: {
				completeOnEnter: true,
				field: {
					xtype: 'combo',
					typeAhead: true,
					triggerAction: 'all',
					selectOnFocus: false,
					bind: {
						store: '{UnitStore}',
						// value: '{unitid_link}'
					},
					displayField: 'code',
					valueField: 'id',
					queryMode : 'local',
					editable: false,
					readOnly: true
				}
			},
			renderer: 'renderUnit'
		},
        {
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Y/C (M)', 
			align:'right',
			dataIndex: 'totalmet_origin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 100,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
		},
        {
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL xuất (M)', 
			align:'right',
			dataIndex: 'totalmet_check',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 105,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
		},
        // {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'SL yêu cầu (y)', 
		// 	align:'right',
		// 	dataIndex: 'totalydsorigin',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 90,
		// 	bind: {
		// 		hidden: '{isYdsColumnHidden}',
		// 	},
		// },
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'SL xuất (y)', 
		// 	align:'right',
		// 	dataIndex: 'totalydscheck',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 90,
		// 	bind: {
		// 		hidden: '{isYdsColumnHidden}',
		// 	},
		// },
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Cây xuất', 
			align:'right',
			dataIndex: 'totalpackagecheck',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70,
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9]/,
			// 	selectOnFocus: true
			// },
		},
	],
});

