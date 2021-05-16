Ext.define('GSmartApp.view.stockout.Stockout_M_Edit_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_M_Edit_D',
    id: 'Stockout_M_Edit_D',
    requires: [
		'Ext.grid.plugin.CellEditing'
	],
    border: true,
    bind:{
        store: '{stockout.stockout_d}'
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    columnLines: true,
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
    columns: [
		{ 
			xtype: 'actioncolumn',
			reference: 'stockout_contextmenu',
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
			dataIndex: 'skucode',
			width: 150,
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1
		},{
			text: 'Màu', 
			dataIndex: 'color_name',
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
        {
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Y/C (Y)', 
			align:'right',
			dataIndex: 'totalydsorigin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 100,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL xuất (Y)', 
			align:'right',
			dataIndex: 'totalydscheck',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 105,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
		},
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'SL Xuất (y)', 
		// 	align:'right',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	dataIndex: 'totalydscheck',
		// 	width: 85
		// },
    ],
	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		items: [
			{
				margin:'0 0 0 5',
				xtype: 'button',
				iconCls: 'x-fa fa-angle-double-up',
				itemId: 'btnThuGon',
				bind: {
					hidden: '{IsformMaster}'
				}
			}, 
			{
				margin:'0 0 0 5',
				xtype: 'button',
				itemId: 'btnMoRong',
				iconCls: 'x-fa fa-angle-double-down',
				bind: {
					hidden: '{!IsformMaster}'
				}
			}, 
			{
				labelWidth: 120,
				margin:'0 5 5 5',
				xtype: 'combobox',
				editable: false,
				fieldLabel: 'Phương pháp nhập',
				bind: {
					store: '{StockinGroupStore}',
					value: '{groupstockin}'
				},
				width: 300,
				displayField: 'name',
				valueField: 'id',
				itemId: 'cmbStockoutGroup'
			},  {
				labelWidth: 90,
				margin:'0 5 5 5',
				xtype: 'combobox',
				reference: 'device',
				fieldLabel: 'Thiết bị RFID',
				bind: {
					store: '{DeviceInvStore}',
					hidden: '{isRFIDHidden}'
				},
				width: 300,
				displayField: 'name',
				valueField: 'id',
				listeners: {
					change: 'onDeviceChange'
				}
			}, {
				margin:'0 5 5 5',
				text: "Start",
				iconCls: 'x-fa fa-play',
				xtype: 'button',
				itemId: 'btnStart',
				bind: {
					disabled: '{isStart}',
					userCls: '{clsbtnStart}',
					hidden: '{isRFIDHidden}'
				}
			}, {
				margin:'0 5 5 5',
				text: "Stop",
				iconCls: 'x-fa fa-stop',
				xtype: 'button',
				itemId: 'btnStop',
				bind: {
					userCls: 'clsbtnStop',
					hidden: '{isRFIDHidden}'
				}
			},
			{
				xtype: 'textfield',
				margin: '0 5 0 5',
				itemId:'skucode',
				fieldLabel: 'Mã hàng',
				width: 250,
				labelWidth: 70,
				hideLabel: false,			
				bind:{
					hidden: '{isBarcodeHidden}',
					value: '{skucode}'
				},
				// enableKeyEvents : true,
				// listeners: {
				//     keypress: 'onPressEnterBtnThemNPL'
				// }
			},
			{
				tooltip: 'Thêm SP',
				margin: '0 0 0 5',
				iconCls: 'x-fa fa-plus',
				weight: 30,
				itemId: 'btnThemSP',
				bind:{
					hidden: '{isBarcodeHidden}',
				},
			},
			{
				tooltip: 'Tìm nguyên phụ liệu',
				margin: '0 5 0 5',
				itemId: 'btnTimNPL',
				iconCls: 'x-fa fa-search',
				weight: 30,			
				bind:{
					hidden: '{isManualHidden}',
				},
			},
	]
	}]
});
