Ext.define('GSmartApp.store.warehouse.WarehouseCheckStore', {
	extend: 'Ext.data.Store',
	alias: 'store.WarehouseCheckStore',
	storeId: 'WarehouseCheckStore',
	model: 'GSmartApp.model.warehouse.WarehouseCheckModel',
	// sorters: {
	// 	direction: 'ASC',
	// 	property: 'material_product_code'
	// },
	loadstore_ByStockoutOrderD: function (stockoutorderdid_link) {
		var params = new Object();
		params.stockoutorderdid_link = stockoutorderdid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getWarehouseCheckByStockoutOrderD',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadstore_ByStockoutOrderD_async: function (stockoutorderdid_link) {
		var params = new Object();
		params.stockoutorderdid_link = stockoutorderdid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getWarehouseCheckByStockoutOrderD',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
	},
});
