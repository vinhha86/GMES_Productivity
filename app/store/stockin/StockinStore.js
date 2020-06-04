Ext.define('GSmartApp.store.stockin.StockinStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockinstore',

    data: [{
        id: 'lsnhapkhomoi',
        xtype: 'stockinlist',
        text: GSmartApp.Locales.nhapkhomoi[GSmartApp.Locales.currentLocale],
        icon: 'ico_shoppingcart.png',
		type:1,
		urlc:'nhapkhomoi',
		txt_create: GSmartApp.Locales.nhapkhomoi_themmoi[GSmartApp.Locales.currentLocale],
		create:'stockinnew',
		txt_edit: GSmartApp.Locales.nhapkhomoi_chitiet[GSmartApp.Locales.currentLocale],
		edit:'stockinnew'
    }, {
        id: 'lsnhaptunhacat',
        xtype: 'stockinlist',
        text: GSmartApp.Locales.nhaptunhacat[GSmartApp.Locales.currentLocale],
        icon: 'ico_cuthouse_color.png',
		type:2,
		urlc:'nhaptunhacat',
		txt_create: GSmartApp.Locales.nhaptunhacat_themmoi[GSmartApp.Locales.currentLocale],
		create:'stockinnew',
		txt_edit: GSmartApp.Locales.nhaptunhacat_chitiet[GSmartApp.Locales.currentLocale],
		edit:'stockinnew'
    }, {
        id: 'lsnhapdieuchuyen',
        xtype: 'stockinlist',
        text: GSmartApp.Locales.nhapdieuchuyen[GSmartApp.Locales.currentLocale],
        icon: 'ico_stockinmove_color.png',
		type:4,
		urlc:'nhapdieuchuyen',
		txt_create: GSmartApp.Locales.nhapdieuchuyen_themmoi[GSmartApp.Locales.currentLocale],
		create:'stockinnew',
		txt_edit: GSmartApp.Locales.nhapdieuchuyen_chitiet[GSmartApp.Locales.currentLocale],
		edit:'stockinnew'
    }, {
        id: 'lsnhaptugiacong',
        xtype: 'stockinlist',
        text: GSmartApp.Locales.nhaptugiacong[GSmartApp.Locales.currentLocale],
        icon: 'ico_outsource_color.png',
		type:3,
		urlc:'nhaptugiacong',
		txt_create: GSmartApp.Locales.nhaptugiacong_themmoi[GSmartApp.Locales.currentLocale],
		create:'stockinnew',
		txt_edit: GSmartApp.Locales.nhaptugiacong_chitiet[GSmartApp.Locales.currentLocale],
		edit:'stockinnew'
    },{
        id: 'lsnhapcapbu',
        xtype: 'stockinlist',
        text: GSmartApp.Locales.nhapcapbu[GSmartApp.Locales.currentLocale],
        icon: 'ico_stokinadd_color.png',
		type:5,
		urlc:'nhapcapbu',
		txt_create: GSmartApp.Locales.nhapcapbu_themmoi[GSmartApp.Locales.currentLocale],
		create:'stockinnew',
		txt_edit: GSmartApp.Locales.nhapcapbu_chitiet[GSmartApp.Locales.currentLocale],
		edit:'stockinnew'
    }, {
        id: 'lsnhapxavai',
        xtype: 'stockinlist',
        text: GSmartApp.Locales.nhapxavai[GSmartApp.Locales.currentLocale],
        icon: 'ico_backfromsoften_color.png',
		type:6,
		urlc:'nhapxavai',
		txt_create: GSmartApp.Locales.nhapxavai_themmoi[GSmartApp.Locales.currentLocale],
		create:'stockinnew',
		txt_edit: GSmartApp.Locales.nhapxavai_chitiet[GSmartApp.Locales.currentLocale],
		edit:'stockinnew'
    }]
});
