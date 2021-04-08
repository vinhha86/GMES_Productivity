Ext.define('GSmartApp.view.stockin.StockIn_P_Edit_M', {
	extend: 'Ext.container.Container',
	xtype: 'StockIn_P_Edit_M',
	controller: 'StockIn_P_Edit_M_Controller',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		layout: 'hbox',
		xtype: 'container',
		items: [
			{
				xtype: 'hiddenfield',
				bind: {
					value: '{stockin.id}'
				},
			}, 
			{
				xtype: 'hiddenfield',
				bind: {
					value: '{stockin.status}'
				},
			},
		{
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				value: '{stockin.stockintypeid_link}',
				store: '{StockinTypeStore}'
			},
			queryMode: 'local',
			margin: '0 5 0 5',
			fieldLabel: 'Loại phiếu',	
			readOnly: true,
			editable: false,				
			allowBlank: false,
			blankText: 'Không được để trống',
			labelWidth: 95,
			width: 370
		}, {
			margin: '0 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{stockin.stockincode}'
			},
			readOnly: true,
			fieldLabel: "Số phiếu",
			width: 235,
            labelWidth: 85
		}, {
			margin: '0 5 0 5',
			xtype: 'datefield',
			format: GSmartApp.util.State.get('dataFormat'),
			altFormats: "Y-m-d\\TH:i:s.uO",
			bind: {
				value: '{stockin.stockindate}'
			},			
			editable: false,
			fieldLabel: "Ngày nhập",
			width: 200,
            labelWidth: 70
		}, {
			xtype: 'combo',
			valueField: 'id',
			displayField: 'fullName',
			bind: {
				value: '{stockin.usercreateid_link}',
				store: '{UserStore}'
			},
			queryMode: 'local',
			margin: '0 5 0 5',
			readOnly: true,
			flex: 1,
            labelWidth: 85,
			fieldLabel: 'Người nhập'
		}]
	}, {
		layout: 'hbox',
		xtype: 'container',
		items: [{
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				value: '{stockin.orgid_from_link}',
				store: '{OrgFromStore}'
			},
			queryMode: 'local',
			margin: '0 5 0 5',
			fieldLabel: 'Nơi giao',					
			labelWidth: 95,					
			width: 370
		},{
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				value: '{stockin.orgid_to_link}',
				store: '{OrgToStore}'
			},
			queryMode: 'local',
			margin: '0 5 0 5',
			width: 445,
			labelWidth: 85,
			fieldLabel: 'Nơi nhận'
		},{
			margin: '0 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{stockin.shipperson}'
			},
			fieldLabel: 'Người giao',
			labelWidth: 85,
			flex: 1
		}]
	}, {
		layout: 'hbox',
		xtype: 'container',
		items: [{
			margin: '0 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{stockin.reason}'
			},
			fieldLabel: 'Lý do nhập',					
			labelWidth: 95,
			width: 370
		},{
			margin: '0 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{stockin.extrainfo}'
			},
			fieldLabel: 'Kèm theo',
			flex: 1,
            labelWidth: 85
		},]
	},
	{
		layout: 'hbox',
		xtype: 'container',
		items: [
			{
				xtype: 'textfield',
				margin: '0 0 0 5',
				itemId:'stockoutcode',
				fieldLabel: 'Phiếu XK',
				width: 335,
				labelWidth: 95,
				hideLabel: false,			
				bind:{
					disabled: '{isEdit}',
					value: '{stockin.stockout_code}',
					hidden: '{isStockoutHidden}'
				}  
			},
			{
				xtype: 'button',
				tooltip: 'Tìm Phiếu XK',
				margin: '0 5 0 3',
				itemId: 'btnTimStockout',
				iconCls: 'x-fa fa-search',
				weight: 30,			
				bind:{
					disabled: '{isEdit}',
					hidden: '{isStockoutHidden}'
				}
			}, 	
			{
				xtype: 'textfield',
				margin: '0 0 0 5',
				itemId:'ordercode',
				fieldLabel: 'Line giao hàng',
				width: 335,
				labelWidth: 95,
				hideLabel: false,			
				bind:{
					disabled: '{isEdit}',
					value: '{stockin.contract_number}',
					hidden: '{isPOLineHidden}'
				}  
			},
			{
				xtype: 'button',
				tooltip: 'Tìm PO Line',
				margin: '0 5 0 3',
				itemId: 'btnTimPOLine',
				//text: 'Thêm thẻ vải',
				iconCls: 'x-fa fa-search',
				weight: 30,			
				bind:{
					disabled: '{isEdit}',
					hidden: '{isPOLineHidden}'
				}
				// handler: 'onSkuSearchTap'
			}, 			
			{
				margin: '0 5 0 5',
				xtype: 'textfield',
				bind: {
					value: '{stockin.customs_number}'
				},
				labelWidth: 85,
				width: 445,
				fieldLabel: 'Số tờ khai'
			},
			{
			margin: '0 5 0 5',
			xtype: 'datefield',
			format: GSmartApp.util.State.get('dataFormat'),
			altFormats: "Y-m-d\\TH:i:s.uO",
			bind: {
				value: '{stockin.customs_date}'
			},
			editable: false,
			flex: 1,
			labelWidth: 85,
			fieldLabel: "Ngày tờ khai"
		}]
	},
	// {
	// 	layout: 'hbox',
	// 	xtype: 'container',
	// 	items: [{
	// 		margin: '0 5 0 5',
	// 		xtype: 'textfield',
	// 		bind: {
	// 			value: '{stockin.invoice_number}'
	// 		},
	// 		fieldLabel: 'Số Invoice',					
	// 		labelWidth: 80,
	// 		width: 375
	// 	},{
	// 		margin: '0 5 0 5',
	// 		xtype: 'datefield',
	// 		format: GSmartApp.util.State.get('dataFormat'),
	// 		altFormats: "Y-m-d\\TH:i:s.uO",
	// 		bind: {
	// 			value: '{stockin.invoice_date}'
	// 		},
	// 		editable: false,
	// 		labelWidth: 85,
	// 		width: 215,
	// 		fieldLabel: "Ngày Invoice"
	// 	},{
	// 		margin: '0 5 0 5',
	// 		xtype: 'textfield',
	// 		bind: {
	// 			value: '{stockin.invoice_paymentype}'
	// 		},
	// 		labelWidth: 85,
	// 		width: 220,
	// 		fieldLabel: 'Hình thức TT'
	// 	},
	// 	{
	// 		margin: '0 5 0 5',
	// 		xtype: 'textfield',
	// 		bind: {
	// 			value: '{stockin.invoice_paymentdue}'
	// 		},
	// 		labelWidth: 85,
	// 		flex: 1,
	// 		fieldLabel: 'Số ngày TT',
	// 		maskRe: /[0-9.]/,
	// 	}]
	// },{
	// 	layout: 'hbox',
	// 	xtype: 'container',
	// 	items: [{
	// 		xtype: 'combo',
	// 		valueField: 'id',
	// 		displayField: 'name',
	// 		bind: {
	// 			value: '{stockin.vat_typeid_link}',
	// 			store: '{VatTypeStore}'
	// 		},
	// 		queryMode: 'local',
	// 		margin: '0 5 0 5',
	// 		fieldLabel: 'Loại HĐ',					
	// 		width: 375,
	// 		labelWidth: 80
	// 	},{
	// 		margin: '0 5 0 5',
	// 		xtype: 'textfield',
	// 		bind: {
	// 			value: '{stockin.vat_symbol}'
	// 		},
	// 		labelWidth: 85,
	// 		width: 215,
	// 		fieldLabel: 'Ký hiệu HĐ'
	// 	},{
	// 		margin: '0 5 0 5',
	// 		xtype: 'textfield',
	// 		bind: {
	// 			value: '{stockin.vat_sample}'
	// 		},
	// 		labelWidth: 85,
	// 		width: 220,
	// 		fieldLabel: 'Mẫu HĐ'
	// 	},{
	// 		margin: '0 5 0 5',
	// 		xtype: 'datefield',
	// 		format: GSmartApp.util.State.get('dataFormat'),
	// 		altFormats: "Y-m-d\\TH:i:s.uO",
	// 		bind: {
	// 			value: '{stockin.vat_date}'
	// 		},
	// 		editable: false,
	// 		flex: 1,
    //     	labelWidth: 85,
	// 		fieldLabel: "Ngày HĐ"
	// 	}]
	// }, {
	// 	layout: 'hbox',
	// 	xtype: 'container',
	// 	items: [{
	// 		margin: '0 5 5 5',
	// 		xtype: 'textfield',
	// 		bind: {
	// 			value: '{stockin.vat_number}'
	// 		},
	// 		fieldLabel: 'Số HĐ',					
	// 		width: 375,
	// 		labelWidth: 80
	// 	},{
	// 		xtype: 'combo',
	// 		valueField: 'id',
	// 		displayField: 'code',
	// 		bind: {
	// 			value: '{stockin.vat_currencyid_link}',
	// 			store: '{CurrencyStore}'
	// 		},
	// 		queryMode: 'local',
	// 		margin: '0 5 5 5',
	// 		labelWidth: 85,
	// 		width: 215,
	// 		itemId: 'loaitien',
	// 		fieldLabel: 'Loại tiền'
	// 	},
	// 	{
	// 		margin: '0 5 0 5',
	// 		xtype: 'textfield',
	// 		bind: {
	// 			value: '{stockin.vat_exchangerate}'
	// 		},
	// 		readOnly: true,
	// 		labelWidth: 85,
	// 		width: 220,
	// 		fieldLabel: 'Tỉ giá'
	// 	},{
	// 		margin: '0 5 5 5',
	// 		xtype: 'datefield',
	// 		format: GSmartApp.util.State.get('dataFormat'),
	// 		altFormats: "Y-m-d\\TH:i:s.uO",
	// 		bind: {
	// 			value: '{stockin.vat_paymentduedate}'
	// 		},
	// 		labelWidth: 85,
	// 		flex: 1,
	// 		editable: false,
	// 		fieldLabel: 'Hạn TT'
	// 	}]
	// }
	]
});

