Ext.define('GSmartApp.view.stockin.StockInProduct', {
    extend: 'Ext.form.Panel',
	xtype:'stockinproduct',
    controller: 'stockinproduct',
	viewModel: {
        type: 'stockinproduct'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	defaultFocus: 'stockincode',
	qrcode:null,
	items:[{
		 margin:5,
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
				 layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				},
				 margin:2,
				 items: [{
					 xtype:'hiddenfield',
					 name:'id'
				 },{
					 xtype:'hiddenfield',
					 name:'status'
				 },{
					 flex:1,
					 labelWidth:130,
					 xtype: 'textfield',
					 name:'stockincode',
					 reference:'stockincode',
					 readOnly:true,
					 fieldLabel: GSmartApp.Locales.sophieu[GSmartApp.Locales.currentLocale]
				 },{
					 width:5
				 }, {
					 flex:1,
					 xtype: 'datefield',
					 dateFormat:'d/m/Y',
					 name:'stockindate',
					 fieldLabel: GSmartApp.Locales.ngay_lapphieu[GSmartApp.Locales.currentLocale]
				 },{
					 width:5
				 },{
					 flex:2,
					 labelWidth:130,
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
					 allowBlank: false,
					 required: true,
					 name:'orgid_from_link',
					 labelWidth:130,
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.donvi_caphang[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 store:'OrgStore',
					 displayField: 'name',
					 valueField: 'id'
				 },{
					 width:5
				 },{
					 flex:1,
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
					 name:'shipperson',
					 labelWidth:130,
					 xtype: 'textfield',
					 fieldLabel: GSmartApp.Locales.nguoigiaohang[GSmartApp.Locales.currentLocale]
				 },{
					 width:5
				 },{
					 flex: 1,
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
			//	 id:'stockinPQrcode',
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
			 /*bind:{
				disabled:'{!isStart}',
				userCls:'{clsbtnStop}'
			}*/
		  },{
			  flex:1
		  },{
			 margin:'0 5 5 5',
			 text: "Sản phẩm khác mã SKU",
			 iconCls: 'x-fa fa-archive',
			 xtype: 'button',
			 handler:'onProductError',
			 bind:{
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
				width:100
			},{
				text:GSmartApp.Locales.donvitinh[GSmartApp.Locales.currentLocale], 
				dataIndex: 'unitname',
				width:100
			},{
				xtype: 'numbercolumn',
				format:'0,000',
				text: GSmartApp.Locales.sokien[GSmartApp.Locales.currentLocale], 
				dataIndex: 'totalpackage',
				width:120,
				align:'right',
				summary: 'sum',
			},{
				width: 40,
				hideable: false,
				cell: {
						tools:[{
						iconCls: 'fas fa-align-justify',
						tooltip:GSmartApp.Locales.packinglist[GSmartApp.Locales.currentLocale], 
						handler: 'onPackinglist'
					}]
					
				}
			}
		],
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
		}],
		flex:1,
		columns: [{
				text:GSmartApp.Locales.ma_vattu[GSmartApp.Locales.currentLocale], 
				dataIndex: 'skucode',
				flex:1,
				summaryRenderer:function (grid, context) {
					return 'Tổng số';
				}
			},
			{
				text:GSmartApp.Locales.ten_vattu[GSmartApp.Locales.currentLocale], 
				dataIndex: 'skuname',
				flex:1
			},{
				text:GSmartApp.Locales.epc[GSmartApp.Locales.currentLocale], 
				dataIndex: 'epc',
				flex:1,
				summary: 'count',
			},{
				text:GSmartApp.Locales.mau[GSmartApp.Locales.currentLocale], 
				dataIndex: 'colorname',
				width:100
			},{
				text:GSmartApp.Locales.donvitinh[GSmartApp.Locales.currentLocale], 
				dataIndex: 'unitname',
				width:100
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
				/*width: 40,
				hideable: false,
				cell: {
					tools:[{
						iconCls: 'fas fa-trash',
						tooltip:GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale], 
						handler: 'onDelete'
					}]
				}*/
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
			handler: 'onSave'
		}]
	}]
});

