Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_EditController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_P_EditController',
	init: function () {
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var devicestore = viewModel.getStore('DeviceInvStore');
		if(devicestore) devicestore.loadStore(3);

		var isWindow = viewModel.get('isWindow');
		// console.log(isWindow);
		if(isWindow){
			var stockouttypeid_link = viewModel.get('stockouttypeid_link');
			m.onNewData(null, stockouttypeid_link);
		}
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
            click: 'onBtnConfirm'
        },
		// window
		'#btnThoatWindow': {
			click: 'onBtnThoatWindow'
		},
		'#btnLuuWindow': {
			click: 'onBtnLuuWindow'
		},
		/////////
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
		var m = this;
		var txtDevice = m.lookupReference('device');
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
	getInfo: function (id, isConfirm) {
		var m = this;
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
					
					viewModel.set('listepc', new Map());
                    var listepc = new Map();
                    for (var i = 0; i < response.listepc.length; i++) {
						var epc = response.listepc[i].epc.trim();
                        listepc.set(epc, epc);
                    }

                    viewModel.set('listepc', listepc);

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
						// OrgToStore.loadStore(8, false);
						var listidtype = "8,4";
						// OrgToStore.loadStore_allchildren_byorg(listidtype);
						OrgToStore.loadStoreByOrgTypeString(listidtype);
					}

					if(isConfirm == true){
						m.onConfirm();
					}
				}
			})
	},
	onNewData: function (type, id) {
		var m = this;
		var viewModel = this.getViewModel();
		var session = GSmartApp.util.State.get('session');

		viewModel.set('stockout.stockoutdate', new Date());
		viewModel.set('stockout.usercreateid_link', session.id);
		viewModel.set('stockout.status',-1);

		var isWindow = viewModel.get('isWindow');
		if(!isWindow){
			viewModel.set('stockout.stockouttypeid_link', id);
		}else{
			var stockouttypeid_link = viewModel.get('stockouttypeid_link');
			var po = viewModel.get('po');
			viewModel.set('stockout.stockouttypeid_link', stockouttypeid_link);
			viewModel.set('stockout.pcontract_poid_link', po.get('id'));
			viewModel.set('stockout.contract_number', po.get('po_buyer'));
		}

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
						// OrgToStore.loadStore(8, false);
						var listidtype = "8,4";
						OrgToStore.loadStore_allchildren_byorg(listidtype);
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
	onSave: function (isConfirm) {
		var mes = this.CheckValidate();
		var m=this;
		if (mes == "") {
			var viewModel = this.getViewModel();
			var stockout = viewModel.get('stockout');
			// console.log(stockout);

			var stockout_d = stockout.stockout_d;
			if(stockout_d != null){
				for(var i = 0; i < stockout_d.length; i++){
					if(stockout_d[i].id == 0 || typeof stockout_d[i].id === 'string'){
						stockout_d[i].id = null;
					}

					var stockout_packinglist = stockout_d[i].stockout_packinglist;
					if(stockout_packinglist != null){
						for(var j = 0; j < stockout_packinglist.length; j++){
							if(stockout_packinglist[j].id == 0 || typeof stockout_packinglist[j].id === 'string'){
								stockout_packinglist[j].id = null;
							}
							if(stockout_packinglist[j].stockoutdid_link == 0 || typeof stockout_packinglist[j].stockoutdid_link === 'string'){
								stockout_packinglist[j].stockoutdid_link = null;
							}
						}
					}
				}
			}

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
							if(isConfirm == false){
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: 'Lập phiếu thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
							m.getInfo(response.id, isConfirm);
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

	onBtnConfirm: function(){
        this.onSave(true);
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
			params.isAutoChecked = true; 
			// isAutoChecked = true -> stockin pklist sinh ra để status là ok
			// dha mạc định là ok (checked)

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

							viewModel.set('stockout', response.data);
							
							// m.onThoat();
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
    },

	onBtnThoatWindow: function (){
		var m = this;
		m.fireEvent('Thoat');
	},
	onBtnLuuWindow: function (){
		var m = this;
		var mes = this.CheckValidate();
		if (mes == "") {
			var viewModel = this.getViewModel();
			var stockout = viewModel.get('stockout');
			// console.log(stockout);
			var params = new Object();
			params.data = [];
			params.data.push(stockout);

			var mainView = Ext.getCmp('stockout_p_edit');
        	if(mainView) mainView.setLoading(true);

			GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create', Ext.JSON.encode(params),
				function (success, response, options) {
					if(mainView) mainView.setLoading(false);
					var response = Ext.decode(response.responseText);
					if (success) {
						if (response.respcode == 200) {
							m.getInfo(response.id);
							m.fireEvent('Luu');
						}
					} else {
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
		// m.fireEvent('Luu');
	},
});
