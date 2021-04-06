Ext.define('GSmartApp.view.stockout.Stockout_P_EditController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_P_EditController',
	init: function () {
		var devicestore = this.getViewModel().getStore('DeviceInvStore');
		devicestore.loadStore(3);
	},
	listen: {
		controller: {
			'*': {
				loaddata: 'onLoadData',
				newdata: 'onNewData',
				urlBack: 'onUrlBack'
			}
		}
	},
	control: {
		'#btnThuGon': {
			click: 'onhiddenMaster'
		},
		'#btnTimSP': {
			click: 'onTimSP'
		},
		'#btnMoRong': {
			click: 'onhiddenMaster'
		},
		'#loaitien': {
			select: 'onSelectCurency'
		},
		'#cmbGroupStockout': {
			select: 'onSelectGroupStockout'
		},
		'#btnTimLenh': {
			click: 'onTimLine'
		},
		'#ordercode': {
			specialkey: 'onSpecialkey'
		},
		'#btnConfirm':{
            click: 'onConfirm'
        }
	},
	onTimSP: function(){
		var me = this;
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
	},
	onAdd_Stockout_D: function(select){
		var viewmodel = this.getViewModel();
		var list = viewmodel.get('stockout.stockout_d');
		if (list == null){
			list = [];
		}
		for(var i=0; i<select.length; i++){
			var data = select[i].data;

			var stockoutd_new = new Object();
			stockoutd_new.id = null;
			stockoutd_new.skucode = data.code;
			stockoutd_new.product_code = data.product_code;
			stockoutd_new.product_name = data.product_name;
			stockoutd_new.p_skuid_link = data.productid_link;
			stockoutd_new.color_name = data.color_name;
			stockoutd_new.size_name = data.size_name;
			// stockoutd_new.totalpackage_req = data.pquantity_total;
			stockoutd_new.unitid_link = data.unitid_link;
			stockoutd_new.unit_name = data.unit_name;
			// stockoutd_new.stockoutid_link = null;
			stockoutd_new.colorid_link = data.color_id;
			stockoutd_new.skuid_link = data.id;
			stockoutd_new.sizeid_link = data.size_id;
			console.log(stockoutd_new);
			list.push(stockoutd_new);
		}

		viewmodel.set('stockout.stockout_d', list);
		var store = viewmodel.getStore('StockoutD_Store');
		store.removeAll();
		store.setData(viewmodel.get('stockout.stockout_d'));
	},
	onSpecialkey: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimLine();
		}
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
						po_buyer: grid.down('#ordercode').getValue()
					}
				}
			}]
		});
		form.show();

		form.down('#Stockout_POLINE').on('Chon', function (data) {
			me.onTaiSanPham(data);
			form.close();
		})
	},
	onTaiSanPham: function(data){
		var viewmodel = this.getViewModel();
		viewmodel.set('stockout.pcontract_poid_link', data.id);
		viewmodel.set('stockout.contract_number', data.po_buyer);
		var params = new Object();
		params.pcontract_poid_link = data.id;

		GSmartApp.Ajax.post('/api/v1/pcontract_po/getall_sku_byline', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) {
					var list = [];
					for(var i=0; i<response.data.length; i++){
						var data = response.data[i];
						console.log(data);
						var stockoutd_new = new Object();
						stockoutd_new.id = null;
						stockoutd_new.skucode = data.skuCode;
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

					viewmodel.set('stockout.stockout_d', list);
					var store = viewmodel.getStore('StockoutD_Store');
					store.removeAll();
					store.setData(list);
				}
			})
	},
	channel: { cmd: null, dta: null },
	renderCell: function (value, record) {
		if (null == value) value = 0;
		return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000') + '</div>';
	},
	renderSum: function (value, summaryData, dataIndex) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
	},
	onhiddenMaster: function () {
		var view = this.getView();
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('stockout_p_edit_m');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
	},
	onSelectCurency: function (combo, record, eOpts) {
		var viewModel = this.getViewModel();
		viewModel.set('stockout.vat_exchangerate', record.data.exrate);
	},
	onDeviceChange: function (combo, newValue, oldValue, eOpts) {
		var me = this;
		var txtDevice = me.lookupReference('device');
		var deviceId = txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if (device) {
			GSmartApp.util.State.set('device_inv', device.data);
		}

	},
	onUrlBack: function (type) {
		this.redirectTo("stockout_p_main");
	},
	onLoadData: function (id, type) {
		this.getInfo(id);
	},
	getInfo: function (id) {
		var me = this;
		var viewmodel = this.getViewModel();
		var store = viewmodel.getStore('StockoutD_Store');
		var listepc = viewmodel.get('listepc');

		var params = new Object();
		params.id = id;
		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_getbyid', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) {
					viewmodel.set('stockout', response.data);
					for (var i = 0; i < response.listepc.length; i++) {
						listepc.set(response.listepc[i].epc, response.listepc[i].epc);
					}
					store.removeAll();
					store.setData(response.data.stockout_d);

					console.log(response.data.stockouttypeid_link);
					if(response.data.stockouttypeid_link == 21) { // xuat theo don cho Vendor
						var OrgToStore = viewmodel.getStore('OrgToStore');
						OrgToStore.loadStore(11, false);
					}
					if(response.data.stockouttypeid_link == 22) { // xuat dieu chuyen den px khac
						var OrgToStore = viewmodel.getStore('OrgToStore');
						OrgToStore.loadStore(8, false);
					}
				}
			})
	},
	onNewData: function (type, id) {
		var viewModel = this.getViewModel();
		var session = GSmartApp.util.State.get('session');
		viewModel.set('stockout.stockoutdate', new Date());
		viewModel.set('stockout.usercreateid_link', session.id);
		viewModel.set('stockout.orgid_from_link', session.orgid_link);
		viewModel.set('listepc', new Map());
		viewModel.set('stockout.stockouttypeid_link', id);

		if(id == 21) { // xuat theo don cho Vendor
            var OrgToStore = viewModel.getStore('OrgToStore');
            OrgToStore.loadStore(11, false);
        }
		if(id == 22) { // xuat dieu chuyen den px khac
			var OrgToStore = viewModel.getStore('OrgToStore');
            OrgToStore.loadStore(8, false);
		}
	},
	CheckValidate: function () {
		var mes = "";
		var stockout = this.getViewModel().get('stockout');
		if (stockout.stockouttypeid_link == null) {
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (stockout.orgid_from_link == null) {
			mes = "Bạn chưa chọn nơi xuất";
		}
		else if (stockout.orgid_to_link == null) {
			mes = "Bạn chưa chọn nơi nhập";
		}
		else if (stockout.stockout_d.length == 0) {
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
	onSave: function () {
		var mes = this.CheckValidate();
		if (mes == "") {
			var viewmodel = this.getViewModel();

			var stockout = this.getViewModel().get('stockout');
			// console.log(stockout);
			var params = new Object();
			params.data = [];
			params.data.push(stockout);

			var me = this.getView();
			me.setLoading("Đang lưu dữ liệu");
			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create', Ext.JSON.encode(params),
				function (success, response, options) {
					me.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Lập phiếu thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
							if(stockout.id ==null)
								this.redirectTo("stockout_p_main/" + response.id + "/edit");
							else {
								var store = viewmodel.getStore('StockoutD_Store');
								store.commitChanges();
							}
						}
					} else {
						var response = Ext.decode(response.responseText);
						// if (null!=response.epc_err){
						// 	response.epc_err.forEach(function(record, recordIdx){
						// 		console.log(record.epc);
						// 	}, this);
						// }
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Lỗi lập phiếu: ' + response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				})
		}
		else {
			Ext.MessageBox.show({
				title: "Thông báo",
				msg: mes,
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
		}
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
								//Tạo Object để lưu thông tin stockoutd và gắn stockout_packinglist và stockind
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

								//Cập nhật lại stockin trong viewmodel
								stockout.stockoutd.push(stockoutd);
								console.log(stockoutd);
								viewModel.set('stockout', stockout);
								//Thêm stockind vào grid
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
		GSmartApp.Ajax.postJitin('/api/v1/sku/getinfolist_bycode', Ext.JSON.encode(params),
			function (success, resp, options) {
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
	onEPCDetail: function (grid, rowIndex, colIndex) {
		var record = grid.store.getAt(rowIndex);
		var form = Ext.create({
			xtype: 'Stockout_EPC_Window',
			reference: 'Stockout_EPC_Window'
		});
		var viewModel = form.getViewModel();
		viewModel.set('stockout_d', record);

		form.show();
	},
	onSelectGroupStockout: function (combo, record, eOpts) {
		var viewmodel = this.getViewModel();
		if (record.get('id') == 1) {
			viewmodel.set('isRFIDHidden', true);
			viewmodel.set('isBarcodeHidden', true);
			viewmodel.set('isManualHidden', false);
		}
		if (record.get('id') == 2) {
			viewmodel.set('isRFIDHidden', true);
			viewmodel.set('isBarcodeHidden', false);
			viewmodel.set('isManualHidden', true);
		}
		if (record.get('id') == 3) {
			viewmodel.set('isRFIDHidden', false);
			viewmodel.set('isBarcodeHidden', true);
			viewmodel.set('isManualHidden', true);
		}
	},
	onConfirm: function(){
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockoutId = stockout.id;
        var form = Ext.create('Ext.window.Window', {
            // height: 200,
            width: 315,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Duyệt',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_P_Edit_Confirm',
                viewModel: {
                    type: 'HandoverDetailConfirmViewModel',
                    data: {
                        stockinId: stockoutId
                    }
                }
            }]
        });
        form.show();
    }
});
