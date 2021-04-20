Ext.define('GSmartApp.view.stockin.Stockin_M_Main_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_M_Main_D',
	id: 'Stockin_M_Main_D',
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
		store: '{StockinD_Store}'
	},
	columns: [
		// {
		// 	text: 'Mã vạch', 
		// 	dataIndex: 'skucode',
		// 	width: 120,	
		// 	summaryRenderer:function (grid, context) {
		// 		return "Tổng cộng";
		// 	}
		// },
		{ 
			xtype: 'actioncolumn',
			reference: 'stockin_contextmenu',
			width: 25,
			menuDisabled: true,
			sortable: false,
			items: [
			// {
			// 	iconCls: 'x-fa fas fa-bars violetIcon',
			// 	tooltip:'Chi tiết chíp',
			// 	handler: 'onEPCDetail'
			// },
			{
				iconCls: 'x-fa fas fa-bars violetIcon',
				tooltip:'PackingList',
				handler: 'onViewPackingList'
			},
		]
		},  			
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
			dataIndex: 'color_name',
			width: 120
		},{
			text: 'Cỡ khổ', 
			dataIndex: 'size_name',
			width: 70
		},{
			text: 'ĐVT', 
			dataIndex: 'unitid_link',
			width: 70,
			// editor: {
			// 	completeOnEnter: true,
			// 	field: {
			// 		xtype: 'combo',
			// 		typeAhead: true,
			// 		triggerAction: 'all',
			// 		selectOnFocus: false,
			// 		bind: {
			// 			store: '{UnitStore}',
			// 			// value: '{unitid_link}'
			// 		},
			// 		displayField: 'code',
			// 		valueField: 'id',
			// 		queryMode : 'local',
			// 		editable: false,
			// 		readOnly: true
			// 	}
			// },
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
			width: 80,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9]/,
			// 	selectOnFocus: true
			// },
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL kiểm (M)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalmet_check',
			width: 85,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9]/,
			// 	selectOnFocus: true
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Y/C (Y)', 
			align:'right',
			dataIndex: 'totalydsorigin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9]/,
			// 	selectOnFocus: true
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL kiểm (Y)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalydscheck',
			width: 85,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9]/,
			// 	selectOnFocus: true
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL cây', 
			align:'right',
			dataIndex: 'totalpackage',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 60,
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9]/,
			// 	selectOnFocus: true
			// },
		},		
		{
			text: 'Danh sách LOT', 
			dataIndex: 'lot_list',
			width: 150
		}
	],
});

