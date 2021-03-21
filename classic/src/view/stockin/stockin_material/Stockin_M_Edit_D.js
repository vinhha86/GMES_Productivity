Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_M_Edit_D',
	id: 'Stockin_M_Edit_D',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'Stockin_M_Edit_D_Controller',
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
	bind:{
		store: '{stockin.stockin_d}'
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
			text: 'Mã NPL', 
			width: 120,
			dataIndex: 'skucode'
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1
		},{
			text: 'Màu', 
			dataIndex: 'color_name',
			flex: 1
		},{
			text: 'Cỡ', 
			dataIndex: 'size_name',
			width: 70
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
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'N.W', 
			align:'right',
			dataIndex: 'netweight',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'G.W', 
			align:'right',
			dataIndex: 'grossweight',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'M3', 
			align:'right',
			dataIndex: 'm3',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70
		},
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000',
		// 	text: 'Đơn giá', 
		// 	align:'right',
		// 	dataIndex: 'unitprice',
		// 	editor:{
		// 		xtype:'textfield',
		// 		maskRe: /[0-9.]/
		// 	},
		// 	width: 85
		// },{
		// 	xtype: 'numbercolumn',
		// 	format:'0,000',
		// 	text: 'Thành tiền', 
		// 	align:'right',
		// 	dataIndex: 'totalprice',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 100
		// },
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Invoice (m)', 
			align:'right',
			dataIndex: 'totalmet_origin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 90,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Nhập (m)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalmet_check',
			width: 85,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Invoice (y)', 
			align:'right',
			dataIndex: 'totalydsorigin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 90,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Nhập (y)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalydscheck',
			width: 85,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
		},
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
		}   	
	],
	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		items: [{
			margin:'0 0 0 5',
			xtype: 'button',
			iconCls: 'x-fa fa-angle-double-up',
			itemId: 'btnThuGon',
			bind: {
				hidden: '{IsformMaster}'
			}
		}, {
			margin:'0 0 0 5',
			xtype: 'button',
			itemId: 'btnMoRong',
			iconCls: 'x-fa fa-angle-double-down',
			bind: {
				hidden: '{!IsformMaster}'
			}
		}, 
		// {
		// 	labelWidth: 90,
		// 	margin:'0 5 5 5',
		// 	xtype: 'combobox',
		// 	reference: 'device',
		// 	fieldLabel: 'Thiết bị RFID',
		// 	bind: {
		// 		store: '{DeviceInvStore}'
		// 	},
		// 	width: 300,
		// 	displayField: 'name',
		// 	valueField: 'id',
		// 	listeners: {
		// 		change: 'onDeviceChange'
		// 	}
		// }, {
		// 	margin:'0 5 5 5',
		// 	text: "Start",
		// 	iconCls: 'x-fa fa-play',
		// 	xtype: 'button',
		// 	itemId: 'btnStart',
		// 	bind: {
		// 		disabled: '{isStart}',
		// 		userCls: '{clsbtnStart}'
		// 	}
		// }, {
		// 	margin:'0 5 5 5',
		// 	text: "Stop",
		// 	iconCls: 'x-fa fa-stop',
		// 	xtype: 'button',
		// 	itemId: 'btnStop',
		// 	userCls: 'red-button'
		// },
		// ,'->',
		{
			xtype: 'textfield',
			margin: '0 5 0 5',
			itemId:'skucode',
			fieldLabel: 'Mã NPL',
			width: 250,
			labelWidth: 60,
			hideLabel: false,			
            bind:{
				// disabled: '{isEdit}',
				value: '{skucode}'
			},
			enableKeyEvents : true,
			listeners: {
				keypress: 'onPressEnterBtnTimNPL'
			}
		},
		// {
		// 	tooltip: 'Thêm NPL',
		// 	margin: '0 0 0 5',
		// 	iconCls: 'x-fa fa-plus',
		// 	weight: 30,
		// 	itemId: 'btnThemNPL',
		// 	// hidden: true
		// },
		{
			tooltip: 'Tìm NPL',
			margin: '0 5 0 5',
			itemId: 'btnTimNPL',
			iconCls: 'x-fa fa-search',
			weight: 30,			
            bind:{
                // hidden: '{isEdit}'
            }
		},
		// {
		// 	xtype: 'textfield',
		// 	margin: '0 5 0 5',
		// 	itemId:'ordercode',
		// 	fieldLabel: 'Mã lệnh SX:',
		// 	width: 200,
		// 	labelWidth: 80,
		// 	hideLabel: false,			
        //     bind:{
		// 		disabled: '{isEdit}',
		// 		value: '{stockin.pordercode}'
        //     }
		// 	// fieldStyle: {
		// 	// 	textTransform: "uppercase"
		// 	// },
		// 	// enableKeyEvents: true,
		// 	// listeners: {
		// 	// 	// change: function (obj, newValue) {
		// 	// 	//     //console.log(newValue);
		// 	// 	//     obj.setRawValue(newValue.toUpperCase());
		// 	// 	// },
		// 	// 	keyup: 'onSkuCodeKeyup',
		// 	// 	buffer: 100
		// 	// }    
		// },
		// {
		// 	tooltip: 'Tải danh sách sản phẩm',
		// 	margin: '0 0 0 5',
		// 	//text: 'Thêm thẻ vải',
		// 	iconCls: 'x-fa fa-plus',
		// 	weight: 30,
		// 	itemId: 'btnTaiSP',			
        //     bind:{
        //         hidden: '{isEdit}'
        //     }
		// 	// handler: 'onAddItemTap'
		// },
		// {
		// 	tooltip: 'Tìm lệnh',
		// 	margin: '0 5 0 5',
		// 	itemId: 'btnTimLenh',
		// 	//text: 'Thêm thẻ vải',
		// 	iconCls: 'x-fa fa-search',
		// 	weight: 30,			
        //     bind:{
        //         hidden: '{isEdit}'
        //     }
		// 	// handler: 'onSkuSearchTap'
		// } 		
	]
	}]
});

