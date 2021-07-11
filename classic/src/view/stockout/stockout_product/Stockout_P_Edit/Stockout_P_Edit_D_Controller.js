Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Edit_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Edit_D_Controller',
	init: function() {
        
	},
	control:{
		'#btnTonKho':{
            click: 'onBtnTonKho'
        },
		'#btnTonKhoPOLine':{
            click: 'onBtnTonKhoPOLine'
        },
		'#btnThuGon': {
			click: 'onhiddenMaster'
		},
		'#btnMoRong': {
			click: 'onhiddenMaster'
		},
		'#btnStart': {
			click: 'onStart'
		},
		'#btnStop': {
			click: 'onStop'
		},
		'#btnTimSP': {
			click: 'onTimSP'
		},
		'#Sku_AutoComplete': {
			beforeQuery: 'Sku_AutoComplete_beforeQuery',
			keypress: 'onPressEnterSkucode',
		},
		'#btnThemSP': {
			click: 'onBtnThemSP'
		},
    },
	onTimSP: function(){
		var me = this;
		var viewModel = this.getViewModel();
		var pcontract_poid_link = viewModel.get('stockout.pcontract_poid_link');
		
		if(pcontract_poid_link != null && pcontract_poid_link != 0 && pcontract_poid_link != '' && !isNaN(pcontract_poid_link)){
			me.onTimLine();
		}else{
			var form = Ext.create({
				xtype: 'skusearchwindow',
				width: 1200,
				height: 500,
				reference: 'skusearchwindow',
				viewModel: {
					data: {
						sourceview: 'Stockout_P_EditController',
						searchtype: 1,
						pcontractid_link: null,
						type: 10,                        
						orgcustomerid_link: null,
						isHidden_sku: false,
						isHiddenSkuSearchCriteria_Attr_actioncolumn: false,
						isHiddenSkuSearchCriteria_Attr_btnThemMoi: false
					}
				}
			});
			form.show();
	
			form.getController().on('product_sku_selected', function (select) {
				console.log(select);
				me.onAdd_Stockout_D(select);
				form.close();
			});
		}
	},
	onTimLine: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var po_buyer = viewModel.get('stockout.contract_number');
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách SP',
			closeAction: 'destroy',
			width: 600,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockin_POLINE_Main',
				viewModel: {
					data: {
						po_buyer: po_buyer,
						isDsPOLineHidden: true,
					}
				}
			}]
		});
		form.down('#Stockin_POLINE_Sku').setWidth('100%');
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
				stockoutd_new.totalpackagecheck = data.so_luong_yeu_cau == null ? 0 : data.so_luong_yeu_cau;
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
	onAdd_Stockout_D: function(select){ console.log(select);
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var list = viewModel.get('stockout.stockout_d');
		if (list == null){
			list = [];
		}
		for(var i=0; i<select.length; i++){
			var data = select[i].data;

			var isExist = m.checkSkuInDList(select[i]); // console.log(isExist);
			if(!isExist){
				var stockoutd_new = new Object();
				stockoutd_new.id = null;
				stockoutd_new.skucode = data.code;
				stockoutd_new.sku_product_code = data.product_code;
				stockind_new.skuname = data.name;
				stockoutd_new.product_name = data.product_name;
				stockoutd_new.p_skuid_link = data.productid_link;
				stockoutd_new.color_name = data.color_name;
				stockoutd_new.size_name = data.size_name;
				stockoutd_new.unitid_link = data.unitid_link;
				stockoutd_new.unit_name = data.unit_name;
				stockoutd_new.colorid_link = data.color_id;
				stockoutd_new.skuid_link = data.id;
				stockoutd_new.sizeid_link = data.size_id;
				list.push(stockoutd_new);
			}
		}

		viewModel.set('stockout.stockout_d', list);
		var StockoutD_Store = viewModel.getStore('StockoutD_Store');
		StockoutD_Store.removeAll();
		StockoutD_Store.insert(0, list);
		StockoutD_Store.commitChanges();
	},
	onhiddenMaster: function () {
		var view = this.getView();
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('stockout_p_edit_m');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
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
	onBtnTonKhoPOLine: function(){
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

		var pcontract_poid_link = viewModel.get('stockout.pcontract_poid_link');
		if(pcontract_poid_link == 0 || pcontract_poid_link == null || isNaN(pcontract_poid_link)){
			Ext.MessageBox.show({
				title: "Thông báo",
				msg: "Bạn cần chọn PO Line",
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
			return;
		}

		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách tồn kho SP',
			closeAction: 'destroy',
			width: 1100,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_P_TonKho',
				viewModel: {
					type: 'Stockout_P_TonKho_ViewModel',
					data: {
						stockid_link: stockid_link,
						pcontract_poid_link: pcontract_poid_link
					}
				}
			}]
		});
		form.show();
	},
	Sku_AutoComplete_beforeQuery: function(){
		var viewModel = this.getViewModel();
        var Sku_AutoComplete = viewModel.getStore('Sku_AutoComplete');
        var typeFrom = 10;
		var typeTo = 20;
        Sku_AutoComplete.proxy.extraParams = {
            typeFrom: typeFrom,
			typeTo: typeTo,
        }
	},
	onPressEnterSkucode: function (textfield, e, eOpts) { 
		var m = this;
		if (e.getKey() == e.ENTER) {
			m.onBtnThemSP();
		}
	},
	onBtnThemSP: function () {
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var skucodeCbbox = m.down('#Sku_AutoComplete');

		if (skucodeCbbox) {
			var selectedRecord = skucodeCbbox.getSelectedRecord();
			if (selectedRecord) {
				// check danh sách d đã có vải này chưa, có thông báo, chưa có thêm
				var isExist = me.checkSkuInDList(selectedRecord);
				if (isExist) { // thông báo
					Ext.Msg.show({
						title: 'Thông báo',
						msg: 'Đã có loại thành phẩm này trong danh sách',
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				} else { // thêm
					me.addSkuToDList(selectedRecord.data);
					skucodeCbbox.setValue(null);
					skucodeCbbox.focus();
				}
			} else {
				console.log('no or null selectedRecord');
			}
		}
	},
	checkSkuInDList: function (selectedRecord) {
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockout_d = viewModel.get('stockout.stockout_d');

		if (null != stockout_d) {
			var skuid_link = selectedRecord.get('id');
			for (var i = 0; i < stockout_d.length; i++) {
				if (stockout_d[i].skuid_link == skuid_link) {
					return true;
				}
			}
		} else {
			viewModel.set('stockout.stockout_d', []);
		}
		// console.log(stockout_d);
		return false;
	},
	addSkuToDList: function (data) { console.log(data);
		var me = this;
		var m = this.getView();
		var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		var store = m.getStore();

		var stockout_dObj = new Object();
		stockout_dObj.skuid_link = data.id;
		stockout_dObj.skucode = data.code;
		stockout_dObj.skuname = data.name;
		stockout_dObj.sku_product_code = data.product_code;
		stockout_dObj.colorid_link = data.color_id;
		stockout_dObj.color_name = data.mauSanPham;
		stockout_dObj.size_name = data.coSanPham;
		stockout_dObj.totalpackage = null;
		stockout_dObj.totalpackagecheck = null;
		stockout_dObj.stockout_packinglist = [];

		stockout_d.push(stockout_dObj);
		store.setData([]);
		store.insert(0, stockout_d);
		store.commitChanges();
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
        viewModel.set('isAutoChecked',true);
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
					// if (isNaN(id) || id == null || id == 0) { // chưa có trong db
					// 	me.deleteRow_Stockout_D(data);
					// } else { // đã có trong db
					// 	me.deleteRowDb_Stockout_D(data);
					// }
					me.deleteRow_Stockout_D(data);
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
		var StockoutD_Store = viewModel.getStore('StockoutD_Store');
		if (StockoutD_Store) {
			StockoutD_Store.removeAll();
			StockoutD_Store.insert(0, stockout_d);
			StockoutD_Store.commitChanges();
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
						var StockoutD_Store = viewModel.getStore('StockoutD_Store');
						if (StockoutD_Store) {
							StockoutD_Store.removeAll();
							StockoutD_Store.insert(0, stockout_d);
							StockoutD_Store.commitChanges();
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

	onStart: function () {
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockoutD_Store');
		var stockout = viewModel.get('stockout');
		var session = GSmartApp.util.State.get('session');
		listepc = viewModel.get('listepc');

		var listcode = [];

		var host = config.getMqtthost();
		var port = config.getMqttport();
		var clientid = config.getClientid();
		var txtDevice = me.lookupReference('device');
		var deviceId = txtDevice.getValue();
		var device = viewModel.getStore('DeviceInvStore').getById(deviceId);

		if (device == null || device.length == 0) {
			Ext.Msg.show({
				title: GSmartApp.Locales.title_chonthietbi[GSmartApp.Locales.currentLocale],
				msg: null,
				buttons: [{
					itemId: 'ok',
					text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
					ui: 'action'
				}]
			});
		}
		else {
			var termid = config.getTermid();
			//var orgid_link = GSmartApp.util.State.get('orgid_link');
			//console.log('orgid_link:' + orgid_link);
			/* Generate token */
			me.stoken = Ext.Number.randomInt(100000, 999999);

			me.channel.cmd = 'gsm5/term/' + termid + '/cmd';
			GSmartApp.Mqtt.connect(host, port, clientid, me.channel, deviceId, function (topic, message) {
				if (topic.includes("cmd")) {
					console.log('cmd data:' + message);
					var jsonObj = Ext.JSON.decode(message);

					if (jsonObj.ct == 1 && jsonObj.cid == 'CMD_START_INV') {
						if (jsonObj.respcode == 0) {
							me.channel.dta = 'gsm5/transaction/inv/' + jsonObj.respdata.token;
							GSmartApp.Mqtt.client.subscribe(me.channel.dta);
							console.log('register dta ch:' + me.channel.dta);
							viewModel.set('clsbtn', "blue-button");
							viewModel.set('clsbtnStart', "");
							viewModel.set('clsbtnStop', "red-button");
							viewModel.set('isStart', true);

							GSmartApp.util.State.set('CMD', 'CMD_STOP_INV');
							GSmartApp.util.State.set('sendChannel', me.sendChannel);

						} else {
							Ext.Msg.alert('Device:' + device, 'There are some problem when you start. Please press STOP before START!');
						}
					}

					//Khi het time out tu dong goi nut Stop
					if (jsonObj.ct == 2 && jsonObj.cid == 'NTF_ON_STOP') {
						me.onStop();
					}
				} else if (topic.includes("transaction")) {
					// console.log(message);
					var jsonObj = Ext.JSON.decode(message);
					for (var x in jsonObj) {
						// console.log('mqtt return object');
						// console.log(jsonObj[x]);
						//Nếu epc chưa có trong phiếu thì xử lý
						if (!listepc.has(jsonObj[x].epc)) {
							listepc.set(jsonObj[x].epc, jsonObj[x].epc);

							var sku = store.findRecord('skucode', jsonObj[x].skucode);
							// console.log(sku);

							if (sku == null) {
								//THêm sku vào để lấy thông tin từ server
								listcode.push(jsonObj[x].skucode);
								//Tạo Object để lưu thông tin stockoutd và gắn stockout_packinglist và stockoutd
								var stockoutd = new Object({
									stockoutpklist: [],
									id: null,
									totalpackage: 1,
									orgrootid_link: session.rootorgid_link,
									skucode: jsonObj[x].skucode,
									lastuserupdateid_link: session.id,
									timecreate: new Date()
								});

								//Tại Object để lưu thông tin stockout_packinglist
								var epc_item = new Object({ id: null });
								epc_item.epc = jsonObj[x].epc;
								if (jsonObj[x].epcstate == 0) {
									epc_item.extrainfo = 'Chíp không có trong kho!!! Không thể xuất';
									epc_item.status = -1;
									stockoutd.status = -1;
								} else {
									epc_item.status = 0;
									stockoutd.status = 0;
								}
								epc_item.orgrootid_link = session.rootorgid_link;
								epc_item.lastuserupdateid_link = session.id;
								epc_item.timecreate = new Date();

								stockoutd.stockoutpklist.push(epc_item);

								//Cập nhật lại stockout trong viewModel
								stockout.stockoutd.push(stockoutd);
								console.log(stockoutd);
								viewModel.set('stockout', stockout);
								//Thêm stockoutd vào grid
								store.insert(0, stockoutd);
							}
							else {
								var stockoutpklist = sku.get('stockoutpklist');

								sku.set('totalpackage', sku.get('totalpackage') + 1);

								var epc_item = new Object({ id: null });
								epc_item.epc = jsonObj[x].epc;
								epc_item.status = jsonObj[x].epcstate;
								if (jsonObj[x].epcstate == 0) {
									epc_item.extrainfo = 'Chíp không có trong kho!!! Không thể xuất';
									epc_item.status = -1;
									sku.set('status', -1);
								} else {
									epc_item.status = 0;
								}
								stockoutpklist.push(epc_item);
							}
						}
					}
					//Lấy thông tin từ server
					console.log(store);
					me.UpdateInfoSKU(listcode, store);
				}
			}, function () {
				me.sendChannel = 'gsm5/device/' + device.data.code + '/cmd';
				me.funcid = '2'; /* FuncId: 2 -  StockIn; 3-StockOut*/
				var cmd = { ct: 0, cid: "CMD_START_INV", srcid: termid, reqdata: { timeout: 120000, token: me.stoken, funcid: me.funcid } };
				console.log("Device channel:" + me.sendChannel);
				var message = new Paho.Message(Ext.JSON.encode(cmd));
				message.destinationName = me.sendChannel;
				message.qos = 0;
				GSmartApp.Mqtt.client.send(message);

			}, function () {
				console.log('Loi connect');
				var viewModel = me.getViewModel();
				viewModel.set('clsbtn', "red-button");
				viewModel.set('clsbtnStart', "blue-button");
				viewModel.set('clsbtnStop', "");
				viewModel.set('isStart', false);
			});
		}
	},
	onStop: function () {
		var me = this;
		var viewModel = me.getViewModel();
		viewModel.set('clsbtn', "red-button");
		viewModel.set('clsbtnStart', "blue-button");
		viewModel.set('clsbtnStop', "");
		viewModel.set('isStart', false);
		var termid = GSmartApp.Ajax.getTermid();
		if (GSmartApp.Mqtt.client) {
			var cmd = { ct: 0, cid: "CMD_STOP_INV", srcid: termid, reqdata: { token: me.stoken, funcid: me.funcid } };
			console.log("Device channel:" + me.sendChannel);
			var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
			GSmartApp.Mqtt.client.send(message);
		}
		me.channel.dta = null;
		GSmartApp.Mqtt.onDisconnect();
		GSmartApp.Mqtt.deviceid_link = 0;
	},
	UpdateInfoSKU: function (listcode, store) {
		var params = new Object();
		params.listcode = listcode;

		var mainView = Ext.getCmp('stockout_p_edit');
		if(mainView) mainView.setLoading(true);

		GSmartApp.Ajax.postJitin('/api/v1/sku/getinfolist_bycode', Ext.JSON.encode(params),
			function (success, resp, options) {
				if(mainView) mainView.setLoading(false);
				if (success) {
					var resp = Ext.decode(resp.responseText);
					if (resp.respcode == 200) {
						//Lấy bản ghi chứa skucode trong grid
						listcode = [];
						for (var i = 0; i < resp.data.length; i++) {
							var sku = resp.data[i];
							var record = store.findRecord('skucode', sku.code);

							record.set('skuname', sku.name);
							record.set('skuid_link', sku.id);
							record.set('product_code', sku.product_code);
							record.set('sizeid_link', sku.sizeid_link);
							record.set('unit_name', sku.unit_name);
							record.set('size_name', sku.size_name);
							record.set('color_name', sku.color_name);
							record.set('colorid_link', sku.colorid_link);
							record.set('p_skuid_link', sku.productid_link);
							record.set('skutypeid_link', sku.skutypeid_link);
							record.set('unitprice', sku.unitprice);
						}
					}
				}
			})
	},
})