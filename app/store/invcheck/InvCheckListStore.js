Ext.define('GSmartApp.store.invcheck.InvCheckListStore', {
    extend: 'Ext.data.Store',
    alias: 'store.invcheckliststore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'invcheckcode',  type: 'string'},
		{
			name: 'invcheckdatetime',
			convert: function (value) {
				 var date =  new Date(value)
				 return date.toLocaleDateString(GSmartApp.util.State.get('dataFormatList'));
			 }
		},
		{name: 'orgcheck_code',  type: 'string'},
		{name: 'orgcheck_name',  type: 'string'},
		{name: 'user_name',  type: 'string'},
		{
			name: 'status',
			convert: function (value) {
				 if(value==1){
					return GSmartApp.Locales.ketthuc_kiemke[GSmartApp.Locales.currentLocale];
				 }else{
					return GSmartApp.Locales.dang_kiemke[GSmartApp.Locales.currentLocale];
				}
			 }
		},
	]
});
