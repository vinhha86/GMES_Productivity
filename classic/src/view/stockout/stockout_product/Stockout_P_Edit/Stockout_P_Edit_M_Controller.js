Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Edit_M_Controller',
	init: function() {
		var viewModel = this.getViewModel();

		var UserStore = viewModel.getStore('UserStore');
		if(UserStore) UserStore.loadStore();
		var StockoutTypeStore = viewModel.getStore('StockoutTypeStore');
		if(StockoutTypeStore) StockoutTypeStore.loadStore();
	},
	control:{
		'#linegiaohang': {
			keypress: 'onEnterLinegiaohang'
		},
		'#btnTimPOLine': {
			click: 'onTimLine'
		},
		'#lenhXuatKhoSearch': {
			keypress: 'onEnterTimLenhXuatKho'
		},
		'#btnTimLenhXuatKho': {
			click: 'onTimLenhXuatKho'
		},
    },

	onEnterLinegiaohang: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimLine();
		}
	},
	onTimLine: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
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
				xtype: 'Stockin_POLINE_Main',
				viewModel: {
					data: {
						po_buyer: grid.down('#linegiaohang').getValue()
					}
				}
			}]
		});
		form.show();

		form.down('#Stockin_POLINE_Main').on('Chon', function (select, poData) {
			// console.log(select);
			// console.log(poData);
			viewModel.set('stockout.pcontract_poid_link', poData.id);
			viewModel.set('stockout.contract_number', poData.po_buyer);

			// me.onLoadPOLineData(data);

			var StockoutD_Store = viewModel.getStore('StockoutD_Store');
			StockoutD_Store.removeAll();
			viewModel.set('stockout.stockout_d', []);
			// viewModel.set('stockout.porderid_link', null);

			var list = [];
			for(var i=0; i<select.length; i++){
				var data = select[i].data;
				var stockoutd_new = new Object();
				stockoutd_new.id = null;
				stockoutd_new.skucode = data.skuCode;
				stockoutd_new.skuname = data.skuName;
				stockoutd_new.sku_product_code = data.productcode;
				stockoutd_new.product_name = data.productname;
				stockoutd_new.p_skuid_link = data.productid_link;
				stockoutd_new.color_name = data.mauSanPham;
				stockoutd_new.size_name = data.coSanPham;
				stockoutd_new.colorid_link = data.color_id;
				stockoutd_new.skuid_link = data.skuid_link;
				stockoutd_new.sizeid_link = data.sku.size_id;
				stockoutd_new.totalpackage = data.so_luong_yeu_cau == null ? 0 : data.so_luong_yeu_cau;
				stockoutd_new.totalpackagecheck = data.so_luong_yeu_cau == null ? 0 : 0;
				list.push(stockoutd_new);
			}

			viewModel.set('stockout.stockout_d', list);
			var store = viewModel.getStore('StockoutD_Store');
			store.removeAll();
			// store.setData(list);
			store.insert(0, list);
			store.commitChanges();

			form.close();
			// console.log(stockout);
		})
	},
	onTaiSanPham: function(data){
		var viewModel = this.getViewModel();
		viewModel.set('stockout.pcontract_poid_link', data.id);
		viewModel.set('stockout.contract_number', data.po_buyer);
		var params = new Object();
		params.pcontract_poid_link = data.id;

		var mainView = Ext.getCmp('stockout_p_edit');
        if(mainView) mainView.setLoading(true);

		GSmartApp.Ajax.post('/api/v1/pcontract_po/getall_sku_byline', Ext.JSON.encode(params),
			function (success, response, options) {
				if(mainView) mainView.setLoading(false);
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) {
					var list = [];
					for(var i=0; i<response.data.length; i++){
						var data = response.data[i];
						// console.log(data);
						var stockoutd_new = new Object();
						stockoutd_new.id = null;
						stockoutd_new.skucode = data.skucode;
						stockoutd_new.skuname = data.skuName;
						stockoutd_new.product_code = data.productcode;
						stockoutd_new.product_name = data.productname;
						stockoutd_new.p_skuid_link = data.productid_link;
						stockoutd_new.color_name = data.mauSanPham;
						stockoutd_new.size_name = data.coSanPham;
						stockoutd_new.totalpackage = data.pquantity_total;
						stockoutd_new.unitid_link = data.unitid_link;
						stockoutd_new.unit_name = data.unitname;
						stockoutd_new.stockoutid_link = null;
						stockoutd_new.colorid_link = data.color_id;
						stockoutd_new.skuid_link = data.skuid_link;
						stockoutd_new.sizeid_link = data.sizeid_link;

						list.push(stockoutd_new);
					}

					viewModel.set('stockout.stockout_d', list);
					var store = viewModel.getStore('StockoutD_Store');
					store.removeAll();
					store.setData(list);
				}
			})
	},
	onEnterTimLenhXuatKho: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimLenhXuatKho();
		}
	},
	onTimLenhXuatKho: function(){
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var lenhXuatKhoSearch = viewModel.get('lenhXuatKhoSearch');
		console.log(stockout);
		console.log(lenhXuatKhoSearch);
		return;
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: '90%',
			width: '90%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách lệnh xuất kho',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_P_Stockout_order_Main_View',
				viewModel: {
					data: {
						stockout: stockout,
						lenhXuatKhoSearch: lenhXuatKhoSearch,
					}
				}
			}]
		});
		form.show();

		// form.down('#Stockin_POLINE_Main').on('Chon', function (select, poData) {
		// 	// console.log(select);
		// 	// console.log(poData);
		// 	viewModel.set('stockout.pcontract_poid_link', poData.id);
		// 	viewModel.set('stockout.contract_number', poData.po_buyer);

		// 	// me.onLoadPOLineData(data);

		// 	var StockoutD_Store = viewModel.getStore('StockoutD_Store');
		// 	StockoutD_Store.removeAll();
		// 	viewModel.set('stockout.stockout_d', []);
		// 	// viewModel.set('stockout.porderid_link', null);

		// 	var list = [];
		// 	for(var i=0; i<select.length; i++){
		// 		var data = select[i].data;
		// 		var stockoutd_new = new Object();
		// 		stockoutd_new.id = null;
		// 		stockoutd_new.skucode = data.skuCode;
		// 		stockoutd_new.skuname = data.skuName;
		// 		stockoutd_new.sku_product_code = data.productcode;
		// 		stockoutd_new.product_name = data.productname;
		// 		stockoutd_new.p_skuid_link = data.productid_link;
		// 		stockoutd_new.color_name = data.mauSanPham;
		// 		stockoutd_new.size_name = data.coSanPham;
		// 		stockoutd_new.colorid_link = data.color_id;
		// 		stockoutd_new.skuid_link = data.skuid_link;
		// 		stockoutd_new.sizeid_link = data.sku.size_id;
		// 		stockoutd_new.totalpackage = data.so_luong_yeu_cau == null ? 0 : data.so_luong_yeu_cau;
		// 		stockoutd_new.totalpackagecheck = data.so_luong_yeu_cau == null ? 0 : 0;
		// 		list.push(stockoutd_new);
		// 	}

		// 	viewModel.set('stockout.stockout_d', list);
		// 	var store = viewModel.getStore('StockoutD_Store');
		// 	store.removeAll();
		// 	// store.setData(list);
		// 	store.insert(0, list);
		// 	store.commitChanges();

		// 	form.close();
		// 	// console.log(stockout);
		// })
	}
})