Ext.define('GSmartApp.store.personnel.Personnel_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.Personnel_Store',
	storeId: 'Personnel_Store',
	idProperty: 'idx',
	model: 'GSmartApp.model.personnel.PersonnelModel',
	sorters: [{
        direction: 'ASC',
        property: 'code'
	}],
	loadStore_byOrg(orgid_link, ismanager, isviewall){
		var params = new Object();
		params.orgid_link = orgid_link;
		params.ismanager = ismanager;
		params.isviewall = isviewall;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/personnel/getby_org',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				}
			}
		});
	}
});
