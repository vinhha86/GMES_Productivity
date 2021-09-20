Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_List_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_M_List_D',
	itemId: 'Stockin_M_List_D',
	cls: 'Stockin_M_List_D',
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

			var totalmet_origin = record.get('totalmet_origin') == null ? 0 : record.get('totalmet_origin');
			var totalmet_check = record.get('totalmet_check') == null ? 0 : record.get('totalmet_check');
			var grossweight = record.get('grossweight') == null ? 0 : record.get('grossweight');
			var netweight = record.get('netweight') == null ? 0 : record.get('netweight');

			if(
				totalmet_origin == 0
				&& totalmet_check == 0
				&& grossweight == 0
				&& netweight == 0
			){
				return 'epc-ok';
			}
			if(totalmet_check >= totalmet_origin && totalmet_check > 0){
				return 'epc-ok';
			}
			if(netweight >= grossweight && netweight > 0){
				return 'epc-ok';
			}
			return 'epc-error';
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
		{
			text: 'Mã NPL', 
			flex: 1,
			dataIndex: 'skuCode',
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldMaNPL',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueMaNPLKeyup',
					buffer: 500
				}
			}
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldTenNPL',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueTenNPLKeyup',
					buffer: 500
				}
			}
		},{
			text: 'Mô tả', 
			dataIndex: 'sku_product_desc',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},{
			text: 'Màu', 
			dataIndex: 'sku_product_color',
			width: 150,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},{
			text: 'Cỡ khổ', 
			dataIndex: 'size_name',
			width: 70
		},{
			text: 'ĐVT', 
			dataIndex: 'unitid_link',
			width: 70,
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
			width: 90,
			bind: {
				hidden: '{!isRecordNguyenLieu}',
			},
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL kiểm (M)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalmet_check',
			width: 90,
			bind: {
				hidden: '{!isRecordNguyenLieu}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Cây kiểm', 
			align:'right',
			dataIndex: 'totalpackagecheck',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70,
			bind: {
				hidden: '{!isRecordNguyenLieu}',
			},
		},		
		{
			text: 'Danh sách LOT',
			dataIndex: 'stockinDLot',
			width: 150,
			renderer: function(value, metaData, record, rowIdx, colIdx, store) {
				if(value == null) value = '';
				value = value.toUpperCase();
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			bind: {
				hidden: '{!isRecordNguyenLieu}',
			},
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
			bind: {
				hidden: '{isRecordNguyenLieu}',
			},
		},
		{
			xtype: 'numbercolumn',
			width: 90,
			format: '0,000',
			text: 'SL Nhập',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackagecheck',
			bind: {
				hidden: '{isRecordNguyenLieu}',
			},
		},
	],
});

