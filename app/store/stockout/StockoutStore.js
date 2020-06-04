Ext.define('GSmartApp.store.stockout.StockoutStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockoutstore',

    data: [{
        id: 'lsxuatxavai',
        xtype: 'stockoutlist',
        text: GSmartApp.Locales.xuatxavai[GSmartApp.Locales.currentLocale],
        icon: 'ico_rollout_color.png',
		type:1,
		urlc:'xuatxavai',
		create:'stockoutnew',
		txt_create:GSmartApp.Locales.xuatxavai[GSmartApp.Locales.currentLocale],
		edit:'stockoutnew',
		txt_edit:GSmartApp.Locales.xuatxavai[GSmartApp.Locales.currentLocale]
    }, {
        id: 'lsxuatnhacat',
        xtype: 'stockoutlist',
        text: GSmartApp.Locales.xuatsangnhacat[GSmartApp.Locales.currentLocale],
        icon: 'ico_cuthouse_color.png',
		type:1,
		urlc:'xuatnhacat',
		create:'stockoutnew',
		txt_create:GSmartApp.Locales.xuatsangnhacat[GSmartApp.Locales.currentLocale],
		edit:'stockoutnew',
		txt_edit:GSmartApp.Locales.xuatsangnhacat[GSmartApp.Locales.currentLocale]
    }, {
        id: 'lsxuatdieuchuyen',
        xtype: 'stockoutlist',
        text: GSmartApp.Locales.xuatdieuchuyen[GSmartApp.Locales.currentLocale],
        icon: 'ico_stockinmove_color.png',
		type:3,
		urlc:'xuatdieuchuyen',
		create:'stockoutnew',
		txt_create:GSmartApp.Locales.xuatdieuchuyen[GSmartApp.Locales.currentLocale],
		edit:'stockoutnew',
		txt_edit:GSmartApp.Locales.xuatdieuchuyen[GSmartApp.Locales.currentLocale]
    }, {
        id: 'lsxuatgiacong',
        xtype: 'stockoutlist',
        text: GSmartApp.Locales.xuatgiacong[GSmartApp.Locales.currentLocale],
        icon: 'ico_outsource_color.png',
		type:4,
		urlc:'xuatgiacong',
		create:'stockoutnew',
		txt_create:GSmartApp.Locales.xuatgiacong[GSmartApp.Locales.currentLocale],
		edit:'stockoutnew',
		txt_edit:GSmartApp.Locales.xuatgiacong[GSmartApp.Locales.currentLocale]
    },{
        id: 'lsxuattrancc',
        xtype: 'stockoutlist',
        text: GSmartApp.Locales.xuattrancc[GSmartApp.Locales.currentLocale],
        icon: 'ico_backtoprovider_color.png',
		type:5,
		urlc:'xuattrancc',
		create:'stockoutnew',
		txt_create:GSmartApp.Locales.xuattrancc[GSmartApp.Locales.currentLocale],
		edit:'stockoutnew',
		txt_edit:GSmartApp.Locales.xuattrancc[GSmartApp.Locales.currentLocale]
    }, {
        id: 'lsxuatmau',
        xtype: 'stockoutlist',
        text: GSmartApp.Locales.xuatmau[GSmartApp.Locales.currentLocale],
        icon: 'ico_stockouttest_color.png',
		type:6,
		urlc:'xuatmau',
		create:'stockoutnew',
		txt_create:GSmartApp.Locales.xuatmau[GSmartApp.Locales.currentLocale],
		edit:'stockoutnew',
		txt_edit:GSmartApp.Locales.xuatmau[GSmartApp.Locales.currentLocale]
    },{
        id: 'lsxuattieuhuy',
        xtype: 'stockoutlist',
        text: GSmartApp.Locales.xuattieuhuy[GSmartApp.Locales.currentLocale],
        icon: 'ico_distroy_color.png',
		type:7,
		urlc:'xuattieuhuy',
		create:'stockoutnew',
		txt_create:GSmartApp.Locales.xuatmau[GSmartApp.Locales.currentLocale],
		edit:'stockoutnew',
		txt_edit:GSmartApp.Locales.xuatmau[GSmartApp.Locales.currentLocale]
    }]
});
