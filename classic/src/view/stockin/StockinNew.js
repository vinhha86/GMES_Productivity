Ext.define('GSmartApp.view.stockin.StockinNew', {
    extend: 'Ext.Panel',
    xtype: 'stockinnew',
    controller: 'stockinnew',
	viewModel: {
        type: 'stockinnew'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	defaultFocus: 'stockincode',
	qrcode:null,
	items:[{
		// height: 280,
		 layout: {
			type: 'hbox',
			pack: 'start',
			align: 'stretch'
		},
		 reference:'formMaster',
		 items: [{
			 layout: {
				type: 'vbox',
				pack: 'start',
				align: 'stretch'
			},
			 xtype:'form',
			 reference:'formStockin',
			 flex:1,
			 items:[{
				 layout:'hbox',
				 margin:2,
				 items: [{
					 xtype:'hiddenfield',
					 name:'id'
				 },{
					 xtype:'hiddenfield',
					 name:'status'
				 },{
					 flex:1,
					 margin:'0 0 0 5',
					 labelWidth:130,
					 xtype: 'textfield',
					 name:'stockincode',
					 reference:'stockincode',
					 allowBlank: false,
					 required: true,
					 fieldLabel: GSmartApp.Locales.sophieu[GSmartApp.Locales.currentLocale],
					 listeners: {
						 keypress:'onSoPhieuKeypress'
					 }
				 }, {
					 labelWidth:120,
					 margin:'0 0 0 5',
					 xtype: 'datefield',
					 dateFormat:GSmartApp.util.State.get('dataFormat'),
					 name:'stockindate',
					 fieldLabel: GSmartApp.Locales.ngay_lapphieu[GSmartApp.Locales.currentLocale],
					 flex:1,
				 },{
					 flex:2,
					 labelWidth:130,
					 margin:'0 0 0 5',
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.thietbilamviec[GSmartApp.Locales.currentLocale],
					 store:'DeviceInvStore',
					 displayField: 'name',
					 valueField: 'id',
					 name:'deviceid',
					 reference:'device',
					 listeners:{
						 change :'onDeviceChange'
					 }
				 }]
			 },{
				 layout:'hbox',
				 margin:2,
				 items: [{
					 flex:1,
					 margin:'0 0 0 5',
					 labelWidth:130,
					 name:'invoicenumber',
					 xtype: 'textfield',
					 fieldLabel: GSmartApp.Locales.sohd_phieuxuat[GSmartApp.Locales.currentLocale],
					 readOnly:true
				 }, {
					 flex:1,
					 margin:'0 0 0 5',
					 labelWidth:120,
					 xtype: 'datefield',
					 dateFormat:GSmartApp.util.State.get('dataFormat'),
					 name:'invoicedate',
					 fieldLabel: GSmartApp.Locales.ngayhd_phieuxuat[GSmartApp.Locales.currentLocale],
					 readOnly:true
				 },{
					 flex:2,
					 margin:'0 0 0 5',
					 layout:'hbox',
					 items:[{
						 flex:1
					 },{
						 xtype:'button',
						 text: GSmartApp.Locales.btn_import_nhapkho[GSmartApp.Locales.currentLocale],
						 iconCls: 'x-fa fa-upload',
						 handler: 'onImport',
						 bind:{
							hidden:'{isNhapmoi}'
						 }
					 }]
				 }]
			 },{
				 layout:'hbox',
				 margin:2,
				 items: [{
					 flex:1,
					 margin:'0 0 0 5',
					 name:'orgid_from_link',
					 labelWidth:130,
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.donvi_caphang[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 store:'OrgStore',
					 displayField: 'name',
					 valueField: 'id'
				 },{
					 flex:1,
					 margin:'0 0 0 5',
					 labelWidth:130,
					 name:'p_skuid_link',
					 reference:'productcode',
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.sanpham[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 store:'SkuStore',
					 displayField: 'name',
					 valueField: 'id'
				 }]
			 },{
				 layout:'hbox',
				 margin:2,
				 items:[{
					 flex: 1,
					 margin:'0 0 0 5',
					 name:'shipperson',
					 labelWidth:130,
					 xtype: 'textfield',
					 fieldLabel: GSmartApp.Locales.nguoigiaohang[GSmartApp.Locales.currentLocale]
				 },{
					 flex: 1,
					 margin:'0 0 0 5',
					 name:'extrainfo',
					 labelWidth:130,
					 xtype: 'textfield',
					 fieldLabel: GSmartApp.Locales.ghichu[GSmartApp.Locales.currentLocale]
				 }]
			 }]
		 
		 },{
			 width:150,
			 layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			// items:[{
			//	 id:'stockinQrcode',
			// }]
		 }]
		 
	},{
		html:'<hr>'
	},{
		xtype:'form',
		layout:'hbox',
		items: [{
			 margin:'0 5 5 5',
			 xtype:'button',
			 iconCls: 'x-fa fa-angle-double-up',
			  bind:{
				 hidden:'{IsformMaster}'
			 },
			 handler: 'onHidden'
		},{
			 margin:'0 5 5 5',
			 xtype:'button',
			 iconCls: 'x-fa fa-angle-double-down',
			 bind:{
				 hidden:'{!IsformMaster}'
			 },
			 handler: 'onHidden'
		},{
			 margin:'0 5 5 5',
			 text: "Start",
			 iconCls: 'x-fa fa-play',
			 xtype: 'button',
			 handler:'onStart',
			 bind:{
				hidden:'{isNhapmoi}',
				disabled:'{isStart}',
				userCls:'{clsbtnStart}'
			}
		  },{
			 margin:'0 5 5 5',
			 text: "Stop",
			 iconCls: 'x-fa fa-stop',
			 xtype: 'button',
			 handler:'onStop',
			 userCls:'red-button'
		  },{
			 margin:'0 5 5 5',
			 width:250,
			 xtype: 'textfield',
			 reference:'txtSkucode',
			 placeholder: GSmartApp.Locales.mahang[GSmartApp.Locales.currentLocale],
			 bind:{
				hidden:'{isNhapmoi}',
				disabled:'{!isTabEpc}'
			}
		 },{
			 margin:'0 5 5 5',
			 xtype:'button',
			 text: GSmartApp.Locales.btn_themvattu[GSmartApp.Locales.currentLocale],
			 iconCls: 'x-fa fa-plus',
			 handler: 'onAddSku',
			 bind:{
				hidden:'{isNhapmoi}',
				disabled:'{!isTabEpc}'
			}
		 },{
			  flex:1
		  },{
			 margin:'0 5 5 5',
			 text: "Sản phẩm khác mã SKU",
			 iconCls: 'x-fa fa-archive',
			 xtype: 'button',
			 handler:'onProductError',
			 bind:{
				hidden:'{isNhapmoi}',
				userCls:'{clsbtnSkuError}'
				
			}
		  },{
			 margin:'0 0 5 5',
			 text: "Sản phẩm theo SKU",
			 iconCls: 'x-fa fa-shopping-basket',
			 xtype: 'button',
			 handler:'onIsTabEpc',
			 bind:{
				disabled:'{isTabEpc}',
			 }
		  },{
			 margin:'0 5 5 5',
			 text: "Sản phẩm theo EPC",
			 iconCls: 'x-fa fa-microchip',
			 xtype: 'button',
			 handler:'onIsTabEpc',
			 bind:{
				disabled:'{!isTabEpc}',
			 }
		  }]
	},{
		xtype:'grid',
		reference:'gridStockin',
		columnLines:true,
		rowLines:true,
		flex:1,
		lockedViewConfig: {
			scroll: 'horizontal'
		},
		features: [{
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        },{
            ftype: 'summary',
            dock: 'bottom'
		}],
		store:'GSmartApp.store.stockin.StockinDetailStore',
		columns: [{
			text:GSmartApp.Locales.ma_vattu[GSmartApp.Locales.currentLocale], 
			dataIndex: 'skucode',
			flex:1,
			summaryRenderer:function (grid, context) {
				return 'Tổng cộng';
			}
		},
		{
			text:GSmartApp.Locales.ten_vattu[GSmartApp.Locales.currentLocale], 
			dataIndex: 'skuname',
			flex:1
		},{
			text:GSmartApp.Locales.mau[GSmartApp.Locales.currentLocale], 
			dataIndex: 'colorname',
			width:100,
		},{
			text:GSmartApp.Locales.donvitinh[GSmartApp.Locales.currentLocale], 
			dataIndex: 'unitname',
			width:100,
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.sokien[GSmartApp.Locales.currentLocale], 
			dataIndex: 'totalpackage',
			width:140,
			align:'right',
			summaryType: 'sum',
			editor: {
				xtype: 'numberfield',
				required: true,
				validators: {
					type: 'number',
					message: 'Invalid number'
				}
			}
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.yds[GSmartApp.Locales.currentLocale], 
			dataIndex: 'totalyds',
			width:120,
			align:'right',
			summaryType: 'sum',
			editor: {
				xtype: 'numberfield',
				required: true,
				validators: {
					type: 'number',
					message: 'Invalid number'
				}
			}
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.foc[GSmartApp.Locales.currentLocale], 
			dataIndex: 'foc',
			width:120,
			align:'right',
			summaryType: 'sum',
			editor: {
				xtype: 'numberfield',
				required: true,
				validators: {
					type: 'number',
					message: 'Invalid number'
				}
			}
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.sokien_check[GSmartApp.Locales.currentLocale], 
			dataIndex: 'totalpackagecheck',
			width:130,
			align:'right',
			summaryType: 'sum',
			editor: {
				xtype: 'numberfield',
				required: true,
				validators: {
					type: 'number',
					message: 'Invalid number'
				}
			}
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.yds_check[GSmartApp.Locales.currentLocale], 
			dataIndex: 'totalydscheck',
			width:130,
			align:'right',
			summaryType: 'sum',
			editor: {
				xtype: 'numberfield',
				required: true,
				validators: {
					type: 'number',
					message: 'Invalid number'
				}
			}
		},
		{
			xtype: 'actioncolumn',
			width: 50,
			menuDisabled: true,
			sortable: false,
			items: [{
				iconCls: 'x-fa fas fa-edit',
				tooltip:GSmartApp.Locales.packinglist[GSmartApp.Locales.currentLocale], 
				handler: 'onPackinglist'
			}]
		}],
		bind:{
			hidden:'{!isTabEpc}',
		}
	},{
		xtype:'grid',
		reference:'gridStockinEpc',
		store:'GSmartApp.store.stockin.StockinDetailEpcStore',
		columnLines:true,
		rowLines:true,
		features: [{
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        },{
            ftype: 'summary',
            dock: 'bottom'
		}],
		flex:1,
		columns: [{
				text:GSmartApp.Locales.ma_vattu[GSmartApp.Locales.currentLocale], 
				dataIndex: 'skucode',
				flex:1,
				renderer: function(value, record, dataIndex, cell) {
					if(Number(record.get('rssi'))<=0){
						cell.setStyle('background: red;')     
					}   
				   return value;
				},
				summaryRenderer:function (grid, context) {
					return 'Tổng số';
				}
			},
			{
				text:GSmartApp.Locales.ten_vattu[GSmartApp.Locales.currentLocale], 
				dataIndex: 'skuname',
				flex:1,
				renderer: function(value, record, dataIndex, cell) {
					if(Number(record.get('rssi'))<=0){
						cell.setStyle('background: red;')     
					}   
				   return value;
				}
			},{
				text:GSmartApp.Locales.epc[GSmartApp.Locales.currentLocale], 
				dataIndex: 'epc',
				flex:1,
				renderer: function(value, record, dataIndex, cell) {
					if(Number(record.get('rssi'))<=0){
						cell.setStyle('background: red;')     
					}   
				   return value;
				}
			},{
				text:GSmartApp.Locales.mau[GSmartApp.Locales.currentLocale], 
				dataIndex: 'colorname',
				width:100,
				renderer: function(value, record, dataIndex, cell) {
					if(Number(record.get('rssi'))<=0){
						cell.setStyle('background: red;')     
					}   
				   return value;
				}
			},{
				text:GSmartApp.Locales.donvitinh[GSmartApp.Locales.currentLocale], 
				dataIndex: 'unitname',
				width:100,
				renderer: function(value, record, dataIndex, cell) {
					if(Number(record.get('rssi'))<=0){
						cell.setStyle('background: red;')     
					}   
				   return value;
				},
				summaryType: 'count'
			},{
				xtype: 'actioncolumn',
				width: 50,
				menuDisabled: true,
				sortable: false,
				items: [{
					iconCls: 'x-fa fas fa-trash',
					tooltip:GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale], 
					handler: 'onDelete'
				}]
			}
		],
		bind:{
			hidden:'{isTabEpc}',
		}
	},{
		layout:'hbox',
		margin:5,
		items:[{
			width:100,
			xtype:'button',
			text:  GSmartApp.Locales.btn_quaylai[GSmartApp.Locales.currentLocale],
			iconCls: 'x-fa fa-backward',
			handler: 'onBlack'
		},{
			flex:1
		},{
			width:100,
			xtype:'button',
			text:  GSmartApp.Locales.btn_luu[GSmartApp.Locales.currentLocale],
			iconCls: 'x-fa fa-save',
			handler: 'onSave',
			bind:{
				hidden:'{isNhapmoi}',
			}
		}]
	}]
});

