Ext.define('GSmartApp.view.balance.Balance_D_Pcontract', {
	extend: 'Ext.grid.Panel',
	xtype: 'Balance_D_Pcontract',
	id: 'Balance_D_Pcontract',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	columnLines: true,
	rowLines: true,
	border: true,
    features: [{
        ftype:'grouping',
        groupHeaderTpl: '{name}',
        collapseTip: "",
        expandTip:""
    }],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false                
    },
	// selModel: {
    //     selType: 'checkboxmodel',
    // },
	bind:{
		store: '{SKUBalanceStore}'
	},
	columns: [
		{
			text: 'Mã NPL', 
			width: 120,
			dataIndex: 'mat_sku_code'
		},
		{
			text: 'Màu NPL', 
			dataIndex: 'mat_sku_color_name',
			width: 85
		},
		{
			text: 'Thành phần vải',
			dataIndex: 'mat_sku_desc',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Số lượng SP', 
			dataIndex: 'mat_sku_product_total',
			width: 85,
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				return Ext.util.Format.number(value, '0,000')
			}
		},
		{
			text: 'ĐVT', 
			dataIndex: 'mat_sku_unit_name',
			width: 70
		},
		{
			text: 'Định mức',
			dataIndex: 'mat_sku_bom_amount',
			width: 70,
			xtype: 'numbercolumn',
			format: '0.0000',
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				return Ext.util.Format.number(value, '0.0000')
			}
		},				
		{
			text: '%TH',
			dataIndex: 'mat_sku_bom_lostratio',
			width: 55,
			xtype: 'numbercolumn',
			format: '0.000',
			renderer: function (value, metaData, record) {
				return value+" %";
			}
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Nhu cầu', 
			align:'right',
			dataIndex: 'mat_sku_demand',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80
		},
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000',
		// 	text: 'Đặt hàng', 
		// 	align:'right',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	dataIndex: 'mat_sku_invoice',
		// 	width: 80
		// },
		// {
		// 	text:'Dự kiến về',
		// 	dataIndex:'mat_sku_invoice_date',
		// 	renderer: Ext.util.Format.dateRenderer('d/m/y'),
		// 	width: 75
		// },
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Nhập kho', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockin',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Y/C xuất', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout_order',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Xuất kho', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout',
			width: 80
		},
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000',
		// 	text: 'Tồn', 
		// 	align:'right',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	dataIndex: 'in_stock',
		// 	width: 80
		// },
	],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [
            {
                xtype: 'combo',
                width: 400,
                margin: 3,
                bind: {
                    store: '{PContractProductStore}',
                    value: '{IdProduct}',
                    readOnly: '{isReadOnlycmbSanPham}'
                },
                triggerAction: 'all',
                fieldLabel: 'Sản phẩm',
                labelWidth: 80,
                itemId: 'cmbSanPham',
                queryMode: 'local',
                valueField: 'productid_link',
                displayField: 'productBuyerCode'
            },
            {
                xtype: 'button',
				text: 'Tính cân đối',
				iconCls: 'x-fa fa-calculator',
				handler: 'onCalBalance_OneProduct'
            }
        ]
    }],	 
});

