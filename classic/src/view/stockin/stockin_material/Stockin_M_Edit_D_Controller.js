Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_D_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_D_Controller',
	channel: { cmd: null, dta: null },
	init: function () {
		var devicestore = this.getViewModel().getStore('DeviceInvStore');
		devicestore.loadStore(3);
	},
	control: {
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
		'#btnTimLenh': {
			click: 'onTimLenh'
		},
		'#btnTaiSP': {
			click: 'onTaiSanPham'
		},
		'#ordercode': {
			specialkey: 'onSpecialkey'
		},
		// '#btnThemNPL': {
        //     click: 'onBtnThemNPL'
        // },
        '#btnTimNPL': {
            click: 'onBtnTimNPL'
        },
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
	onSpecialkey: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTaiSanPham();
		}
	},
	renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
	},
	onhiddenMaster: function () {
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('StockIn_M_Edit_M');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
	},
	onStart: function () {
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockinDetailStore');
		var stockin = viewModel.get('stockin');
		var session = GSmartApp.util.State.get('session');

		var listcode = [];
		var listepc = viewModel.get('listepc');

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
			var orgid_link = GSmartApp.util.State.get('orgid_link');
			var termid = config.getTermid();
			/* Generate token */
			me.stoken = Ext.Number.randomInt(100000, 999999);

			me.channel.cmd = 'gsm5/term/' + termid + '/cmd';
			GSmartApp.Mqtt.connect(host, port, clientid, me.channel, deviceId, function (topic, message) {
				console.log(topic);
				if (topic.includes("cmd")) {
					var jsonObj = Ext.JSON.decode(message);
					// console.log(jsonObj);
					if (jsonObj.ct == 1) {
						if (jsonObj.cid == 'CMD_START_INV') {
							me.channel.dta = 'gsm5/transaction/inv/' + jsonObj.respdata.token;
							GSmartApp.Mqtt.client.subscribe(me.channel.dta);
							console.log('register dta ch:' + me.channel.dta);

							viewModel.set('clsbtn', "blue-button");
							viewModel.set('clsbtnStart', "");
							viewModel.set('clsbtnStop', "red-button");
							viewModel.set('isStart', true);

							GSmartApp.util.State.set('CMD', 'CMD_STOP_INV');
							GSmartApp.util.State.set('sendChannel', me.sendChannel);
						}
					}

					//Khi het time out tu dong goi nut Stop
					if (jsonObj.ct == 2 && jsonObj.cid == 'NTF_ON_STOP') {
						me.onStop();
					}
				} else if (topic.includes("transaction")) {
					var jsonObj = Ext.JSON.decode(message);
					// console.log(jsonObj);
					for (var x in jsonObj) {
						// console.log(jsonObj[x].epc)
						if (!listepc.has(jsonObj[x].epc)) {
							listepc.set(jsonObj[x].epc, jsonObj[x].epc);
							var sku = store.findRecord('skucode', jsonObj[x].skucode);

							//Nếu chưa có bản ghi nào chứa skucode trả về thì insert vào grid
							if (!sku) {
								//chưa có thì thêm vào listcode để lấy thông tin từ server
								listcode.push(jsonObj[x].skucode);

								//Tạo Object để lưu thông tin stockind và gắn stockin_packinglist và stockind
								var stockind = new Object({
									stockin_packinglist: [],
									id: null,
									totalpackage: 1,
									orgrootid_link: session.rootorgid_link,
									skucode: jsonObj[x].skucode,
									lastuserupdateid_link: session.id,
									timecreate: new Date()
								});

								//Tại Object để lưu thông tin stockin_packinglist
								var epc_item = new Object({id:null});
								epc_item.epc = jsonObj[x].epc;
								if (jsonObj[x].epcstate == 1){
									epc_item.extrainfo = 'Chíp đã có trong kho!!! Không thể nhập';
									epc_item.status = -1;
									stockind.status = -1;									
								} else {
									epc_item.status = 0;
									stockind.status = 0;
								}							
								epc_item.orgrootid_link = session.rootorgid_link;
								epc_item.lastuserupdateid_link = session.id;
								epc_item.timecreate = new Date();
								epc_item.encryptdatetime = new Date();

								stockind.stockin_packinglist.push(epc_item);

								//Cập nhật lại stockin trong viewmodel
								stockin.stockin_d.push(stockind);
								viewModel.set('stockin', stockin);

								//Thêm stockind vào grid
								store.insert(0, stockind);

							}
							else {
								//Bản ghi đã tồn tại trong grid thì lấy ds packinglist ra để so sánh xem epc đã tồn tại trong packinglist hay chưa
								var stockinpackinglist = sku.get('stockin_packinglist');

								sku.set('totalpackage', sku.get('totalpackage') + 1);

								var epc_item = new Object({id:null});
								epc_item.epc = jsonObj[x].epc;
								if (jsonObj[x].epcstate == 1){
									epc_item.extrainfo = 'Chíp đã có trong kho!!! Không thể nhập';
									epc_item.status = -1;
									sku.set('status',-1);									
								} else {
									epc_item.status = 0;
								}
								stockinpackinglist.push(epc_item);

							}
						}
					}

					//Lấy thông tin sku từ server để hiện lên grid
					console.log(store);
					me.UpdateInfoSKU(listcode, store);
				}
			}, function () {
				me.sendChannel = 'gsm5/device/' + device.data.code + '/cmd';
				me.funcid = '2;' + orgid_link;
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
		GSmartApp.Ajax.post('/api/v1/sku/getinfolist_bycode', Ext.JSON.encode(params),
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
							record.set('sku_product_code', sku.product_code);
							record.set('sizeid_link', sku.sizeid_link);
							record.set('size_name', sku.size_name);
							record.set('color_name', sku.color_name);
							record.set('colorid_link', sku.colorid_link);
							record.set('p_skuid_link', sku.productid_link);
							record.set('skutypeid_link', sku.skutypeid_link);
							record.set('unitid_link', sku.unitid_link);
							record.set('unit_name', sku.unit_name);
							record.set('porder_year', sku.porder_year);
							record.set('unitprice', sku.unitprice);
						}
					}
				}
			})
	},
	onTimLenh: function () {
		var me = this;
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách lệnh sản xuất',
			closeAction: 'destroy',
			width: 1100,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockin_M_Edit_POrder'
			}]
		});
		form.show();

		form.down('#Stockin_M_Edit_POrder').getController().on('Chon', function (ordercode) {
			grid.down('#ordercode').setValue(ordercode);
			me.onTaiSanPham();
			form.close();
		})
	},
	onTaiSanPham: function () {
		var grid = this.getView();
		var viewmodel = this.getViewModel();
		var stockin = viewmodel.get('stockin');

		var params = new Object();
		var ordercode = grid.down('#ordercode').getValue();

		if (ordercode == "") {
			Ext.MessageBox.show({
				title: "Thông báo",
				msg: "Bạn chưa nhập mã lệnh sản xuất!",
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
		}
		else {
			params.ordercode = ordercode;
			GSmartApp.Ajax.post('/api/v1/porder/get_porder_stockin', Ext.JSON.encode(params),
				function (success, resp, options) {
					if (success) {
						var resp = Ext.decode(resp.responseText);
						if (resp.respcode == 200) {
							if (resp.data.length > 0) {
								var store = viewmodel.getStore('StockinDetailStore');
								store.removeAll();
								store.setData(resp.data);
								stockin.stockind = resp.data;
								viewmodel.set('stockin', stockin);
								viewmodel.set('listepc', new Map());
							}
							else {
								Ext.MessageBox.show({
									title: "Thông báo",
									msg: "Mã lệnh sản xuất không đúng bạn vui lòng tìm kiếm lại!",
									buttons: Ext.MessageBox.YES,
									buttonText: {
										yes: 'Đóng',
									}
								});
							}
						}
						else {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: "Mã lệnh sản xuất không đúng bạn vui lòng tìm kiếm lại!",
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
						}
					}
				})
		}

	},
    onEPCDetail: function(grid, rowIndex, colIndex){
        var record = grid.store.getAt(rowIndex);
        var form =Ext.create({
            xtype: 'stockin_epc_window',
            reference:'stockin_epc_window'
        });
		var viewModel = form.getViewModel();
        viewModel.set('stockin_d',record);
        form.show();
	},

    onViewPackingList: function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var stockin = viewmodel.get('stockin');
        var data = grid.getStore().getAt(rowIndex);
        var stockindid_link = data.get('id');

        // console.log(stockin);
        // console.log(data);
        // console.log(stockindid_link);

        // if(isNaN(invoicedid_link)){
        if(false){
            // not existed in db
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần lưu invoice trước khi thêm packing list cho ' + data.get('skucode'),
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            var form = Ext.create('Ext.window.Window', {
                height: '90%',
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Chi tiết Packing List - SKU : ' + data.get('skucode'),
                closeAction: 'destroy',
                width: 1200,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockin_packinglist'
                }],
                viewModel: {
                    type: 'Stockin_packinglist_ViewModel',
                    data: {
                        packinglist: {
                            stockindid_link: stockindid_link,
                            stockinid_link: viewmodel.get('stockin.id'),
                            skuid_link: data.get('skuid_link')
                        },
                        stockin: stockin,
                        stockinDRec: data
                    }
                }
            });
            form.show();
        }
    },

	// onBtnThemNPL: function(){
    //     // console.log('onBtnThemNPL');
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var invoice = viewModel.get('invoice');
    //     var skucode = viewModel.get('skucode');

    //     // console.log(invoice);
    //     if(invoice != null){
    //         if(invoice.pcontractcode != null && invoice.pcontractid_link != null){
    //             me.setLoading(true);
    //             var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
    //             var BalanceProductStore = viewModel.getStore('BalanceProductStore');
    //             // console.log(SKUBalanceStore);
    //             // console.log(BalanceProductStore);

    //             var params = new Object();
    //             params.pcontractid_link = invoice.pcontractid_link;

    //             GSmartApp.Ajax.post('/api/v1/balance/get_material_bypcontract', Ext.JSON.encode(params),
    //                 function (success, response, options) {
    //                     if (success) {
    //                         var response = Ext.decode(response.responseText);
    //                         // console.log(response);
    //                         if (response.respcode == 200) {
    //                             SKUBalanceStore.setData(response.data);
    //                             BalanceProductStore.setData(response.product_data);

    //                             m.createWindowNpl(SKUBalanceStore, skucode);
    //                         }
    //                         me.setLoading(false);
    //                     }else{
    //                         me.setLoading(false);
    //                     }
    //                 })

                
    //         }
    //     }
    // },
	onBtnTimNPL: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var skucode = viewModel.get('skucode');

		console.log(viewModel.get('stockin'));

        var form = Ext.create({
            xtype: 'skusearchwindow',
            width: 1200,
            height: 500,       
            reference: 'skusearchwindow',
            closeAction: 'destroy',
            viewModel: {
                data: {
                    sourceview: 'InvoiceEdit_D',
                    searchtype: 5,
                    // pcontractid_link: viewModel.get('PContract.id'),
                    // productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true,
                    SKUCode: skucode
                }
            }
        });
        form.show();

        form.getController().on('InsertToInvoiceEdit_D', function (records) {
            console.log(records);
            var stockin = viewModel.get('stockin');
            var stockin_d = viewModel.get('stockin.stockin_d');
            if(stockin_d == null){
                stockin_d = new Array();
            }

            for(var i = 0; i < records.length; i++){
                var npl = records[i];
                var found = stockin_d.some(item => item.skuid_link === npl.get('id'));
                // skucode, skuname, color_name, size_name
                // code, name, tenMauNPL, coKho
                if(!found){
                    var stockin_dObj = new Object();
                    stockin_dObj.skuid_link = npl.get('id');
                    stockin_dObj.skucode = npl.get('code');
                    stockin_dObj.skuname = npl.get('name');
                    stockin_dObj.colorid_link = npl.get('color_id');
                    stockin_dObj.color_name = npl.get('mauSanPham');
                    stockin_dObj.size_name = npl.get('coSanPham');
                    stockin_dObj.totalpackage = 0;
                    stockin_dObj.netweight = 0;
                    stockin_dObj.grossweight = 0;
                    stockin_dObj.m3 = 0;
                    stockin_dObj.unitprice = 0;
                    stockin_dObj.totalamount = 0;
                    stockin_dObj.yds = 0;

					stockin_dObj.totalmet_origin = 0;
                    stockin_dObj.totalmet_check = 0;
                    stockin_dObj.totalydsorigin = 0;
                    stockin_dObj.totalydscheck = 0;

                    // stockin_dObj.unitid_link = invoice_d.get('unitid_link');
                    // stockin_dObj.unit_name = invoice_d.get('unitname');

                    stockin_d.push(stockin_dObj);
                }
            }
            me.getStore().loadData(stockin_d);
            me.getStore().commitChanges();
            form.close();
        })
    },
	onPressEnterBtnTimNPL: function(textfield, e, eOpts){
        var m = this;
        if(e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            m.onBtnTimNPL();
        }
    },
})