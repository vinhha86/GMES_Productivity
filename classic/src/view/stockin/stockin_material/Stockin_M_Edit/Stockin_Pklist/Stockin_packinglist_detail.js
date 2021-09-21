Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_detail', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_packinglist_detail',
	id: 'Stockin_packinglist_detail',
	cls: 'Stockin_packinglist_detail',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'Stockin_packinglist_detail_Controller',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
	// plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onPackingListItemEdit',
    //             // beforeedit: 'onPriceDItemBeforeEdit'
    //         }             
    //     }
    // },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{PackingListStore}'
	},

	// new
	columns: [
		{
			text: 'Số Lot',
			dataIndex: 'lot_number',
			sortable: true,
			width: 200,
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	var totalpackagecheck = record.get('totalpackagecheck') == null ? 0 : record.get('totalpackagecheck');
            //     var totalpackage = record.get('totalpackage') == null ? 0 : record.get('totalpackage');
            //     var totalpackagepklist = record.get('totalpackagepklist') == null ? 0 : record.get('totalpackagepklist');
			// 	if (totalpackage == totalpackagecheck || totalpackage == totalpackagepklist) {
            //         // cell.setCls('cellGreen');
			// 		metaData.tdCls = 'cellGreen';
            //     } else if (totalpackage < totalpackagecheck || totalpackage < totalpackagepklist) {
            //         // cell.setCls('cellYellow');
			// 		metaData.tdCls = 'cellYellow';
            //     } else{
            //         // cell.setCls('cellRed');
			// 		metaData.tdCls = 'cellRed';
            //     }
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
            summaryType: 'count',
            summaryRenderer: 'renderCount',
			renderer: 'renderLot'
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Invoice(M)',
			dataIndex: 'totalmet',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
                hidden: '{isMetColumnHidden}',
            },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Kiểm dài (M)',
			dataIndex: 'totalmetcheck',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
                hidden: '{isMetColumnHidden}',
            },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Invoice(Y)',
			dataIndex: 'totalyds',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
            bind: {
                hidden: '{isYdsColumnHidden}',
            },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Kiểm dài (Y)',
			dataIndex: 'totalydscheck',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
            bind: {
                hidden: '{isYdsColumnHidden}',
            },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Invoice(cân)',
			dataIndex: 'grossweight',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
            bind: {
                hidden: '{isKgColumnHidden}',
            },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Kiểm cân',
			dataIndex: 'grossweight_check',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
            bind: {
                hidden: '{isKgColumnHidden}',
            },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Invoice(lbs)',
			dataIndex: 'grossweight_lbs',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
            bind: {
                hidden: '{isLbsColumnHidden}',
            },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Kiểm lbs',
			dataIndex: 'grossweight_lbs_check',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
            bind: {
                hidden: '{isLbsColumnHidden}',
            },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL yêu cầu',
			dataIndex: 'totalpackage',
			sortable: true,
			width: 100,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderCount',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL xếp khoang',
			dataIndex: 'totalpackagecheck',
			sortable: true,
			width: 100,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderCount',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL kiểm',
			dataIndex: 'totalpackagepklist',
			sortable: true,
			width: 100,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderCount',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
		},
		{
			text: 'DS cây vải chưa kiểm',
			dataIndex: 'list_not_check',
			sortable: true,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				// return val;
				return '<div style="white-space:normal !important;">'+ val +'</div>';;
			},
		},
	],
    plugins: [
		{
			ptype: 'rowwidget',
			// id: 'rowwidget',
			widget:
			{
				xtype: 'grid',
				// itemId: 'level2',
				features: [{
					ftype: 'summary',
					dock: 'bottom'
				}],
				viewConfig: {
					stripeRows: false
				},
				bind: {
					store: '{record.stockin_packinglist}'
				},
				columns: [
					{
						text: 'Cây số', 
						dataIndex: 'packageid',
						width: 50,
					},
					{
						text: 'Khổ (cm)', 
						dataIndex: 'width_met',
						flex: 1,
						align:'right',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
							return Ext.util.Format.number(value * 100, '0,000.00');
						},
					},
					{
						text: 'Khổ thực tế (cm)', 
						dataIndex: 'width_met_check',
						flex: 1,
						align:'right',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
							return Ext.util.Format.number(value * 100, '0,000.00');
						},
					},
					{
						text: 'Dài phiếu (m)', 
						dataIndex: 'met_origin',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isMetColumnHidden}',
						},
					},
					{
						text: 'Dài kiểm (m)', 
						dataIndex: 'met_check',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isMetColumnHidden}',
						},
					},
					{
						text: 'Dài phiếu (y)', 
						dataIndex: 'ydsorigin',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isYdsColumnHidden}',
						},
					},
					{
						text: 'Dài kiểm (y)', 
						dataIndex: 'ydscheck',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isYdsColumnHidden}',
						},
					},
					{
						text: 'Cân phiếu', 
						dataIndex: 'grossweight',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isKgColumnHidden}',
						},
					},
					{
						text: 'Cân kiểm', 
						dataIndex: 'grossweight_check',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isKgColumnHidden}',
						},
					},
					{
						text: 'Lbs phiếu', 
						dataIndex: 'grossweight_lbs',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isLbsColumnHidden}',
						},
					},
					{
						text: 'Lbs kiểm', 
						dataIndex: 'grossweight_lbs_check',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							// if(value ==0) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isLbsColumnHidden}',
						},
					},
					{
						text: 'Ghi chú', 
						dataIndex: 'comment',
						flex: 2,
						editor:{
							xtype:'textfield',
							selectOnFocus: true
						}
					},
				],
			}
		}
    ],


	// // old
	// columns: [
    //     // {
    //     //     xtype: 'checkcolumn',
    //     //     // text: 'Đi làm',
    //     //     dataIndex: 'checked',
    //     //     headerCheckbox: false,
    //     //     width: 30,
    //     //     listeners: {
    //     //         // beforecheckchange: 'onBeforecheckchange',
    //     //         checkchange: 'onCheckchange',
    //     //         // headerclick: 'onHeaderClick'
    //     //     }
    //     // },
	// 	{
	// 		text: 'Số Lot', 
	// 		dataIndex: 'lotnumber',
	// 		flex: 1,
    //         summaryType: 'count',
	// 		summaryRenderer: 'renderCount'
	// 	},
	// 	{
	// 		text: 'Cây số', 
	// 		dataIndex: 'packageid',
    //         width: 50,
	// 	},
	// 	// {
	// 	// 	text: 'Màu', 
	// 	// 	dataIndex: 'color_name',
    //     //     flex: 1,
	// 	// },
    //     {
	// 		text: 'Khổ (cm)', 
	// 		dataIndex: 'width_met',
    //         flex: 1,
	// 		align:'right',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value * 100, '0,000.00');
	// 		},
	// 		bind: {
	// 			// hidden: '{isMetColumnHidden}',
	// 		},
	// 	},
    //     {
	// 		text: 'Khổ thực tế (cm)', 
	// 		dataIndex: 'width_met_check',
    //         flex: 1,
	// 		align:'right',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value * 100, '0,000.00');
	// 		},
	// 		bind: {
	// 			// hidden: '{isMetColumnHidden}',
	// 		},
	// 	},
	// 	{
	// 		text: 'Dài phiếu (m)', 
    //         dataIndex: 'met_origin',
    //         flex: 1,
	// 		align:'right',
    //         summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value, '0,000.00');
	// 		},
	// 		bind: {
	// 			hidden: '{isMetColumnHidden}',
	// 		},
    //     },
	// 	{
	// 		text: 'Dài kiểm (m)', 
    //         dataIndex: 'met_check',
    //         flex: 1,
	// 		align:'right',
    //         summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value, '0,000.00');
	// 		},
	// 		bind: {
	// 			hidden: '{isMetColumnHidden}',
	// 		},
    //     },
	// 	{
	// 		text: 'Dài phiếu (y)', 
    //         dataIndex: 'ydsorigin',
    //         flex: 1,
	// 		align:'right',
    //         summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value, '0,000.00');
	// 		},
	// 		bind: {
	// 			hidden: '{isYdsColumnHidden}',
	// 		},
    //     },
	// 	{
	// 		text: 'Dài kiểm (y)', 
    //         dataIndex: 'ydscheck',
    //         flex: 1,
	// 		align:'right',
    //         summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value, '0,000.00');
	// 		},
	// 		bind: {
	// 			hidden: '{isYdsColumnHidden}',
	// 		},
    //     },
	// 	{
	// 		text: 'Cân phiếu', 
    //         dataIndex: 'grossweight',
    //         flex: 1,
	// 		align:'right',
    //         summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value, '0,000.00');
	// 		},
	// 		bind: {
	// 			hidden: '{isKgColumnHidden}',
	// 		},
    //     },
	// 	{
	// 		text: 'Cân kiểm', 
    //         dataIndex: 'grossweight_check',
    //         flex: 1,
	// 		align:'right',
    //         summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value, '0,000.00');
	// 		},
	// 		bind: {
	// 			hidden: '{isKgColumnHidden}',
	// 		},
    //     },
	// 	{
	// 		text: 'Lbs phiếu', 
    //         dataIndex: 'grossweight_lbs',
    //         flex: 1,
	// 		align:'right',
    //         summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value, '0,000.00');
	// 		},
	// 		bind: {
	// 			hidden: '{isLbsColumnHidden}',
	// 		},
    //     },
	// 	{
	// 		text: 'Lbs kiểm', 
    //         dataIndex: 'grossweight_lbs_check',
    //         flex: 1,
	// 		align:'right',
    //         summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		editor:{
	// 			xtype:'textfield',
	// 			maskRe: /[0-9.]/,
	// 			selectOnFocus: true
	// 		},
	// 		renderer: function (value, metaData, record) {
	// 			// if(value ==0) return "";
	// 			metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 			return Ext.util.Format.number(value, '0,000.00');
	// 		},
	// 		bind: {
	// 			hidden: '{isLbsColumnHidden}',
	// 		},
    //     },
	// 	{
	// 		text: 'Ghi chú', 
    //         dataIndex: 'comment',
    //         flex: 2,
	// 		editor:{
	// 			xtype:'textfield',
	// 			selectOnFocus: true
	// 		}
    //     },
		// { 
		// 	xtype: 'actioncolumn',
		// 	reference: 'stockin_contextmenu',
		// 	width: 25,
		// 	menuDisabled: true,
		// 	sortable: false,
		// 	items: [
		// 	{
		// 		iconCls: 'x-fa fas fa-trash',
		// 		tooltip: 'Xóa',
		// 		handler: 'onXoa'
		// 	}
		// ]
		// }   	
	// ],
	// // dockedItems: [{
	// // 	dock: 'top',
    // //     xtype: 'toolbar',
	// // 	items: [
    // //         {
	// // 		xtype: 'textfield',
	// // 		margin: 1,
	// // 		itemId:'lotnumber',
	// // 		emptyText: 'Số lot',
	// // 		width: 120,
	// // 		labelWidth: 0,
	// // 		hideLabel: true,
	// // 		// maskRe: /[0-9]/,		
    // //         bind:{
	// // 			value: '{packinglist.lotnumber}'
    // //         }
	// // 	},
    // //         {
	// // 		xtype: 'textfield',
	// // 		margin: 1,
	// // 		itemId:'packageid',
	// // 		emptyText: 'Cây số',
	// // 		width: 120,
	// // 		labelWidth: 0,
	// // 		hideLabel: true,
	// // 		maskRe: /[0-9]/,		
    // //         bind:{
	// // 			value: '{packinglist.packageid}'
    // //         }
	// // 	},
	// // 	{
	// // 		xtype: 'textfield',
	// // 		margin: 1,
	// // 		itemId:'width_met',
	// // 		emptyText: 'Khổ (cm)',
	// // 		width: 120,
	// // 		labelWidth: 0,
	// // 		hideLabel: true,
	// // 		maskRe: /[0-9.]/,
    // //         bind:{
	// // 			value: '{packinglist.width_met}'
    // //         }
    // //     },
    // //     {
	// // 		xtype: 'textfield',
	// // 		margin: 1,
	// // 		itemId:'met_origin',
	// // 		emptyText: 'SL Nhập (m)',
	// // 		width: 120,
	// // 		labelWidth: 0,
	// // 		hideLabel: true,
	// // 		maskRe: /[0-9.]/,
    // //         bind:{
	// // 			value: '{packinglist.met_origin}',
	// // 			hidden: '{isMetColumnHidden}',
    // //         }
	// // 	},

    // //     {
	// // 		xtype: 'textfield',
	// // 		margin: 1,
	// // 		itemId:'ydsorigin',
	// // 		emptyText: 'SL Nhập (y)',
	// // 		width: 120,
	// // 		labelWidth: 0,
	// // 		hideLabel: true,
	// // 		maskRe: /[0-9.]/,
    // //         bind:{
	// // 			value: '{packinglist.ydsorigin}',
	// // 			hidden: '{isYdsColumnHidden}',
    // //         }
	// // 	},		
	// // 	{
	// // 		tooltip: 'Thêm',
	// // 		margin: '0 5 0 5',
	// // 		itemId: 'btnThemPKL',
	// // 		iconCls: 'x-fa fa-plus',
	// // 		weight: 30
	// // 	} 		
	// // ]
	// // }]
});

