Ext.define('GSmartApp.store.porder.POrder_ListStore', {
	extend: 'Ext.data.Store',
	storeId: 'POrder_ListStore',
	alias: 'store.POrder_ListStore',
	groupField: 'granttoorgname',
	pageSize: 25,
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'ordercode', type: 'string' },
		{ name: 'stylebuyer', type: 'string' },
		{ name: 'buyername', type: 'string' },
		{ name: 'po_buyer', type: 'string' },
		{ name: 'vendorname', type: 'string' },
		{ name: 'po_vendor', type: 'string' },
		{ name: 'orderdate', type: 'date', dateFormat: 'c' },
		{ name: 'golivedate', type: 'date', dateFormat: 'c' },
		{ name: 'totalorder', type: 'int' },
		{ name: 'productiondate_plan', type: 'date', dateFormat: 'c' },
		{ name: 'startDatePlan', type: 'date', dateFormat: 'c' },
		// {
		// name: 'status', type: 'int',
		// convert: function (value) {
		//     switch(value){
		// 		case -1: return 'Chưa chốt PO';
		// 		case 0: return 'Chưa phân chuyền';
		// 		case 1: return 'Đã phân chuyền';
		// 		case 2: return 'Chuẩn bị SX';
		// 		case 3: return 'Công đoạn phụ';
		// 		case 4: return 'Đang sản xuất';
		// 		case 5: return 'Sản xuất xong';
		// 		case 6: return 'Nhập kho xong';
		// 		default: return '';
		// 	}
		// }
		// },
		{ name: 'statusName', type: 'string' },
		{ name: 'granttoorgname', type: 'string' },
	],
	loadbyOffer: function (pcontract_poid_link) {
		var params = new Object();
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porder/getby_po_line',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					this.fireEvent('logout');
				}
			}
		});
	},
	loadStore: function () {
		var params = new Object();

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderlist/getall',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					this.fireEvent('logout');
				}
			}
		});
	},
	loadStoreBySearch: function (pobuyer, povendor, style, contractcode,
		buyerid, vendorid, factoryid,
		golivedatefrom, golivedateto,
		status, limit, page) {
		var me = this;
		var params = new Object();
		params.pobuyer = pobuyer;
		params.povendor = povendor;
		params.style = style;
		params.contractcode = contractcode;
		params.buyerid = buyerid;
		params.vendorid = vendorid;
		params.factoryid = factoryid;
		params.golivedatefrom = golivedatefrom;
		params.golivedateto = golivedateto;
		params.status = status;
		me.pageSize = limit;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderlist/getallbysearch',
			paramsAsJson: true,
			noCache: false,
			timeout: 60000,
			extraParams: params,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data',
				// totalProperty: 'totalCount'
			}
		});
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				this.fireEvent('loadStoreBySearch_Done');
				if (!success) {
					this.fireEvent('logout');
				}
			}
		});
	},
	loadStoreByPordercode: function (pordercode, granttoorgid_link) {
		var me = this;
		var params = new Object();
		params.pordercode = pordercode;
		params.granttoorgid_link = granttoorgid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderlist/getbypordercode',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
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
	loadStoreByPordercode_Async: function (pordercode, granttoorgid_link) {
		var me = this;
		var params = new Object();
		params.pordercode = pordercode;
		params.granttoorgid_link = granttoorgid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderlist/getbypordercode',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
	},
	POrderPOLine_loadby_po: function (pcontract_poid_link) {
		var me = this;
		var params = new Object();
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderpoline/getporder_by_po',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					this.fireEvent('logout');
				}
			}
		});
	}
});
