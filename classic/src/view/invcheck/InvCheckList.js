Ext.define('GSmartApp.view.invcheck.InvCheckList', {
	extend: 'Ext.form.Panel',
	xtype:'invchecklist',
	controller: 'invchecklist',
	viewModel: {
        type: 'invchecklist'
    },
   layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	items:[{
		 margin:'5',
		 xtype:'form',
		 reference:'formInvCheckList',
		 layout:'hbox',
		 items:[{
			 margin:'0 5 0 5',
			 xtype: 'textfield',
			 emptyText:GSmartApp.Locales.so_phienhieu[GSmartApp.Locales.currentLocale],
			 name:'stockcode'
		 },{
			 name:'orgfrom_code',
			 xtype: 'combobox',
			 emptyText:GSmartApp.Locales.kho_kiemke[GSmartApp.Locales.currentLocale],
			 store:'WareHouseStore',
			 queryMode: 'local',
			 displayField: 'name',
			 valueField: 'id'
		 },{
			  margin:'0 5 0 5',
			 name:'invdateto_from',
			 xtype: 'datefield',
			 format:GSmartApp.util.State.get('dataFormat'),
			 emptyText:GSmartApp.Locales.ngaykiem_tu[GSmartApp.Locales.currentLocale],
		 },{
			 name:'invdateto_to',
			 xtype: 'datefield',
			 format:GSmartApp.util.State.get('dataFormat'),
			 emptyText:GSmartApp.Locales.ngaykiem_den[GSmartApp.Locales.currentLocale],
		},{
			margin:'0 5 0 5',
			xtype: 'combobox',
			emptyText:GSmartApp.Locales.trangthai[GSmartApp.Locales.currentLocale],
			store:'GSmartApp.store.invcheck.InvCheckStatusStore',
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			name:'status',
			value:-1
		},{
			 width:90,
			 xtype:'button',
			 text:GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
			 iconCls: 'x-fa fa-filter',
			 handler:'onSearch'
		 },{
			 flex:1
		 },{
			 xtype:'button',
			 text:GSmartApp.Locales.phieu_kiemkemoi[GSmartApp.Locales.currentLocale],
			 iconCls: 'x-fa fa-plus',
			 handler: 'onCreate',
			 width:150,
		 }]
	},{
		flex:1,
		margin:'10 2 2 2',
		xtype:'grid',
		store:'GSmartApp.store.invcheck.InvCheckListStore',
		reference:'gridInvCheckList',
		columnLines:true,
		rowLines:true,
		columns: [{ 
			text: GSmartApp.Locales.sophien[GSmartApp.Locales.currentLocale],
			dataIndex: 'invcheckcode', 
			width: 280
		},
		{ 
			text: GSmartApp.Locales.ngaykiem[GSmartApp.Locales.currentLocale],
			dataIndex: 'invcheckdatetime', 
			width: 120
		},
		{ 
			text: GSmartApp.Locales.kho_kiemke[GSmartApp.Locales.currentLocale],
			dataIndex: 'orgcheck_name', 
			flex:1
		},
		{ 
			text: GSmartApp.Locales.nguoi_taophien[GSmartApp.Locales.currentLocale],
			dataIndex: 'user_name', 
			width: 150
		},
		{
			text: GSmartApp.Locales.trangthai[GSmartApp.Locales.currentLocale],
			dataIndex: 'status', 
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
			}, {
				iconCls: 'x-fa fas fa-times-circle-o',
				tooltip:GSmartApp.Locales.dongphien_kiemke[GSmartApp.Locales.currentLocale], 
				handler: 'onDelete'
			}]
			/*width: 50,
			hideable: false,
			cell: {
				tools:[{
					iconCls: 'fas fa-edit',
					tooltip:GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale], 
					handler: 'onEdit'
				},{
					iconCls: 'fas fa-times-circle-o',
					tooltip:GSmartApp.Locales.dongphien_kiemke[GSmartApp.Locales.currentLocale], 
					handler: 'onDelete'
				}]
			}*/
		}],
		bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: "No topics to display"
    }
	}]
});

