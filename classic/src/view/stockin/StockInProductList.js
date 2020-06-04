Ext.define('GSmartApp.view.stockin.StockInProductList', {
    extend: 'Ext.form.Panel',
	xtype:'stockinproductlist',
    controller: 'stockinproductlist',
	viewModel: {
        type: 'stockinproductlist'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	items:[{
		 margin:'5',
		 xtype:'form',
		 reference:'formStockin',
		 layout:'hbox',
		 items:[{
			 margin:'0 5 0 5',
			 xtype: 'textfield',
			 emptyText:GSmartApp.Locales.sophieunhap_mahang[GSmartApp.Locales.currentLocale],
			 name:'stockincode'
		 },{
			 name:'stockcode',
			 xtype: 'combobox',
			 emptyText:GSmartApp.Locales.donvi_xuat[GSmartApp.Locales.currentLocale],
			 store:'OrgStore',
			 queryMode: 'local',
			 displayField: 'name',
			 valueField: 'id'
		 },{
			 margin:'0 5 0 5',
			 name:'stockindate_from',
			 xtype: 'datefield',
			 dateFormat:GSmartApp.util.State.get('dataFormat'),
			 emptyText:GSmartApp.Locales.hangden_tungay[GSmartApp.Locales.currentLocale]
		 },{
			 name:'stockindate_to',
			 xtype: 'datefield',
			 dateFormat:GSmartApp.util.State.get('dataFormat'),
			 emptyText: GSmartApp.Locales.hangden_toingay[GSmartApp.Locales.currentLocale]
		 },{
			margin:'0 5 0 5',
			xtype: 'combobox',
			emptyText:GSmartApp.Locales.trangthai[GSmartApp.Locales.currentLocale],
			store:'GSmartApp.store.stockin.StockinStatusStore',
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			width:100,
			name:'status',
			value:-1
		},{
			 width:5
		 },{
			 width:100,
			 xtype:'button',
			 text:GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
			 iconCls: 'x-fa fa-filter',
			 handler:'onSearch'
		 },{
			 flex:1
		 },{
			 xtype:'button',
			 text:GSmartApp.Locales.phieu_nhapmoi[GSmartApp.Locales.currentLocale],
			 iconCls: 'x-fa fa-plus',
			 handler: 'onStockInCreate'
		 },{
			 width:5
		 }]
	},{
		flex:1,
		margin:'10 2 2 2',
		xtype:'grid',
		store:'GSmartApp.store.stockin.StockinListStore',
		reference:'gridStockin',
		columnLines:true,
		rowLines:true,
		columns: [{ 
			text: GSmartApp.Locales.sophieu[GSmartApp.Locales.currentLocale],
			dataIndex: 'stockincode', 
			width: 300
		},
		{ 
			text: GSmartApp.Locales.ngaynhap[GSmartApp.Locales.currentLocale],
			dataIndex: 'stockindate', 
			width: 120
		},
		{ 
			text: GSmartApp.Locales.donvi_xuathang[GSmartApp.Locales.currentLocale],
			dataIndex: 'orgfrom_name', 
			flex:1
		},
		{ 
			text: GSmartApp.Locales.mahang[GSmartApp.Locales.currentLocale],
			dataIndex: 'productcode', 
			width: 200
		},
		{ 
			text: GSmartApp.Locales.sokien[GSmartApp.Locales.currentLocale],
			xtype: 'numbercolumn',
			format:'0,000',
			align:'right',
			dataIndex: 'totalpackage', 
			width: 200
		},
		{
			text: GSmartApp.Locales.trangthai[GSmartApp.Locales.currentLocale],
			dataIndex: 'statusname', 
			width: 150
		},
		{ 
			xtype: 'actioncolumn',
			width: 50,
			menuDisabled: true,
			sortable: false,

			items: [{
				iconCls: 'x-fa fas fa-edit',
				tooltip:GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale], 
				handler: 'onEdit'
			},{
				iconCls: 'x-fa fas fa-trash',
				tooltip:GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale], 
				handler: 'onDelete'
			}]
		}],
		listeners:{
			itemdblclick:'onItemdblclick'
		},
		bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: "No topics to display"
    }
	}]
});

