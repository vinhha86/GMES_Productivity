Ext.define('GSmartApp.view.handover.HandoverPackToStock_Edit_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'HandoverPackToStock_Edit_D',
	itemId: 'HandoverPackToStock_Edit_D',
	cls: 'HandoverPackToStock_Edit_D',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'HandoverPackToStock_Edit_D_Controller',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
	plugins: {
		cellediting: {
			clicksToEdit: 1,
			listeners: {
				edit: 'onDItemEdit',
				// beforeedit: 'onPriceDItemBeforeEdit'
			}
		}
	},
	viewConfig: {
		enableTextSelection: true,
		stripeRows: false,
		getRowClass: function (record, index) {
			var c = record.get('status');
			var totalpackage = record.get('totalpackage');
			if(totalpackage == null) totalpackage = 0;
			if (c == -1 && totalpackage != 0) {
				return 'epc-error';
			}
			else {
				return 'epc-ok';
			}
		}
	},
	bind: {
		store: '{StockinD_Store}'
	},
	columns: [
		{
			xtype: 'actioncolumn',
			width: 28,
			menuDisabled: true,
			sortable: false,
			align: 'center',
			items: [
				{
					iconCls: 'x-fa fas fa-bars violetIcon',
					handler: 'onMenu_HandoverPackToStock_Edit_D'
				},
			]
		},
		{
			text: 'Mã vạch',
			dataIndex: 'skucode',
			width: 120,
			summaryRenderer: function (grid, context) {
				return "Tổng cộng";
			}
		}, {
			text: 'Mã SP',
			dataIndex: 'sku_product_code',
			width: 120,
		}, {
			text: 'Tên sản phẩm',
			dataIndex: 'skuname',
			flex: 1
		}, {
			text: 'Màu',
			dataIndex: 'color_name',
			flex: 1
		}, {
			text: 'Cỡ',
			dataIndex: 'size_name',
			width: 50
		},
		{
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'SL Y/C',
			align: 'right',
			dataIndex: 'totalpackage',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80,
			editor: {
				xtype: 'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true,
				bind: {
					// editable: '{iseditSL_YC}'
				}
			}
		},
		{
			xtype: 'numbercolumn',
			width: 90,
			format: '0,000',
			text: 'SL nhận',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackagecheck',
		},
	],
	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		items: [{
			margin: '0 0 0 5',
			xtype: 'button',
			iconCls: 'x-fa fa-angle-double-up',
			itemId: 'btnThuGon',
			bind: {
				hidden: '{IsformMaster}'
			}
		}, {
			margin: '0 0 0 5',
			xtype: 'button',
			itemId: 'btnMoRong',
			iconCls: 'x-fa fa-angle-double-down',
			bind: {
				hidden: '{!IsformMaster}'
			}
		},
		{
			labelWidth: 120,
			margin: '0 5 5 5',
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
			itemId: 'cmbStockinGroup'
		}, {
			labelWidth: 90,
			margin: '0 5 5 5',
			xtype: 'combobox',
			reference: 'device',
			fieldLabel: 'Thiết bị RFID',
			bind: {
				store: '{DeviceInvStore}',
				hidden: '{isRFIDHidden}',
				value: '{deviceid_link}',
				selection: '{device}'
			},
			width: 300,
			displayField: 'name',
			valueField: 'id',
			listeners: {
				select: 'onDeviceChange'
			}
		}, {
			margin: '0 5 5 5',
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
			margin: '0 5 5 5',
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
			xtype: 'combo',
			margin: '0 5 0 5',
			itemId: 'Sku_AutoComplete',
			fieldLabel: 'Mã hàng',
			width: 350,
			labelWidth: 70,
			hideLabel: false,
			hideTrigger: false,
			bind: {
				store: '{Sku_AutoComplete}',
				hidden: '{isBarcodeHidden}',
			},
			displayField: 'code',
			valueField: 'id',
			listConfig: {
				loadingText: 'Tải mã hàng...',
				emptyText: 'Không có mã hàng phù hợp.',
			},
			anyMatch: true,
			queryMode: 'remote',
			queryParam: 'code',
			enableKeyEvents: true,
		},
		{
			tooltip: 'Thêm SP',
			margin: '0 0 0 5',
			iconCls: 'x-fa fa-plus',
			weight: 30,
			itemId: 'btnThemSP',
			bind: {
				hidden: '{isBarcodeHidden}',
			},
		},
		{
			tooltip: 'Tìm SP',
			margin: '0 5 0 5',
			itemId: 'btnTimSP',
			iconCls: 'x-fa fa-search',
			weight: 30,
			bind: {
				hidden: '{isManualHidden}',
			},
		},
		]
	}]
});

