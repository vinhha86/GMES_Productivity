Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_detail', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_packinglist_detail',
	id: 'Stockin_packinglist_detail',
	cls: 'Stockin_packinglist_detail',
	requires: [
		'Ext.grid.plugin.CellEditing',
		'Ext.grid.plugin.Exporter',
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
			text: 'Mã vải',
			dataIndex: 'skuCode',
			sortable: true,
			flex: 1,
            // summaryType: 'count',
            // summaryRenderer: 'renderCount',
			renderer: 'renderStockinD'
		},
	],
    plugins: [
		{
			ptype: 'gridexporter',
			// gridexporter: true
		},
		{
			ptype: 'rowwidget',
			id: 'rowwidget1',
			// itemId: 'rowwidget1',
			widget:
			{
				xtype: 'grid',
				itemId: 'level1',
				features: [{
					ftype: 'summary',
					dock: 'bottom'
				}],
				viewConfig: {
					stripeRows: false
				},
				selModel: {
					selType: 'rowmodel',
					mode: 'SINGLE'
				},
				bind: {
					store: '{record.stockin_lot}'
				},
				columns: [
					{
						xtype: 'actioncolumn',
						width: 30,
						menuDisabled: true,
						sortable: false,
						align: 'center',
						items: [{
							iconCls: 'x-fa fas fa-random',
							tooltip: "Đổi loại nguyên phụ liệu",
							handler: 'onChangeSku'
						}]
					},
					{
						text: 'Số Lot',
						dataIndex: 'lot_number',
						sortable: true,
						width: 200,
						summaryType: 'count',
						summaryRenderer: 'renderCount',
						renderer: 'renderLot'
					},
					{
						xtype: 'numbercolumn',
						format:'0,000.00',
						text: 'Dài phiếu (M)',
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
						text: 'Dài kiểm (M)',
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
						text: 'Dài phiếu (Y)',
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
						text: 'Dài kiểm (Y)',
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
						text: 'Cân phiếu',
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
						text: 'Cân kiểm',
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
						text: 'Lbs phiếu',
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
						text: 'Lbs kiểm',
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
						id: 'rowwidget2',
						// itemId: 'rowwidget2',
						widget:
						{
							xtype: 'grid',
							itemId: 'level2',
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
									bind: {
										hidden: '{isCmColumnHidden}',
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
									bind: {
										hidden: '{isCmColumnHidden}',
									},
								},
								{
									text: 'Khổ (inch)', 
									dataIndex: 'width_yds',
									flex: 1,
									align:'right',
									renderer: function (value, metaData, record) {
										// if(value ==0) return "";
										metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
										return Ext.util.Format.number(value * 36, '0,000.00');
									},
									bind: {
										hidden: '{isInchColumnHidden}',
									},
								},
								{
									text: 'Khổ thực tế (inch)', 
									dataIndex: 'width_yds_check',
									flex: 1,
									align:'right',
									renderer: function (value, metaData, record) {
										// if(value ==0) return "";
										metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
										return Ext.util.Format.number(value * 36, '0,000.00');
									},
									bind: {
										hidden: '{isInchColumnHidden}',
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
								// {
								// 	text: 'Ghi chú', 
								// 	dataIndex: 'comment',
								// 	flex: 2,
								// 	editor:{
								// 		xtype:'textfield',
								// 		selectOnFocus: true
								// 	}
								// },
								{
									text: 'Dãy, tầng, khoang', 
									dataIndex: 'spaceepc_link',
									flex: 2,
									renderer: function (value, metaData, record) {
										// metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
										// return Ext.util.Format.number(value, '0,000.00');
										var result = '';
										if(value == null || value == ''){
											result = 'Thiếu thông tin khoang chứa';
											metaData.tdCls =  'cellYellow';
											return result;
										}
										result = record.get('row') + '-' + record.get('space') + '-' + record.get('floor');
										return result;
									},
								},
							],
						}
					}
				],
				viewConfig: {
					listeners: {
						expandbody: 'onexpandbodySub',
						collapsebody: 'oncollapsebodySub',
					}
				}
			}
		}
    ],
	viewConfig: {
		listeners: {
			expandbody: 'onexpandbody',
			collapsebody: 'oncollapsebody',
		}
	},

	dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
			{
				flex: 1
			},
			// {
			// 	// ui: 'default-toolbar',
			// 	xtype: 'button',
			// 	cls: 'dock-tab-btn',
			// 	text: 'Export to ...',
			// 	menu: {
			// 		defaults: {
			// 			handler: 'exportTo'
			// 		},
			// 		items: [
			// 			{
			// 				text: 'Excel xlsx',
			// 				cfg: {
			// 					type: 'excel07',
			// 					ext: 'xlsx',
			// 					includeGroups: true,
			// 					includeSummary: true
			// 				}
			// 			}
			// 		]
			// 	}
			// },
			{
				margin: 1,
				xtype:'button',
				text:  'Thoát',
				iconCls: 'x-fa fa-window-close',
				itemId: 'btnThoat'
			}
		]
    }]

	// change
	// columns: [
	// 	{
	// 		text: 'Số Lot',
	// 		dataIndex: 'lot_number',
	// 		sortable: true,
	// 		width: 200,
    //         summaryType: 'count',
    //         summaryRenderer: 'renderCount',
	// 		renderer: 'renderLot'
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'Invoice(M)',
	// 		dataIndex: 'totalmet',
	// 		sortable: true,
	// 		width: 150,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
	// 		bind: {
    //             hidden: '{isMetColumnHidden}',
    //         },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'Kiểm dài (M)',
	// 		dataIndex: 'totalmetcheck',
	// 		sortable: true,
	// 		width: 150,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
	// 		bind: {
    //             hidden: '{isMetColumnHidden}',
    //         },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'Invoice(Y)',
	// 		dataIndex: 'totalyds',
	// 		sortable: true,
	// 		width: 150,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
    //         bind: {
    //             hidden: '{isYdsColumnHidden}',
    //         },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'Kiểm dài (Y)',
	// 		dataIndex: 'totalydscheck',
	// 		sortable: true,
	// 		width: 150,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
    //         bind: {
    //             hidden: '{isYdsColumnHidden}',
    //         },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'Invoice(cân)',
	// 		dataIndex: 'grossweight',
	// 		sortable: true,
	// 		width: 150,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
    //         bind: {
    //             hidden: '{isKgColumnHidden}',
    //         },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'Kiểm cân',
	// 		dataIndex: 'grossweight_check',
	// 		sortable: true,
	// 		width: 150,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
    //         bind: {
    //             hidden: '{isKgColumnHidden}',
    //         },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'Invoice(lbs)',
	// 		dataIndex: 'grossweight_lbs',
	// 		sortable: true,
	// 		width: 150,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
    //         bind: {
    //             hidden: '{isLbsColumnHidden}',
    //         },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'Kiểm lbs',
	// 		dataIndex: 'grossweight_lbs_check',
	// 		sortable: true,
	// 		width: 150,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
    //         bind: {
    //             hidden: '{isLbsColumnHidden}',
    //         },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000',
	// 		text: 'SL yêu cầu',
	// 		dataIndex: 'totalpackage',
	// 		sortable: true,
	// 		width: 100,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderCount',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000',
	// 		text: 'SL xếp khoang',
	// 		dataIndex: 'totalpackagecheck',
	// 		sortable: true,
	// 		width: 100,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderCount',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000',
	// 		text: 'SL kiểm',
	// 		dataIndex: 'totalpackagepklist',
	// 		sortable: true,
	// 		width: 100,
	// 		align:'end',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderCount',
	// 		// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 		// 	var val = value == 'null' ? "" : value;
	// 		// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 		// 	return val;
	// 		// },
	// 	},
	// 	{
	// 		text: 'DS cây vải chưa kiểm',
	// 		dataIndex: 'list_not_check',
	// 		sortable: true,
	// 		flex: 1,
	// 		renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 			var val = value == 'null' ? "" : value;
	// 			metaData.tdAttr = 'data-qtip="' + val + '"';
	// 			// return val;
	// 			return '<div style="white-space:normal !important;">'+ val +'</div>';;
	// 		},
	// 	},
	// ],
    // plugins: [
	// 	{
	// 		ptype: 'rowwidget',
	// 		// id: 'rowwidget',
	// 		widget:
	// 		{
	// 			xtype: 'grid',
	// 			// itemId: 'level2',
	// 			features: [{
	// 				ftype: 'summary',
	// 				dock: 'bottom'
	// 			}],
	// 			viewConfig: {
	// 				stripeRows: false
	// 			},
	// 			bind: {
	// 				store: '{record.stockin_packinglist}'
	// 			},
	// 			columns: [
	// 				{
	// 					text: 'Cây số', 
	// 					dataIndex: 'packageid',
	// 					width: 50,
	// 				},
	// 				{
	// 					text: 'Khổ (cm)', 
	// 					dataIndex: 'width_met',
	// 					flex: 1,
	// 					align:'right',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value * 100, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isCmColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Khổ thực tế (cm)', 
	// 					dataIndex: 'width_met_check',
	// 					flex: 1,
	// 					align:'right',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value * 100, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isCmColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Khổ (inch)', 
	// 					dataIndex: 'width_yds',
	// 					flex: 1,
	// 					align:'right',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value * 36, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isInchColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Khổ thực tế (inch)', 
	// 					dataIndex: 'width_yds_check',
	// 					flex: 1,
	// 					align:'right',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value * 36, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isInchColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Dài phiếu (m)', 
	// 					dataIndex: 'met_origin',
	// 					flex: 1,
	// 					align:'right',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isMetColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Dài kiểm (m)', 
	// 					dataIndex: 'met_check',
	// 					flex: 1,
	// 					align:'right',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isMetColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Dài phiếu (y)', 
	// 					dataIndex: 'ydsorigin',
	// 					flex: 1,
	// 					align:'right',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isYdsColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Dài kiểm (y)', 
	// 					dataIndex: 'ydscheck',
	// 					flex: 1,
	// 					align:'right',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isYdsColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Cân phiếu', 
	// 					dataIndex: 'grossweight',
	// 					flex: 1,
	// 					align:'right',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isKgColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Cân kiểm', 
	// 					dataIndex: 'grossweight_check',
	// 					flex: 1,
	// 					align:'right',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isKgColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Lbs phiếu', 
	// 					dataIndex: 'grossweight_lbs',
	// 					flex: 1,
	// 					align:'right',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isLbsColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Lbs kiểm', 
	// 					dataIndex: 'grossweight_lbs_check',
	// 					flex: 1,
	// 					align:'right',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					renderer: function (value, metaData, record) {
	// 						// if(value ==0) return "";
	// 						metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 						return Ext.util.Format.number(value, '0,000.00');
	// 					},
	// 					bind: {
	// 						hidden: '{isLbsColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					text: 'Ghi chú', 
	// 					dataIndex: 'comment',
	// 					flex: 2,
	// 					editor:{
	// 						xtype:'textfield',
	// 						selectOnFocus: true
	// 					}
	// 				},
	// 			],
	// 		}
	// 	}
    // ],


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

