Ext.define('GSmartApp.store.stock.StockTreeStore', {
	extend: 'Ext.data.TreeStore',
	alias: 'store.StockTreeStore',
	idProperty: 'idString',
	fields: [
		'id',
		'idString',
		'name',
	],
	expanded: true,
	loadStore: function () {
		var me = this;
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/stock/stockmenu_tree',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'children'
			}
		});
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					this.fireEvent('logout');
				}
			}
		});
	},
});
