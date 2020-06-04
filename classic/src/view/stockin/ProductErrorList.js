Ext.define('GSmartApp.view.stockin.ProductErrorList', {
    extend: 'GSmartApp.view.stockin.StockinPackingList',
	xtype:'producterrorlist',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	items:[{
		flex:1,
		xtype:'grid',
		reference:'gridPackinglist',
		store:'PackinglistStore',
		columns: [{
			text:GSmartApp.Locales.ma_vattu[GSmartApp.Locales.currentLocale], 
			dataIndex: 'skucode',
			flex:1
		},
		{
			text:GSmartApp.Locales.ten_vattu[GSmartApp.Locales.currentLocale], 
			dataIndex: 'skuname',
			flex:1
		},{
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

