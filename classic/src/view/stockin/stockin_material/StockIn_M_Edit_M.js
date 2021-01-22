Ext.define('GSmartApp.view.stockin.StockIn_M_Edit_M', {
	extend: 'Ext.container.Container',
	xtype: 'StockIn_M_Edit_M',
	controller: 'StockIn_M_Edit_M_Controller',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		layout: 'hbox',
		xtype: 'container',
		items: [{
			xtype: 'hiddenfield',
			bind: {
				value: '{stockin.id}'
			},
		}, {
			xtype: 'hiddenfield',
			bind: {
				value: '{stockin.status}'
			},
		}, {
			xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
			bind: {
				value: '{stockin.stockintypeid_link}',
				store: '{StockinTypeStore}'
			},
			queryMode: 'local',
			margin: '5 5 0 5',
			fieldLabel: 'Loại nhập',					
			allowBlank: false,
			blankText: 'Không được để trống',
			labelWidth: 80,
			width: 375
		}, {
			margin: '5 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{stockin.stockincode}'
			},
			readOnly: true,
			fieldLabel: "Số phiếu",
			width: 235,
            labelWidth: 85
		}, {
			margin: '5 5 0 5',
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
			margin: '5 5 0 5',
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
			labelWidth: 80,					
			width: 375
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
			labelWidth: 80,
			width: 375
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
		items: [{
			margin: '0 5 0 5',
			xtype: 'textfield',
			bind: {
				value: '{stockin.invoice_number}'
			},
			fieldLabel: 'Số Invoice',					
			labelWidth: 80,
			width: 375
		},{
			margin: '0 5 0 5',
			xtype: 'datefield',
			format: GSmartApp.util.State.get('dataFormat'),
			altFormats: "Y-m-d\\TH:i:s.uO",
			bind: {
				value: '{stockin.invoice_date}'
			},
			editable: false,
			labelWidth: 85,
			width: 215,
			fieldLabel: "Ngày Invoice"
		}]
	}]
});

