Ext.define('GSmartApp.view.invcheck.InvCheckNew', {
    extend: 'Ext.form.Panel',
	xtype:'invchecknew',
	controller: 'invchecknew',
	viewModel: {
        type: 'invchecknew'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
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
			 reference:'formInvCheck',
			 flex:1,
			 items:[{
				 layout:'hbox',
				 margin:2,
				 items: [{
					 xtype:'hiddenfield',
					 name:'id',
					 reference:'id',
				 },{
					 xtype:'hiddenfield',
					 name:'status'
				 },{
					 flex:1,
					 labelWidth:70,
					 xtype: 'textfield',
					 name:'invcheckcode',
					 reference:'invcheckcode',
					 fieldLabel: GSmartApp.Locales.sophieu[GSmartApp.Locales.currentLocale],
					 readOnly:true
				 }, {
					 flex:1,
					 margin:'0 5 0 0',
					 labelWidth:100,
					 xtype: 'datefield',
					 dateFormat:GSmartApp.util.State.get('dataFormat'),
					 name:'invcheckdatetime',
					 reference:'invcheckdatetime',
					 fieldLabel: GSmartApp.Locales.ngay_lapphieu[GSmartApp.Locales.currentLocale],
					 readOnly:true
				 },{
					 flex:2,
					 margin:'0 5 0 0',
					 name:'orgcheckid_link',
					 reference:'orgcheckid_link',
					 labelWidth:90,
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.kho_kiemke[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 store:'WareHouseStore',
					 displayField: 'name',
					 valueField: 'id',
					 allowBlank: false,
					 required: true,
					 bind:{
						 readOnly:'{isEdit}'
					 }
				 }]
			 },{
				 layout:'hbox',
				 margin:2,
				 items:[{
					 flex:2,
					 margin:'0 5 0 0',
					 labelWidth:70,
					 name:'p_skuid_link',
					 reference:'productcode',
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.sanpham[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 store:'SkuStore',
					 displayField: 'name',
					 valueField: 'id',
					 bind:{
						 readOnly:'{isEdit}'
					 }
				 },{
					 flex:2,
					 margin:'0 5 0 0',
					 labelWidth:90,
					 name:'bossid_link',
					 reference:'bossid',
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.chuhang[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 store:'BossStore',
					 displayField: 'name',
					 valueField: 'id',
					 bind:{
						 readOnly:'{isEdit}'
					 }
				 }]
			 },{
				 layout:'hbox',
				 margin:2,
				 items:[{
					 flex:1,
					 margin:'0 5 0 0',
					 name:'extrainfo',
					 labelWidth:70,
					 xtype: 'textfield',
					 fieldLabel: GSmartApp.Locales.ghichu[GSmartApp.Locales.currentLocale],
					 bind:{
						 readOnly:'{isEdit}'
					 }
				 }]
			 }]
		 
		 },{
			 width:240,
			 layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			 items:[{
				 id:'invCheckQrcode',
			 }]
		 }]
		 
	},{
		layout:'hbox',
		items: [{
			 margin:'0 5 0 5',
			 xtype:'button',
			 iconCls: 'x-fa fa-angle-double-up',
			  bind:{
				 hidden:'{IsformMaster}'
			 },
			 handler: 'onHidden'
		},{
			 margin:'0 5 0 5',
			 xtype:'button',
			 iconCls: 'x-fa fa-angle-double-down',
			 bind:{
				 hidden:'{!IsformMaster}'
			 },
			 handler: 'onHidden'
		},{
			flex:1
		 },{
			 margin:'0 5 0 0',
			 xtype:'button',
			 bind:{
				 hidden:'{isEdit}'
			 },
			 text: GSmartApp.Locales.btn_taosolieukiemke[GSmartApp.Locales.currentLocale],
			 iconCls: 'x-fa fa-plus',
			 handler: 'onInvCheckCreate'
		 },{
			 margin:'0 5 0 0',
			 xtype:'button',
			 bind:{
				 hidden:'{!isEdit}'
			 },
			 text: 'Load dữ liệu',
			 handler: 'onInvCheckLoad'
		 }]
	},{
		html:'<hr>'
	},{
		xtype:'grid',
		reference:'gridInvCheck',
		columnLines:true,
		rowLines:true,
		flex:1,
        lockedViewConfig: {
            scroll: 'horizontal'
        },
		//plugins: {
		//	gridsummaryrow: true
		//},
		store:'GSmartApp.store.invcheck.InvCheckDetailStore',
		columns: [{
				text:GSmartApp.Locales.ma_vattu[GSmartApp.Locales.currentLocale], 
				dataIndex: 'skucode',
				flex:1,
				minWidth:120,
				summaryRenderer:function (grid, context) {
					return 'Tổng cộng';
				}
			},
			{
				text:GSmartApp.Locales.ten_vattu[GSmartApp.Locales.currentLocale], 
				dataIndex: 'skuname',
				flex:1,
				minWidth:120
			},{
				text:GSmartApp.Locales.donvitinh[GSmartApp.Locales.currentLocale], 
				dataIndex: 'unitname',
				width:100,
			},{
				text:GSmartApp.Locales.so_sosach[GSmartApp.Locales.currentLocale], 
				columns:[{
					xtype: 'numbercolumn',
					format:'0,000',
					text: GSmartApp.Locales.soluong[GSmartApp.Locales.currentLocale], 
					dataIndex: 'ydsorigin',
					width:85,
					align:'right',
					summary: 'sum'
				},{
					xtype: 'numbercolumn',
					format:'0,000',
					text: GSmartApp.Locales.giatri[GSmartApp.Locales.currentLocale], 
					dataIndex: 'unitprice',
					width:80,
					align:'right',
					summary: 'sum'
				},{
					xtype: 'numbercolumn',
					format:'0,000',
					text: GSmartApp.Locales.thanhtien[GSmartApp.Locales.currentLocale], 
					dataIndex: 'totalamount',
					width:105,
					align:'right',
					summary: 'sum'
				}]
			},{
				text:GSmartApp.Locales.so_thucte[GSmartApp.Locales.currentLocale], 
				columns:[{
					xtype: 'numbercolumn',
					format:'0,000',
					text: GSmartApp.Locales.soluong[GSmartApp.Locales.currentLocale], 
					dataIndex: 'ydscheck',
					width:85,
					align:'right',
					summary: 'sum'
				},{
					xtype: 'numbercolumn',
					format:'0,000',
					text: GSmartApp.Locales.giatri[GSmartApp.Locales.currentLocale], 
					dataIndex: 'unitprice',
					width:80,
					align:'right',
					summary: 'sum'
				},{
					xtype: 'numbercolumn',
					format:'0,000',
					text: GSmartApp.Locales.thanhtien[GSmartApp.Locales.currentLocale], 
					dataIndex: 'totalamountcheck',
					width:105,
					align:'right',
					summary: 'sum'
				}]
			},{
				text:GSmartApp.Locales.chenhlech[GSmartApp.Locales.currentLocale], 
				columns:[{
					xtype: 'numbercolumn',
					format:'0,000',
					text: GSmartApp.Locales.soluong[GSmartApp.Locales.currentLocale], 
					dataIndex: 'ydsdiff',
					width:85,
					align:'right',
					summary: 'sum'
				},{
					xtype: 'numbercolumn',
					format:'0,000',
					text: GSmartApp.Locales.giatri[GSmartApp.Locales.currentLocale], 
					dataIndex: 'unitprice',
					width:80,
					align:'right',
					summary: 'sum'
				},{
					xtype: 'numbercolumn',
					format:'0,000',
					text: GSmartApp.Locales.thanhtien[GSmartApp.Locales.currentLocale], 
					dataIndex: 'totalamountdiff',
					width:105,
					align:'right',
					summary: 'sum'
				}]
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
		]
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
		//},{
		//	width:100,
		//	xtype:'button',
		//	text:  GSmartApp.Locales.btn_luu[GSmartApp.Locales.currentLocale],
		//	handler: 'onSave'
		}]
	}]
});

