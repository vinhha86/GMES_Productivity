Ext.define('GSmartApp.view.stockout.Stockout_M_EditController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_M_EditController',
	init: function(){
		var devicestore = this.getViewModel().getStore('DeviceInvStore');
		devicestore.loadStore(3);

		var viewModel = this.getViewModel();
		var UnitStore = viewModel.getStore('UnitStore');
		UnitStore.loadStore();
		var UnitStoreFilters = UnitStore.getFilters();
		if (!this.UnitStoreFilters) {
            this.UnitStoreFilters = UnitStoreFilters.add({
                id: 'UnitStoreFilters',
                property: 'unittype',
                value: 0,
                exactMatch: true,
            });
        }
	},
	listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData',
				urlBack:'onUrlBack'
            }
        }
	},
	control:{
		'#btnThuGon':{
			click: 'onhiddenMaster'
		},
		'#btnMoRong':{
			click: 'onhiddenMaster'
		},
		'#loaitien':{
			select: 'onSelectCurency'
		},
        '#btnConfirm':{
            click: 'onConfirm'
        },
		'#cmbStockoutGroup': {
			select: 'onSelectGroupStockout'
		},
		'#Stockout_M_Edit_D': {
			itemclick: 'onStockout_M_Edit_D_Itemclick'
		},
		'#btnThemSP': {
			click: 'onBtnThemSP'
		},
	},
	channel: { cmd: null, dta: null },
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
	},
	renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var UnitStore = viewModel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
    },
	onhiddenMaster: function(){
		var view =this.getView();
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('stockout_m_edit_m');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster',!isHidden);
		
		formMaster.setHidden(!isHidden);
	},
	onSelectCurency: function(combo, record, eOpts ){
		var viewModel = this.getViewModel();
		viewModel.set('stockout.vat_exchangerate', record.data.exrate);
	 },
	 onSelectGroupStockout: function(combo, record, eOpts){
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
	onDeviceChange:function( combo, newValue, oldValue, eOpts){
		var me=this;
		var txtDevice = me.lookupReference('device');
		var deviceId =txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if(device){
			GSmartApp.util.State.set('device_inv', device.data);
		}
		
	},
    onUrlBack:function(type){ 
        this.redirectTo("stockout_m");
    },
    onLoadData:function(id,type){
        this.getInfo(id);
	},
	getInfo: function(id){
        var me = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockoutD_Store');
        var listepc = viewModel.get('listepc');

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
				var stockout = response.data;
				if(stockout.unitid_link == null) stockout.unitid_link = 1;
                viewModel.set('stockout', stockout);
                for(var i=0; i<response.listepc.length; i++){
                    listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                }
                store.setData(response.data.stockout_d);
				store.commitChanges();

				if(response.data.stockouttypeid_link == 1) { // xuat den cat
					var OrgToStore = viewModel.getStore('OrgToStore');
					OrgToStore.loadStore(17, false);
				}
				if(response.data.stockouttypeid_link == 2) { // xuat den to sx
					var OrgToStore = viewModel.getStore('OrgToStore');
					OrgToStore.loadStore(14, false);
				}

				console.log(stockout);
            }
		})
    },
    onNewData:function(node, id, type){
		var m = this;
		var viewModel = this.getViewModel();

		// lấy id stockout_order truyền vào -> xoá trong State
		var stockoutorderidObj = GSmartApp.util.State.get('stockoutorderidObj');
		if(stockoutorderidObj != null){
			viewModel.set('stockoutorderid_link', stockoutorderidObj.id)
			GSmartApp.util.State.set('stockoutorderidObj', null);
		}

		var session = GSmartApp.util.State.get('session');
        viewModel.set('stockout.stockoutdate',new Date());
		viewModel.set('stockout.usercreateid_link', session.id);
		viewModel.set('stockout.orgid_from_link', session.org_grant_id_link);
		viewModel.set('listepc', new Map());
        viewModel.set('stockout.stockouttypeid_link', id);
        viewModel.set('stockout.unitid_link', 1);
        viewModel.set('stockout.status', 0);
		viewModel.set('stockout.id', null);

		// console.log(session);
		// set store org from
        if(id == 1) { // xuat den cat
            var OrgToStore = viewModel.getStore('OrgToStore');
            OrgToStore.loadStore(17, false);
        }
		if(id == 2) { // xuat den to sx
			var OrgToStore = viewModel.getStore('OrgToStore');
            OrgToStore.loadStore(14, false);
		}

		var stockoutorderid_link = viewModel.get('stockoutorderid_link');
		if(stockoutorderid_link != null){
			m.loadStockoutOrderData();
		}
	},
	loadStockoutOrderData: function(){
		var me = this.getView();
		var m = this;
		var viewModel = this.getViewModel();

		var stockoutorderid_link = viewModel.get('stockoutorderid_link');

		var params=new Object();
		params.id = stockoutorderid_link;

		me.setLoading("Đang tải dữ liệu");
		GSmartApp.Ajax.postJitin('/api/v1/stockoutorder/stockoutorder_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
			me.setLoading(false);
				if (success) {
					var response = Ext.decode(response.responseText);
					if (response.respcode == 200) {
						console.log(response);
						// đang làm đến đây
						var stockout_order = response.data;
						m.setStockoutOrderData(stockout_order);
					}
				} else {
					var response = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						title: "Thông báo",
						msg: 'Lấy thông tin Stockout_Order thất bại: ' + response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}
		})	
	},
	setStockoutOrderData: function(stockout_order){
		var me = this.getView();
		var m = this;
		var viewModel = this.getViewModel();

		var stockout_order_ds = stockout_order.stockout_order_d == null ? new Array() : stockout_order.stockout_order_d;
		// console.log(stockout_order_ds);
		viewModel.set('stockout.stockout_order_code', stockout_order.stockout_order_code);
		viewModel.set('stockout.porderid_link', stockout_order.porderid_link);
		viewModel.set('stockout.pcontractid_link', stockout_order.pcontractid_link);
		// viewModel.set('stockout.invoice_date', stockout_order.timecreate);
		viewModel.set('stockout.stockoutorderid_link', stockout_order.id);
		viewModel.set('stockout.stockout_d', null);
		viewModel.set('stockout.orgid_from_link', stockout_order.orgid_from_link);
		viewModel.set('stockout.orgid_to_link', stockout_order.orgid_to_link);

		var stockout = viewModel.get('stockout');
		var stockout_d = viewModel.get('stockout.stockout_d');
		if (stockout_d == null) {
			stockout_d = new Array();
		}

		for (var i = 0; i < stockout_order_ds.length; i++) {
			var stockout_order_d = stockout_order_ds[i];
			// var found = stockout_d.some(item => item.skuid_link === npl.get('id'));
			var found = false;
			if (!found) {
				var stockout_dObj = new Object();
				stockout_dObj.skuid_link = stockout_order_d.material_skuid_link;
				stockout_dObj.p_skuid_link = stockout_order_d.material_skuid_link;
				stockout_dObj.porderid_link = stockout_order.porderid_link;
				stockout_dObj.skucode = stockout_order_d.skucode;
				stockout_dObj.skuname = stockout_order_d.skuname;
				stockout_dObj.color_name = stockout_order_d.tenMauNPL;
				stockout_dObj.colorid_link = stockout_order_d.colorid_link;
				stockout_dObj.size_name = stockout_order_d.coKho;
				stockout_dObj.unitprice = stockout_order_d.unitprice;

				stockout_dObj.sku_product_color = stockout_order_d.sku_product_color;
				stockout_dObj.sku_product_desc = stockout_order_d.sku_product_desc;

				stockout_dObj.totalpackage = stockout_order_d.totalpackage == null ? 0 : stockout_order_d.totalpackage;
				stockout_dObj.totalpackagecheck = 0;

				stockout_dObj.unitid_link = stockout.unitid_link;
				stockout_dObj.unit_name = stockout_order_d.unitname;
				if (stockout_dObj.unitid_link == 3) { //YDS
					stockout_dObj.totalmet_origin = stockout_order_d.totalyds == null ? 0 : stockout_order_d.totalyds * 0.9144;
					stockout_dObj.totalmet_check = 0;
					stockout_dObj.totalydsorigin = stockout_order_d.totalyds == null ? 0 : stockout_order_d.totalyds;
					stockout_dObj.totalydscheck = 0;
				} else {
					if (stockout_dObj.unitid_link == 1) { //Mét
						stockout_dObj.totalmet_origin = stockout_order_d.totalmet == null ? 0 : stockout_order_d.totalmet;
						stockout_dObj.totalmet_check = 0;
						stockout_dObj.totalydsorigin = stockout_order_d.totalmet == null ? 0 : stockout_order_d.totalmet * 1.09361;
						stockout_dObj.totalydscheck = 0;
					}
				}

				stockout_d.push(stockout_dObj);
			}
		}

		viewModel.set('stockout.stockout_d', stockout_d);
		// console.log(stockout_order);
		// console.log(stockout);
	},
	CheckValidate: function(){
		var mes = "";
		var stockout = this.getViewModel().get('stockout');
		if(stockout.stockouttypeid_link == null){
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (stockout.orgid_from_link == null){
			mes = "Bạn chưa chọn nơi xuất";
		}
		else if (stockout.orgid_to_link == null){
			mes = "Bạn chưa chọn nơi nhập";
		} 
		else if (stockout.stockoutd.length == 0){
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
    onSave: function(){
		var me = this.getView();
        var m = this;
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

		var params=new Object();
		params.data = [];
		params.data.push(stockout);

		me.setLoading("Đang lưu dữ liệu");
		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_create',Ext.JSON.encode(params),
		function(success,response,options ) {
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
						this.redirectTo("stockout_m/" + response.id + "/edit");
						m.getInfo(response.id);
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
    },
	onStart:function(){
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockoutD_Store');
		var stockout = viewModel.get('stockout');
		var session = GSmartApp.util.State.get('session');
		listepc = viewModel.get('listepc');

		var listcode =[];

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
		else{
			var termid 		= config.getTermid();
		//var orgid_link = GSmartApp.util.State.get('orgid_link');
		//console.log('orgid_link:' + orgid_link);
		/* Generate token */
		me.stoken = Ext.Number.randomInt(100000, 999999);

		me.channel.cmd = 'gsm5/term/'+termid+'/cmd';
		GSmartApp.Mqtt.connect(host, port, clientid, me.channel, deviceId, function(topic, message) {
			if(topic.includes("cmd")) {
				console.log('cmd data:' + message);
				var jsonObj = Ext.JSON.decode(message);	

				if(jsonObj.ct==1 && jsonObj.cid == 'CMD_START_INV') {
					if(jsonObj.respcode ==0) {
						me.channel.dta = 'gsm5/transaction/inv/'+jsonObj.respdata.token;
						GSmartApp.Mqtt.client.subscribe(me.channel.dta);
						console.log('register dta ch:'+me.channel.dta);
						viewModel.set('clsbtn',"blue-button");
						viewModel.set('clsbtnStart',"");
						viewModel.set('clsbtnStop',"red-button");
						viewModel.set('isStart',true);
						
						GSmartApp.util.State.set('CMD','CMD_STOP_INV');
						GSmartApp.util.State.set('sendChannel',me.sendChannel);

					} else {
						Ext.Msg.alert('Device:' + device , 'There are some problem when you start. Please press STOP before START!');
					}
				}

				//Khi het time out tu dong goi nut Stop
				if (jsonObj.ct==2 && jsonObj.cid == 'NTF_ON_STOP') {
					me.onStop();
				}
			} else if(topic.includes("transaction")) {
				// console.log(message);
				var jsonObj = Ext.JSON.decode(message);
				for(var x in jsonObj){
					// console.log('mqtt return object');
					// console.log(jsonObj[x]);
					//Nếu epc chưa có trong phiếu thì xử lý
					if(!listepc.has(jsonObj[x].epc)){
						listepc.set(jsonObj[x].epc, jsonObj[x].epc);
						
						var sku = store.findRecord('skucode',jsonObj[x].skucode);
						// console.log(sku);

						if(sku== null){
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
							var epc_item = new Object({id:null});
							epc_item.epc = jsonObj[x].epc;
							if (jsonObj[x].epcstate == 0){
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

								var epc_item = new Object({id:null});
								epc_item.epc = jsonObj[x].epc;
								epc_item.status = jsonObj[x].epcstate;
								if (jsonObj[x].epcstate == 0){
									epc_item.extrainfo = 'Chíp không có trong kho!!! Không thể xuất';
									epc_item.status = -1;
									sku.set('status',-1);
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
		}, function() {
			me.sendChannel = 'gsm5/device/'+device.data.code+'/cmd';
			me.funcid = '2'; /* FuncId: 2 -  StockIn; 3-StockOut*/
	   		var cmd = {ct:0,cid:"CMD_START_INV", srcid:termid, reqdata:{timeout:120000,token:me.stoken,funcid:me.funcid}};
	   		console.log("Device channel:"+me.sendChannel);
	   		var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
	   		GSmartApp.Mqtt.client.send(message);
			
		},function(){
			console.log('Loi connect');
			var viewModel = me.getViewModel();
			viewModel.set('clsbtn',"red-button");
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnStop',"");
			viewModel.set('isStart',false);
		});
		}
	},
	onStop:function(){
		var me = this;
		var viewModel = me.getViewModel();
		viewModel.set('clsbtn',"red-button");
		viewModel.set('clsbtnStart',"blue-button");
		viewModel.set('clsbtnStop',"");
		viewModel.set('isStart',false);
		var termid 		= GSmartApp.Ajax.getTermid();
		if (GSmartApp.Mqtt.client) {
	   		var cmd = {ct:0,cid:"CMD_STOP_INV", srcid:termid, reqdata:{token:me.stoken,funcid:me.funcid}};
	   		console.log("Device channel:"+me.sendChannel);
	   		var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
	   		GSmartApp.Mqtt.client.send(message);
   		}
   		me.channel.dta = null;
		   GSmartApp.Mqtt.onDisconnect();
		   GSmartApp.Mqtt.deviceid_link = 0;
	}    ,
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
    onEPCDetail: function(grid, rowIndex, colIndex){
        var record = grid.store.getAt(rowIndex);
        var form =Ext.create({
            xtype: 'stockout_epc_indow',
            reference:'stockout_epc_indow'
        });
		var viewModel = form.getViewModel();
        viewModel.set('stockout_d',record);

        form.show();
	},
	
	onViewPackingList: function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var stockout = viewmodel.get('stockout');
		console.log(stockout);
        var data = grid.getStore().getAt(rowIndex);
        var stockoutdid_link = data.get('id');

        // console.log(stockout);
        // console.log(data);
        // console.log(stockoutdid_link);

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
                    xtype: 'Stockout_packinglist',
					viewModel: {
						// type: 'Stockout_packinglist_ViewModel',
						data: {
							packinglist: {
								stockoutdid_link: stockoutdid_link,
								stockoutid_link: viewmodel.get('stockout.id'),
								skuid_link: data.get('skuid_link')
							},
							stockout: stockout,
							stockoutDRec: data
						}
					}					
                }],
            });
            form.show();
        }
    },

	onConfirm: function(){
		var me = this;
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
                xtype: 'Stockout_M_Edit_Confirm',
                viewModel: {
                    type: 'Stockout_M_Edit_ConfirmViewModel',
                    data: {
                        stockout: stockout,
                        stockoutId: stockoutId
                    }
                }
            }]
        });
        form.show();

		form.down('#Stockout_M_Edit_Confirm').getController().on('Confirmed', function (approver_userid_link) {

			viewModel.set('stockout.approver_userid_link', approver_userid_link);
			// viewModel.set('stockout.approve_date', new Date());
			// viewModel.set('stockout.status', 1);
			// viewModel.set('stockout.statusString', 'Đã duyệt');

			Ext.getCmp('Stockout_M_Edit').down('#btnConfirm').setHidden(true);
            Ext.getCmp('Stockout_M_Edit').down('#statusString').setValue('Đã duyệt');
			me.onApprove();
			
            form.close();
        })
    },
    onApprove: function(){
		var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
		var stockout = viewModel.get('stockout');
		var params=new Object();
		params.stockoutId = stockout.id;
		params.approver_userid_link = stockout.approver_userid_link;

		me.setLoading("Đang duyệt phiếu");
		GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_approve',Ext.JSON.encode(params),
		function(success,response,options ) {
			me.setLoading(false);
				if (success) {
					var response = Ext.decode(response.responseText);
					if (response.respcode == 200) {
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Duyệt phiếu thành công',
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});							
						this.redirectTo("stockout_m/" + response.id + "/edit");
						m.getInfo(response.id);
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
						msg: 'Lỗi duyệt phiếu: ' + response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}
		})	
    },	

	onMenu_Stockout_M_Edit_D_List: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Chi tiết hàng',
                    itemId: 'btnMenu_Stockout_M_Edit_D_List_Pkl',
                    separator: true,
                    margin: '10 0 0',
                    // iconCls: 'x-fa fas fa-edit brownIcon',
					iconCls: 'x-fa fas fa-edit',
                    handler: function () {
                        // console.log(record);
						me.onViewPackingList(grid, rowIndex);
                    },
                },
                {
                    text: 'Xoá dòng hàng',
                    itemId: 'btnMenu_Stockout_M_Edit_D_List_Delete',
                    separator: true,
                    margin: '10 0 0',
                    // iconCls: 'x-fa fas fa-trash redIcon',
					iconCls: 'x-fa fas fa-trash',
                    handler: function () {
                        // console.log(record);
						me.onDeleteStockoutD(grid, rowIndex);
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
	onDeleteStockoutD: function(grid, rowIndex){
		var me = this;
		var viewmodel = this.getViewModel();
		var stockout = viewmodel.get('stockout');
        var data = grid.getStore().getAt(rowIndex);

		Ext.Msg.show({
			title: 'Thông báo',
			msg: 'Bạn có chắc chắn xóa nguyên phụ liệu ' + data.get('skucode') + '?',
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
					if(isNaN(id) || id == null || id == 0){ // chưa có trong db
						me.deleteRow_Stockout_D(data);
					}else{ // đã có trong db
						me.deleteRowDb_Stockout_D(data);
					}
				}
			}
		});
	},
	deleteRow_Stockout_D: function(data){
		var me = this;
		var viewmodel = this.getViewModel();
		var stockout = viewmodel.get('stockout');
		var stockout_d = viewmodel.get('stockout.stockout_d');
		var id = data.get('id');

		for(var i = 0; i < stockout_d.length; i++) {
			if(stockout_d[i].id == id){
				stockout_d.splice(i,1);
				break;
			}
		}
		var stockout_dStore = this.getView().down('Stockout_M_Edit_D').getStore();
		if(stockout_dStore){
			stockout_dStore.removeAll();
			stockout_dStore.insert(0, stockout_d);
		}
		viewmodel.set('stockout.stockout_d', stockout_d);
		// console.log(stockout);
	},
	deleteRowDb_Stockout_D: function(data){
		var me = this;
		var m = this.getView();
		var viewmodel = this.getViewModel();
		var stockout = viewmodel.get('stockout');
		var stockout_d = viewmodel.get('stockout.stockout_d');
		var id = data.get('id');

		m.setLoading(true);

		var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockout_d/stockoutd_delete',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
			m.setLoading(false);
            if(response.respcode == 200) {
                for(var i = 0; i < stockout_d.length; i++) {
					if(stockout_d[i].id == id){
						stockout_d.splice(i,1);
						break;
					}
				}
				var stockout_dStore = m.down('Stockout_M_Edit_D').getStore();
				if(stockout_dStore){
					stockout_dStore.removeAll();
					stockout_dStore.insert(0, stockout_d);
				}
				viewmodel.set('stockout.stockout_d', stockout_d);
				// console.log(stockout);
            }
		})
	},
	onStockout_M_Edit_D_Itemclick: function(grid, record, item, index, e, eOpts){
		console.log(record.data);
	},
	checkSkuInDList: function(selectedRecord){
		var me = this;
		var m = this.getView();
		var viewmodel = this.getViewModel();
		var stockout_d = viewmodel.get('stockout.stockout_d');

		var skuid_link = selectedRecord.get('id');
		for(var i = 0; i < stockout_d.length; i++){
			if(stockout_d[i].skuid_link == skuid_link){
				return true;
			}
		}
		// console.log(stockout_d);
		return false;
	},
	onBtnThemSP: function(){
		var me = this;
		var m = this.getView();
		var viewmodel = this.getViewModel();
		var skucodeCbbox = m.down('#skucode');

		if(skucodeCbbox){
			var selectedRecord = skucodeCbbox.getSelectedRecord();
			if(selectedRecord){
				// check danh sách d đã có vải này chưa, có thông báo, chưa có thêm
				var isExist = me.checkSkuInDList(selectedRecord);
				if(isExist){ // thông báo
					Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Đã có loại vải này trong danh sách',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
				}else{ // thêm
					me.addSkuToDList(selectedRecord.data);
				}
			}else{
				console.log('no or null selectedRecord');
			}
		}
	},
	addSkuToDList: function(data){
		var me = this;
		var m = this.getView();
		var viewmodel = this.getViewModel();
		var stockout = viewmodel.get('stockout');
		var stockout_d = viewmodel.get('stockout.stockout_d');
		var Stockout_M_Edit_D = m.down('#Stockout_M_Edit_D');
		var store = Stockout_M_Edit_D.getStore();

		var newObj = new Object();
		newObj.color_name = data.color_name;
		newObj.colorid_link = data.color_id;
		newObj.id = null;
		newObj.p_skuid_link = data.id;
		newObj.product_code = data.product_code;
		newObj.size_name = data.size_name;
		newObj.sizeid_link = data.size_id;
		newObj.sku_product_code = data.product_code;
		newObj.sku_product_color = data.product_color;
		newObj.sku_product_desc = data.product_desc;
		newObj.skucode = data.code;
		newObj.skuid_link = data.id;
		newObj.skuname = data.name;
		newObj.status = -1;
		newObj.stockout_packinglist = [];
		newObj.stockoutid_link = stockout.id;
		newObj.unitid_link = stockout.unitid_link;

		stockout_d.push(newObj);
		store.setData([]);
		store.insert(0, stockout_d);
		store.commitChanges();

		// console.log(data);
	},
	onDItemEdit: function (editor, context, eOpts){
        // console.log('onInvoiceDItemEdit');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockout');
        var store = me.down('#Stockout_M_Edit_D').getStore();
        var stockoutD_data = context.record.data;

        if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
            store.rejectChanges();
            return;
        }

        if(context.field == 'totalpackage'){
            stockoutD_data.totalpackage = parseFloat(stockoutD_data.totalpackage);
        }
        if(context.field == 'netweight'){
            stockoutD_data.netweight = parseFloat(stockoutD_data.netweight);
        }
        if(context.field == 'grossweight'){
            stockoutD_data.grossweight = parseFloat(stockoutD_data.grossweight);
        }
        if(context.field == 'm3'){
            stockoutD_data.m3 = parseFloat(stockoutD_data.m3);
        }
        if(context.field == 'met'){
            stockoutD_data.met = parseFloat(stockoutD_data.met);
        }
        if(context.field == 'yds'){
            stockoutD_data.yds = parseFloat(stockoutD_data.yds);
        }
		if(context.field == 'totalmet_origin'){
            stockoutD_data.totalmet_origin = parseFloat(stockoutD_data.totalmet_origin);
        }
		if(context.field == 'totalmet_check'){
            stockoutD_data.totalmet_check = parseFloat(stockoutD_data.totalmet_check);
        }
		if(context.field == 'totalydsorigin'){
            stockoutD_data.totalydsorigin = parseFloat(stockoutD_data.totalydsorigin);
        }
		if(context.field == 'totalydscheck'){
            stockoutD_data.totalydscheck = parseFloat(stockoutD_data.totalydscheck);
        }

        if(stockin.unitid_link == 1){
            if(context.field == 'met' && (stockoutD_data.unitprice != null || stockoutD_data.unitprice != "")){
                // console.log('yds');
                stockoutD_data.yds = Ext.Number.roundToPrecision(stockoutD_data.met / 0.9144,2);
                stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.met*stockoutD_data.unitprice,2);
            }
            if(context.field == 'unitprice' && (stockoutD_data.met != null || stockoutD_data.met != "")){
                // console.log('unitprice');
                stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.met*stockoutD_data.unitprice,2);
            }

			if(context.field == 'totalmet_origin'){
				stockoutD_data.totalydsorigin = Ext.Number.roundToPrecision(stockoutD_data.totalmet_origin / 0.9144,2);
			}
        }else if(stockin.unitid_link == 3){
            if(context.field == 'yds' && (stockoutD_data.unitprice != null || stockoutD_data.unitprice != "")){
                // console.log('yds');
                stockoutD_data.met = Ext.Number.roundToPrecision(stockoutD_data.yds * 0.9144,2);
                stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.yds*stockoutD_data.unitprice,2);
            }
            if(context.field == 'unitprice' && (stockoutD_data.yds != null || stockoutD_data.yds != "")){
                // console.log('unitprice');
                stockoutD_data.totalamount = Ext.Number.roundToPrecision(stockoutD_data.yds*stockoutD_data.unitprice,2);
            }

			if(context.field == 'totalydsorigin'){
				stockoutD_data.totalmet_origin = Ext.Number.roundToPrecision(stockoutD_data.totalydsorigin * 0.9144,2);
			}
        }

        store.commitChanges();
    },
});
