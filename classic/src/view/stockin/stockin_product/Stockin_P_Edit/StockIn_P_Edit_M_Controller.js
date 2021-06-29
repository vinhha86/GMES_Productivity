Ext.define('GSmartApp.view.stockin.StockIn_P_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockIn_P_Edit_M_Controller',
	init: function() {
		var viewModel = this.getViewModel();

		var userStore = viewModel.getStore('UserStore');
		userStore.loadStore();

		var StockinTypeStore = viewModel.getStore('StockinTypeStore');
		StockinTypeStore.loadStore(21, 30);
	},
	control:{
		'#linegiaohang': {
			keypress: 'onEnterLinegiaohang'
		},
		'#btnTimPOLine': {
			click: 'onTimLine'
		},
		'#btnTimStockout': {
			click: 'onTimStockout'
		}
    },
	onEnterLinegiaohang: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimLine();
		}
	},
	onTimStockout: function () {
		var me = this;
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách phiếu xuất kho',
			closeAction: 'destroy',
			width: 1100,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_P_Select',
				viewModel: {
					data: {
						status: 1 //Da duyet
					}
				}				
			}]
		});
		form.show();

		form.down('#Stockout_P_Select').on('Chon', function (data) {
			console.log(data);
			me.onLoadStockoutData(data);
			form.close();
		})
	},	
	onLoadStockoutData: function(data){
		var viewmodel = this.getViewModel();
		viewmodel.set('stockin.stockoutid_link', data.id);
		viewmodel.set('stockin.stockout_code', data.stockoutcode);
		var list = [];
		for(var i=0; i<data.stockout_d.length; i++){
			var data_stockout = data.stockout_d[i];
			var stockind_new = new Object();
			stockind_new.id = null;
			stockind_new.skucode = data_stockout.skucode;
			stockind_new.skuname = data_stockout.skuname;
			stockind_new.sku_product_code = data_stockout.product_code;
			// stockind_new.product_name = data.productname;
			stockind_new.p_skuid_link = data_stockout.productid_link;
			stockind_new.color_name = data_stockout.color_name;
			stockind_new.size_name = data_stockout.size_name;
			stockind_new.totalpackage = data_stockout.totalpackagecheck;
			stockind_new.unitid_link = data_stockout.unitid_link;
			stockind_new.unit_name = data_stockout.unitname;
			stockind_new.stockoutid_link = data_stockout.id;
			stockind_new.colorid_link = data_stockout.color_id;
			stockind_new.skuid_link = data_stockout.skuid_link;
			stockind_new.sizeid_link = data_stockout.sizeid_link;

			var list_epc = [];
			for(var k=0; k<data_stockout.stockout_packinglist.length; k++){
				var stockout_pklist = data_stockout.stockout_packinglist[k];
				var epc_new = new Object();

				epc_new.id = null;
				epc_new.skuid_link = stockout_pklist.skuid_link;
				epc_new.skutypeid_link = stockout_pklist.skutypeid_link;
				epc_new.colorid_link = stockout_pklist.colorid_link;
				epc_new.unitid_link = stockout_pklist.unitid_link;
				epc_new.lotnumber = stockout_pklist.lotnumber;
				epc_new.packageid = stockout_pklist.packageid;

				epc_new.ydsorigin = stockout_pklist.ydsorigin;
				epc_new.met_origin = stockout_pklist.met_origin;
				epc_new.width = stockout_pklist.width;
				epc_new.ydscheck = null;
				epc_new.met_check = null;
				epc_new.width_check = null;

				epc_new.netweight = stockout_pklist.netweight;
				epc_new.grossweight = stockout_pklist.grossweight;
				epc_new.m3 = stockout_pklist.m3;
				epc_new.epc = stockout_pklist.epc;
				epc_new.barcode = stockout_pklist.barcode;

				epc_new.rssi = 0;
				epc_new.status = -1;

				list_epc.push(epc_new);
			}
			stockind_new.stockin_packinglist = list_epc;

			list.push(stockind_new);
		}

		viewmodel.set('stockin.stockin_d', list);
		var store = viewmodel.getStore('StockinD_Store');
		store.removeAll();
		store.setData(list);
	},		
	onTimLine: function () {
		var me = this;
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách line giao hàng',
			closeAction: 'destroy',
			width: 1100,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_POLINE',
				viewModel: {
					data: {
						po_buyer: grid.down('#linegiaohang').getValue()
					}
				}
			}]
		});
		form.show();

		form.down('#Stockout_POLINE').on('Chon', function (data) {
			me.onLoadPOLineData(data);
			form.close();
		})
	},	
	onLoadPOLineData: function(data){ console.log(data);
		var viewModel = this.getViewModel();
		viewModel.set('stockin.pcontract_poid_link', data.id);
		viewModel.set('stockin.contract_number', data.po_buyer);
		var params = new Object();
		params.pcontract_poid_link = data.id;

		GSmartApp.Ajax.post('/api/v1/pcontract_po/getall_sku_byline', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) {
					var list = [];
					for(var i=0; i<response.data.length; i++){
						var data = response.data[i];
						var stockind_new = new Object();
						stockind_new.id = null;
						stockind_new.skucode = data.skuCode;
						stockind_new.skuname = data.skuName;
						stockind_new.sku_product_code = data.productcode;
						stockind_new.product_name = data.productname;
						stockind_new.p_skuid_link = data.productid_link;
						stockind_new.color_name = data.mauSanPham;
						stockind_new.size_name = data.coSanPham;
						stockind_new.totalpackage = data.pquantity_total;
						stockind_new.unitid_link = data.unitid_link;
						stockind_new.unit_name = data.unitname;
						stockind_new.stockoutid_link = null;
						stockind_new.colorid_link = data.color_id;
						stockind_new.skuid_link = data.skuid_link;
						stockind_new.sizeid_link = data.sizeid_link;

						list.push(stockind_new);
					}

					viewModel.set('stockin.stockin_d', list);
					var store = viewModel.getStore('StockinD_Store');
					store.removeAll();
					store.setData(list);
				}
			})
	},	
})