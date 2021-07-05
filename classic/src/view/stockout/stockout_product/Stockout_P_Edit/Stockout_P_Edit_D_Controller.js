Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Edit_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Edit_D_Controller',
	init: function() {
        
	},
	control:{
		'#btnTonKho':{
            click: 'onBtnTonKho'
        }
    },

    onBtnTonKho: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockid_link = viewModel.get('stockout.orgid_from_link');
		if(stockid_link == 0 || stockid_link == null || isNaN(stockid_link)){
			Ext.MessageBox.show({
				title: "Thông báo",
				msg: "Bạn cần chọn đơn vị xuất kho",
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
			return;
		}

        var StockoutD_Store = viewModel.getStore('StockoutD_Store');
        var data = StockoutD_Store.getData();
        var items = data.items;
        // console.log(items); // skuid_link
        var skuIdList = [];
        for(var i = 0; i<items.length; i++){
            var skuid_link = items[i].get('skuid_link');
            skuIdList.push(skuid_link);
        }
		// console.log(stockid_link);
        // console.log(skuIdList);

		var params = new Object();
		params.stockid_link = stockid_link;
		params.skuIdList = skuIdList;

		var mainView = Ext.getCmp('stockout_p_edit');
        if(mainView) mainView.setLoading(true);

		GSmartApp.Ajax.postJitin('/api/v1/warehouse/check_inStock', Ext.JSON.encode(params),
			function (success, response, options) {
				if(mainView) mainView.setLoading(false);
				var response = Ext.decode(response.responseText);
				if (success) {
					if (response.respcode == 200) {
						// console.log(response);
						for(var i = 0; i < response.data.length; i++){
							var obj = response.data[i];
							var rec = StockoutD_Store.findRecord('skuid_link', obj.skuid_link, 0, false, true, true);
							rec.set('so_luong_ton_kho', obj.totalpackage);
							StockoutD_Store.commitChanges();
							// console.log(rec);
						}
					} else {
						Ext.Msg.show({
							title: 'Thông báo',
							msg: response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				} else {
					Ext.Msg.show({
						title: 'Thông báo',
						msg: response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}

			})
    },

    onMenu_Stockout_P_Edit_D: function (grid, rowIndex, colIndex, item, e, record) {
		var m = this;
		var menu_grid = new Ext.menu.Menu({
			xtype: 'menu',
			anchor: true,
			//padding: 10,
			minWidth: 150,
			viewModel: {},
			items: [
				{
					text: 'Chi tiết chíp',
					itemId: 'btnMenu_Stockout_P_Edit_D_Chi_tiet',
					separator: true,
					margin: '10 0 0',
					// iconCls: 'x-fa fas fa-edit brownIcon',
					iconCls: 'x-fa fas fa-edit',
					handler: function () {
						// console.log(record);
						m.onEPCDetail(grid, rowIndex);
					},
				},
				{
					text: 'Xoá dòng hàng',
					itemId: 'btnMenu_Stockout_P_Edit_D_Delete',
					separator: true,
					margin: '10 0 0',
					// iconCls: 'x-fa fas fa-trash redIcon',
					iconCls: 'x-fa fas fa-trash',
					handler: function () {
						// console.log(record);
						m.onDeleteStockoutD(grid, rowIndex);
					}
				},
			]
		});
		// HERE IS THE MAIN CHANGE
		var position = [e.getX() - 10, e.getY() - 10];
		e.stopEvent();
		menu_grid.record = record;
		menu_grid.showAt(position);
	},
    onEPCDetail: function(grid, rowIndex, colIndex){
        var record = grid.store.getAt(rowIndex);
        var form =Ext.create({
            xtype: 'Stockout_EPC_Window',
            reference:'Stockout_EPC_Window'
        });
		var viewModel = form.getViewModel();
        viewModel.set('stockout_d',record);
        form.show();
	},
	onDeleteStockoutD: function (grid, rowIndex) {
		var me = this;
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var data = grid.getStore().getAt(rowIndex);

		Ext.Msg.show({
			title: 'Thông báo',
			msg: 'Bạn có chắc chắn xóa thành phẩm ' + data.get('skucode') + '?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			buttonText: {
				yes: 'Có',
				no: 'Không'
			},
			fn: function (btn) {
				if (btn === 'yes') {
					// Xoá, check id
					var id = data.get('id');
					if (isNaN(id) || id == null || id == 0) { // chưa có trong db
						me.deleteRow_Stockout_D(data);
					} else { // đã có trong db
						me.deleteRowDb_Stockout_D(data);
					}
				}
			}
		});
	},
	deleteRow_Stockout_D: function (data) {
		var me = this;
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var id = data.get('id');

		for (var i = 0; i < stockout_d.length; i++) {
			if (stockout_d[i].id == id) {
				stockout_d.splice(i, 1);
				break;
			}
		}
		var stockout_dStore = viewModel.getStore('StockoutD_Store');
		if (stockout_dStore) {
			stockout_dStore.removeAll();
			stockout_dStore.insert(0, stockout_d);
			stockout_dStore.commitChanges();
		}
		viewModel.set('stockout.stockout_d', stockout_d);
		// console.log(stockout);
	},
	deleteRowDb_Stockout_D: function (data) {
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var id = data.get('id');

		m.setLoading(true);

		var params = new Object();
		params.id = id;
		GSmartApp.Ajax.postJitin('/api/v1/stockout_d/stockoutd_delete', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				m.setLoading(false);
				if (success) {
					if (response.respcode == 200) {
						for (var i = 0; i < stockout_d.length; i++) {
							if (stockout_d[i].id == id) {
								stockout_d.splice(i, 1);
								break;
							}
						}
						var stockout_dStore = viewModel.getStore('StockoutD_Store');
						if (stockout_dStore) {
							stockout_dStore.removeAll();
							stockout_dStore.insert(0, stockout_d);
							stockout_dStore.commitChanges();
						}
						viewModel.set('stockout.stockout_d', stockout_d);
						// console.log(stockout);
					} else {
						Ext.Msg.show({
							title: 'Thông báo',
							msg: response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				} else {
					Ext.Msg.show({
						title: 'Thông báo',
						msg: response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}

			})
	},
	renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
	},

	onDItemEdit: function (editor, context, eOpts) {
		// console.log(context);
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var store = me.getStore();
		var stockoutD_data = context.record.data;

		if (context.value == "" || context.value == context.originalValue || isNaN(context.value)) {
			store.rejectChanges();
			return;
		}
		if (context.field == 'totalpackage') {
			stockoutD_data.totalpackage = parseFloat(stockoutD_data.totalpackage);
		}
		if (context.field == 'totalpackagecheck') {
			stockoutD_data.totalpackagecheck = parseFloat(stockoutD_data.totalpackagecheck);
		}
		store.commitChanges();
	},
})