Ext.define('GSmartApp.view.stockout.Stockout_M_Edit_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_M_Edit_D',
    id: 'Stockout_M_Edit_D',
    requires: [
		'Ext.grid.plugin.CellEditing'
	],
    border: true,
    bind:{
        store: '{StockoutD_Store}'
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
			var totalmet_origin = record.get('totalmet_origin') == null ? 0 : record.get('totalmet_origin');
			var totalmet_check = record.get('totalmet_check') == null ? 0 : record.get('totalmet_check');
            // if (c == -1) {
			if(totalmet_origin > totalmet_check){
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
            }             
        }
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
                    handler: 'onMenu_Stockout_M_Edit_D_List'
                },            
            ]
        },
		{
			text: 'Mã NPL', 
			dataIndex: 'skucode',
			flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
		},{
			text: 'Mô tả', 
			dataIndex: 'sku_product_desc',
			flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
		},{
			text: 'Màu', 
			dataIndex: 'sku_product_color',
			width: 150,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
		},{
			text: 'Cỡ', 
			dataIndex: 'size_name',
			width: 70,
			renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                if(value == 'ALL'){
                    return '';
                }else{
					metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },
		},
		{
			text: 'ĐVT', 
			dataIndex: 'unitid_link',
			width: 70,
			renderer: function(value, metaData, record, rowIdx, colIdx, store) {
				if(value == null) value = 1;
				if(value == 1){
					return 'MÉT';
				}
				if(value == 3){
					return 'YARD'
				}
				if(value == 4){
					return 'KG';
				}
				if(value == 5){
					return 'POUND'
				}
				return "";
			},
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
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
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
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
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
		
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Y/C (KG)', 
			align:'right',
			dataIndex: 'grossweight',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 105,
			bind: {
				hidden: '{isKgColumnHidden}',
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
			text: 'SL kiểm (KG)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'netweight',
			width: 105,
			bind: {
				hidden: '{isKgColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Y/C (lbs)', 
			align:'right',
			dataIndex: 'grossweight_lbs',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 105,
			bind: {
				hidden: '{isLbsColumnHidden}',
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
			text: 'SL kiểm (lbs)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'netweight_lbs',
			width: 105,
			bind: {
				hidden: '{isLbsColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
		},
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
				xtype: 'combo',
				margin: '0 5 0 5',
				itemId:'skucode',
				fieldLabel: 'Mã hàng',
				width: 350,
				labelWidth: 70,
				hideLabel: false,			
				bind:{
					// store: '{SKUStore}',
					hidden: '{isBarcodeHidden}',
					// value: '{skucode}'
				},
				store: {
					type: 'Sku_AutoComplete',
					// pageSize: 10
				},
				displayField: 'code',
				valueField: 'id',
				listConfig: {
					loadingText: 'Tải mã hàng...',
					emptyText: 'Không có mã hàng phù hợp.',
				},
				anyMatch: true,
				minChars: 2,
				queryMode: 'remote',
				queryParam: 'code'			,	
				enableKeyEvents : true,
				listeners: {
					keypress: 'onPressEnterSkucode'
				}
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
