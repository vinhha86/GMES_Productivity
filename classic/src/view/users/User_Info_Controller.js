Ext.define('GSmartApp.view.users.User_Info_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.User_Info_Controller',
	init: function() {
		var listidtype = "4,8,9,13";
		var OrgStore = this.getViewModel().getStore('OrgStore');
		OrgStore.loadStore_allchildren_byorg(listidtype);
	}
})