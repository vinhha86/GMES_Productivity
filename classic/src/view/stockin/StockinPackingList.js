Ext.define('GSmartApp.view.stockin.StockinPackingList', {
    extend: 'Ext.form.Panel',
	controller: 'stockinpackinglist',
	xtype:'stockinpackinglist',
	stockind_record:null,
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [{
		xtype:'form',
		reference:'formstockinpackinglist',
		layout:'hbox',
		margin:5,
		items:[{
			flex:1,
			xtype: 'textfield',
			name: 'skucode',
			fieldLabel: GSmartApp.Locales.ma_vattu[GSmartApp.Locales.currentLocale],
			labelWidth:130,
			readOnly:true
		},{
			margin:'0 0 0 5',
			xtype: 'textfield',
			name: 'skuname',
			fieldLabel: GSmartApp.Locales.ten_vattu[GSmartApp.Locales.currentLocale],
			labelWidth:130,
			flex:1,
			readOnly:true
		}]
	},{
		html:'<hr>'
	},{
		flex:1,
		xtype:'grid',
		reference:'gridPackinglist',
		store:'PackinglistStore',
		columns: [{
			text:GSmartApp.Locales.epc[GSmartApp.Locales.currentLocale],
			flex:1,
			dataIndex:'epc'
		},{
			text:GSmartApp.Locales.mau[GSmartApp.Locales.currentLocale], 
			dataIndex: 'colorname',
			width:100
		},{
			text:GSmartApp.Locales.donvitinh[GSmartApp.Locales.currentLocale], 
			dataIndex: 'unitname',
			width:100
		}]
	}],
	 buttons: [ {
        text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
		iconCls: 'x-fa fa-window-close',
        handler: 'onPackingListClose'
    }]
});

