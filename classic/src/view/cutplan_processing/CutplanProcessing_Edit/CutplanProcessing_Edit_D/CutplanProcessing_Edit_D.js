Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit.CutplanProcessing_Edit_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'CutplanProcessing_Edit_D',
	itemId: 'CutplanProcessing_Edit_D',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'CutplanProcessing_Edit_D_Controller',
	columnLines: true,
	rowLines: true,
    title: 'Chi tiết bàn cắt',
	// features: [{
	// 	ftype: 'summary',
	// 	dock: 'bottom'
	// }],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
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
		// store: '{CutplanProcessingDStore}'
	},
	columns: [
		{
			text: 'Mã NPL', 
			flex: 1,
			dataIndex: 'skucode',
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
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldTenNPL',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueTenNPLKeyup',
			// 		buffer: 500
			// 	}
			// }
		},
        {
			text: 'Số lot', 
			dataIndex: 'lotnumber',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Số cây', 
			dataIndex: 'packageid',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Dài cây', 
			dataIndex: 'met',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Số lá', 
			dataIndex: 'la_vai',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Tiêu hao', 
			dataIndex: 'tieu_hao',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Đầu tấm', 
			dataIndex: 'con_lai',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
	],
	dockedItems: [{
		dock: 'top',
		xtype: 'container',
        margin: 2,
        flex: 1,
		items: [
            {
                layout: 'vbox',
                width: '100%',
                // flex: 1,
                items:[
                    {
                        layout: 'hbox',
                        width: '100%',
                        // flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: "Số Lot",
                                // allowBlank: false,
                                // itemId: 'pordercode',
                                // blankText: 'Không được để trống',
                                bind: {
                                    // value: '{pordercode}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                                listeners: {
                                    // keypress: 'onPressEnterPordercode'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: "Số cây",
                                // allowBlank: false,
                                // itemId: 'pordercode',
                                // blankText: 'Không được để trống',
                                bind: {
                                    // value: '{pordercode}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                                listeners: {
                                    // keypress: 'onPressEnterPordercode'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: "Dài cây",
                                // allowBlank: false,
                                // itemId: 'pordercode',
                                // blankText: 'Không được để trống',
                                bind: {
                                    // value: '{pordercode}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                                listeners: {
                                    // keypress: 'onPressEnterPordercode'
                                }
                            },
                            {
                                xtype:'button',
                                text:  'Thêm',
                                iconCls: 'x-fa fa-check',
                                // itemId: 'btnLuu',
                                margin: 2,
                                flex: 1,
                            },
                        ]
                    },
                    {
                        layout: 'hbox',
                        width: '100%',
                        // flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: "Số lá",
                                // allowBlank: false,
                                // itemId: 'pordercode',
                                // blankText: 'Không được để trống',
                                bind: {
                                    // value: '{pordercode}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                                listeners: {
                                    // keypress: 'onPressEnterPordercode'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: "Tiêu hao",
                                // allowBlank: false,
                                // itemId: 'pordercode',
                                // blankText: 'Không được để trống',
                                bind: {
                                    // value: '{pordercode}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                                listeners: {
                                    // keypress: 'onPressEnterPordercode'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: "Đầu tấm",
                                // allowBlank: false,
                                // itemId: 'pordercode',
                                // blankText: 'Không được để trống',
                                bind: {
                                    // value: '{pordercode}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                                listeners: {
                                    // keypress: 'onPressEnterPordercode'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: "Phát sinh",
                                // allowBlank: false,
                                // itemId: 'pordercode',
                                // blankText: 'Không được để trống',
                                bind: {
                                    // value: '{pordercode}'
                                },
                                margin: 2,
                                labelWidth: 80,
                                flex: 1,
                                enableKeyEvents : true,
                                listeners: {
                                    // keypress: 'onPressEnterPordercode'
                                }
                            },
                        ]
                    },
                ]
            }
	    ]
	}]
});

