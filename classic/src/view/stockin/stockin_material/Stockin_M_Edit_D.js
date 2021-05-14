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
	plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onDItemEdit',
                // beforeedit: 'onPriceDItemBeforeEdit'
            }             
        }
    },
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
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_Stockin_M_Edit_D_List'
                },            
            ]
        },
		// { 
		// 	xtype: 'actioncolumn',
		// 	reference: 'stockin_contextmenu',
		// 	width: 25,
		// 	menuDisabled: true,
		// 	sortable: false,
		// 	items: [
		// 		// {
		// 		// 	iconCls: 'x-fa fas fa-bars violetIcon',
		// 		// 	tooltip:'Chi tiết chíp',
		// 		// 	handler: 'onEPCDetail'
		// 		// },
		// 		{
		// 			iconCls: 'x-fa fas fa-bars violetIcon',
		// 			tooltip:'PackingList',
		// 			handler: 'onViewPackingList'
		// 		},
		// 	]
		// },  			
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
			width: 120
		},{
			text: 'Cỡ khổ', 
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
		},
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'N.W', 
		// 	align:'right',
		// 	dataIndex: 'netweight',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 70
		// },{
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'G.W', 
		// 	align:'right',
		// 	dataIndex: 'grossweight',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 70
		// },{
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'M3', 
		// 	align:'right',
		// 	dataIndex: 'm3',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 70
		// },
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
			text: 'SL Y/C (M)', 
			align:'right',
			dataIndex: 'totalmet_origin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
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
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
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
			width: 80,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
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
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
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
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
		},		
		{
			text: 'Danh sách LOT', 
			// dataIndex: 'lot_list',
			dataIndex: 'stockinDLot',
			width: 150,
			renderer: function(value, metaData, record, rowIdx, colIdx, store) {
				if(value == null) value = '';
				value = value.toUpperCase();
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
		}
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
				itemId: 'cmbStockinGroup'
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
				fieldLabel: 'Mã SP',
				width: 200,
				labelWidth: 50,
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

