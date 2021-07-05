Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_EditController', {
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
			}
		}
	},
	control: {
		'#loaitien': {
			select: 'onSelectCurency'
		},
		'#cmbGroupStockout': {
			select: 'onSelectGroupStockout'
		},
        '#btnLuu':{
            click: 'onSave'
        },
		'#btnConfirm':{
            click: 'onConfirm'
        }
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
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockoutD_Store');
		var listepc = viewModel.get('listepc');

		var params = new Object();
		params.id = id;

		var mainView = Ext.getCmp('stockout_p_edit');
        if(mainView) mainView.setLoading(true);

		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_getbyid', Ext.JSON.encode(params),
			function (success, response, options) {
				if(mainView) mainView.setLoading(false);
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) {
					viewModel.set('stockout', response.data);
					for (var i = 0; i < response.listepc.length; i++) {
						listepc.set(response.listepc[i].epc, response.listepc[i].epc);
					}
					store.setData(response.data.stockout_d);
					store.commitChanges();

					if(response.data.stockouttypeid_link == 21) { // xuat theo don cho Vendor
						var OrgFromStore = viewModel.getStore('OrgFromStore');
						OrgFromStore.loadStore(8, false);
						var OrgToStore = viewModel.getStore('OrgToStore');
						OrgToStore.loadStore(11, false);
					}
					if(response.data.stockouttypeid_link == 22) { // xuat dieu chuyen den px khac
						var OrgFromStore = viewModel.getStore('OrgFromStore');
						OrgFromStore.loadStore(8, false);
						var OrgToStore = viewModel.getStore('OrgToStore');
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
		viewModel.set('stockout.stockouttypeid_link', id);

		var mainView = Ext.getCmp('stockout_p_edit');
        if(mainView) mainView.setLoading(true);

		var GpayUser = viewModel.getStore('GpayUser');
		GpayUser.loadUserInfo_Async();
		GpayUser.load({
			scope: this,
			callback: function(records, operation, success) {
				if(mainView) mainView.setLoading(false);
				if(!success){
					 this.fireEvent('logout');
				} else {
					if (null!=records[0].data.org_grant_id_link){
                        viewModel.set('stockout.orgid_from_link', records[0].data.org_grant_id_link)
                    }
					else{
                        viewModel.set('stockout.orgid_from_link', records[0].data.orgid_link)
                    }
                    if(id == 21) { // xuat theo don cho Vendor
						var OrgFromStore = viewModel.getStore('OrgFromStore');
						OrgFromStore.loadStore(8, false);
						var OrgToStore = viewModel.getStore('OrgToStore');
						OrgToStore.loadStore(11, false);
					}
					if(id == 22) { // xuat dieu chuyen den kho khac
						var OrgFromStore = viewModel.getStore('OrgFromStore');
						OrgFromStore.loadStore(8, false);
						var OrgToStore = viewModel.getStore('OrgToStore');
						OrgToStore.loadStore(8, false);
					}
				}
			}
		});

		
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
		var me=this;
		if (mes == "") {
			var viewModel = this.getViewModel();
			var stockout = this.getViewModel().get('stockout');
			// console.log(stockout);
			var params = new Object();
			params.data = [];
			params.data.push(stockout);

			var mainView = Ext.getCmp('stockout_p_edit');
        	if(mainView) mainView.setLoading(true);

			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create', Ext.JSON.encode(params),
				function (success, response, options) {
					if(mainView) mainView.setLoading(false);
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
							me.getInfo(response.id);
							// if(stockout.id ==null)
							// 	this.redirectTo("stockout_p_main/" + response.id + "/edit");
							// else {
							// 	var store = viewModel.getStore('StockoutD_Store');
							// 	store.commitChanges();
							// }
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
		var viewModel = this.getViewModel();
		if (record.get('id') == 1) {
			viewModel.set('isRFIDHidden', true);
			viewModel.set('isBarcodeHidden', true);
			viewModel.set('isManualHidden', false);
		}
		if (record.get('id') == 2) {
			viewModel.set('isRFIDHidden', true);
			viewModel.set('isBarcodeHidden', false);
			viewModel.set('isManualHidden', true);
		}
		if (record.get('id') == 3) {
			viewModel.set('isRFIDHidden', false);
			viewModel.set('isBarcodeHidden', true);
			viewModel.set('isManualHidden', true);
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
                xtype: 'Authen_Confirm',
            }]
        });
        form.show();

		form.down('#Authen_Confirm').getController().on('AuthenOK', function (approver_userid_link) {
            form.close();

			console.log(approver_userid_link);

			var params = new Object();
			params.stockoutId = stockoutId;
			params.approver_userid_link = approver_userid_link;

			var mainView = Ext.getCmp('stockout_p_edit');
			if(mainView) mainView.setLoading(true);
	
			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_approve', Ext.JSON.encode(params),
				function (success, response, options) {
					if(mainView) mainView.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						// console.log(response);
						if (response.respcode == 200) {
							Ext.Msg.show({
								title: 'Thông báo',
								msg: 'Duyệt thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
							
							m.onThoat();
						}
						else {
							Ext.Msg.show({
								title: 'Duyệt thất bại',
								msg: response.message,
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
						}
	
					} else {
						Ext.Msg.show({
							title: 'Duyệt thất bại',
							msg: "Liên hệ IT để được hỗ trợ",
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				})
        })
    }
});
