Ext.define('GSmartApp.view.stockin.StockInProductController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockinproduct',
    channel:null,
    sendChannel: null,
	packinglist:null,
	stoken: null,
	storeSku:null,
	skus:[],
	funcid: '4',
    init: function() {
		this.packinglist=new Array();
		this.channel = {cmd:null, dta:null};
        this.callParent(arguments);
		Ext.getStore('DeviceInvStore').loadStore(1);
		var productstore =  this.lookupReference('productcode').getStore();
		productstore.load({
			params: {
				type: 1
			}
		});
		//Ext.getStore('OrgStore').loadStore(1);
		Ext.getStore('SkuStore').load({
			 params: {
				type: 1
			}
		});
    },
	listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
				urlBack:'onUrlBack'
            }
        }
    },
	onLoadData:function(id,type){
		var me=this;
		if(type.getId()=='lsstockinproduct'){
			Ext.getStore('OrgStore').GetOrgDest('lsstockinproduct');
			var view = me.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			viewModel.set('isStart',false);
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnSkuError',"");
			me.onQrCode(id);
			me.getById(id);
			
			//set device
			var device = GSmartApp.util.State.get('device_inv');
			if(!device){
				var store = me.lookupReference('device').getStore();
				var data =store.getAt(0).data
				GSmartApp.util.State.set('device_inv', data);
				me.lookupReference('device').setValue(data.id);
			}else{
				me.lookupReference('device').setValue(device.id);
			}
		}
	},
	onUrlBack:function(type){
		var me=this;
		//GSmartApp.Mqtt.onDisconnect();
		if(type.getId()=='lsstockinproduct'){
			Ext.getStore('OrgStore').GetOrgDest('lsstockinproduct');
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('isStart',false);
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnSkuError',"");
			me.fromMasterReset();
		}

		
	},
	fromMasterReset:function(){
		var me=this;
		var gridStockin = this.lookupReference('gridStockin');
		var gridSalebillEpc = this.lookupReference('gridStockinEpc');
		var formMaster = this.lookupReference('formStockin');
		var store = gridStockin.getStore().removeAll();
		var storeEpc = gridSalebillEpc.getStore().removeAll();
		formMaster.reset(true);
		
		var dataForm = new Object();
		//set device
		var device = GSmartApp.util.State.get('device_inv');
		if(!device){
			var store = me.lookupReference('device').getStore();
			var data =store.getAt(0)
			if(data){
				GSmartApp.util.State.set('device_inv', data.data);
				//me.lookupReference('device').setValue(data.id);
				dataForm.deviceid = data.data.id;
			}
		}else{
			//me.lookupReference('device').setValue(device.id);
			dataForm.deviceid = device.id;
		}
		dataForm.stockindate = new Date();
		//dataForm.orgid_from_link=GSmartApp.util.State.get('orgid_link');
		formMaster.getForm ().setValues(dataForm)
	},
	onBlack:function(){
		this.redirectTo("lsstockinproduct");
	},
	onDeviceChange:function(){
		var me=this;
		var txtDevice = me.lookupReference('device');
		var deviceId =txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if(device){
			GSmartApp.util.State.set('device_inv', device.data);
		}
	},
	
	onMenuChildTap: function(menu, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record.getId());
        }
    },
	sumTongString: function (grid, context) {
        return "Tổng";
    },
	renderSum: function (value) {
        return this.renderSign(value, '0.00');
    },
	onHidden:function(){
		var view =this.getView();
		var viewModel = view.getViewModel();
		var formMaster = this.lookupReference('formMaster');
		var IsformMaster = formMaster.getHidden();
		viewModel.set('IsformMaster',!IsformMaster);
		
		formMaster.setHidden(!IsformMaster);
	},
	onIsTabEpc:function(){
		var me=this;
		var view =this.getView();
		var viewModel = view.getViewModel();
		var isTabEpc =viewModel.get('isTabEpc');
		viewModel.set('isTabEpc',!isTabEpc);
	},
	onSave:function(){
		var me=this;
		try{
			me.onStop();
			var view =this.getView();
			var viewModel = view.getViewModel();
			var formStockin = this.lookupReference('formStockin');
			var gridStockin = this.lookupReference('gridStockin');
			var stockin = formStockin.getValues();
			stockin.stockindate =new Date(stockin.stockindate);
			if(!stockin.orgid_from_link){
				Ext.Msg.show({ 
					  title: 'Vui lòng chọn đơn vị cấp hàng',
					  msg: null, 
					  buttons: [{
						itemId: 'cancel',   
						text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale], 
					  }]
					});
			}
			var stockind =new Array();
			var items = gridStockin.getStore().getData().items;
			for(var i in items){
				var item = items[i].data;
				if(isNaN(item.id)){
					item.id = null;
				}
				console.log(item);
				stockind.push(item);
			}
			var totalpackage =gridStockin.getStore().sum('totalpackage');
			stockin.stockintypeid_link = 6;//nhap kho thành phẩm
			stockin.totalpackage=totalpackage;
			stockin.stockind =stockind;
			var data =new Array();
			data.push(stockin);
			var params=new Object();
			params.msgtype ="STOCKIN_CREATE";
			params.message = "Tạo hóa đơn";
			params.data = data;
			
			//Ext.Viewport.setMasked({ xtype: 'loadmask' });
			GSmartApp.Ajax.post('/api/v1/stockin/stockin_create',Ext.JSON.encode(params),
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
					if(isNaN(stockin.id) || stockin.id==null){
						me.fromMasterReset();
						
						skus=[];
						viewModel.set('clsbtnSkuError',"red-button");
					}
				}else{
					Ext.Msg.show({ 
					  title: 'Thêm mới/sửa thất bại',
					  msg: null, 
					  buttons: [{
						itemId: 'cancel',   
						text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale], 
					  }]
					});
				}
			//	Ext.Viewport.setMasked(false);
			})
		}catch(err){
			//Ext.Viewport.setMasked(false);
		}
	},
	getById:function(id){
		var me=this;
		var stockincode = this.lookupReference('stockincode');
		var formStockin = this.lookupReference('formStockin');
		var gridStockin = this.lookupReference('gridStockin');
		var gridStockinEpc = this.lookupReference('gridStockinEpc');
		me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/stockin/stockin_getbyid','{"id": '+id+'}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				var data = response.data;
				var epcs = response.epcs;
				if(data!=null){
					stockincode.setReadOnly(true);
					data.stockindate =new Date(data.stockindate);
					formStockin.getForm().setValues(data);
					gridStockin.getStore().removeAll();
					gridStockin.getStore().setData(data.stockind);
					
					gridStockinEpc.getStore().removeAll();
					gridStockinEpc.getStore().setData(epcs);
					
				}
			}
			me.getView().setLoading(false);
		})
	},
	onDelete:function(grid, info){
		var gridStockinEpc = this.lookupReference('gridStockinEpc');
		var gridStockin = this.lookupReference('gridStockin');
		Ext.Msg.show({ 
		  title: GSmartApp.Locales.title_xoa[GSmartApp.Locales.currentLocale],
		  msg: null, 
		  buttons: [{ 
			itemId: 'ok',  
			text: GSmartApp.Locales.btn_co[GSmartApp.Locales.currentLocale],   
			ui: 'action' 
		  }, {
			itemId: 'cancel',   
			text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale], 
		  }], 
		  fn: function(text,btn) {
			  if('ok'==text){
				if(!isNaN(info.record.id)){
					// goi server để delete 
				//	Ext.Viewport.setMasked({ xtype: 'loadmask' });
				//	GSmartApp.Ajax.post('/gsmartinv/api/v1/stockin/stockind_deleteid','{"id": '+info.record.id+'}',
				//	function(success,response,options ) {
				//		Ext.Viewport.setMasked(false);
				//	})
				}  
				gridStockinEpc.getStore().remove(info.record);
				var store =gridStockin.getStore();
				store.beginUpdate();
				store.each(function(s){
					if(info.record.get('skucode')==s.get('skucode')){
						var packinglist = s.get('packinglist');
						Ext.Array.each(packinglist, function(record, index, countriesItSelf) {
							if(record!=null && record.epc == info.record.get('epc')){
								Ext.Array.remove ( packinglist,record );
							}
							if(packinglist.length >0){
								s.set('packinglist',packinglist);
								s.set('totalpackage',Number(packinglist.length));
							}else{
								store.remove(s);
							}
						});
						
						
					}
					
				});
				store.endUpdate();
				
			  }
		  }  
		});
	},
	onPackinglist:function(grid, info){
		console.log(GSmartApp.Utils.deviceid);
		var record = info.record.data;
		//if(!isNaN(info.record.id)){
			var form =Ext.create({
					xtype: 'window',
					width: 750,
					height: 550,
					margin:10,
					layout: 'fit',
					resizable: true,
					modal: true,
					items:[{
						title:GSmartApp.Locales.packinglist_chitiet[GSmartApp.Locales.currentLocale], 
						master_record:record,
						master_store:grid.getStore(),
						xtype: 'stockinproductpackinglist'
					}]
				}).show();
				var grid = form.down('grid');
				var store = grid.getStore();
				store.removeAll();
				if(record.packinglist!=null){
					store.setData(record.packinglist);
				}
				form.down('formpanel').setValues(record);
		//}
	},
	onProductError:function(){
		var form =Ext.create({
				xtype: 'window',
				width: 950,
				height: 500,
				margin:10,
				layout: 'fit',
				resizable: true,
				modal: true,
				items:[{
					title:'Danh sách sản phẩm lỗi', 
					xtype: 'producterrorlist'
				}]
			}).show();
			var grid = form.down('grid');
			var store = grid.getStore();
			store.removeAll();
			if(skus!=null){
				store.setData(skus);
			}
		
	},
	onQrCode:function(){
		var view  = this.getView();
		var refs = this.getReferences();
		if(view.qrcode ==null){
			view.qrcode = new QRCode("stockinPQrcode", {
				text: "",
				width: 100,
				height: 100,
				colorDark : "#000000",
				colorLight : "#ffffff",
				correctLevel : QRCode.CorrectLevel.H
			})	
		}
		view.qrcode.clear(); // clear the code.
		view.qrcode.makeCode("xin chào"); // make another code.
	},
	onStart:function(){
		var session = GSmartApp.util.State.get('session');
		var user;
		if(session){
			user =session.user;
		}
		var me = this;
		var gridTagInv = this.lookupReference('gridStockin');
		var store = gridTagInv.getStore();
		var gridStockinEpc = this.lookupReference('gridStockinEpc');
		var storeEpc = gridStockinEpc.getStore();
		skus = new Array();
		
        var params 		= new Object();
        var host 		= GSmartApp.Utils.host;
        var port 		= GSmartApp.Utils.port;
        var clientid	='client_'+user;
		var txtDevice 	= me.lookupReference('device');
		var deviceId 	= txtDevice.getValue();
		var device 		= txtDevice.getStore().getById(deviceId);
		if(device==null || device.length==0){
			Ext.Msg.show({ 
			  title: GSmartApp.Locales.title_chonthietbi[GSmartApp.Locales.currentLocale],
			  msg: null, 
			  buttons: [{ 
				itemId: 'ok',  
				text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],   
				ui: 'action' 
			  }]
			}) ;
		}
		var termid 		= GSmartApp.Ajax.getTermid();
		var orgid_link = GSmartApp.util.State.get('orgid_link');
		/* Generate token */
		me.stoken = Ext.Number.randomInt(100000, 999999);

		me.channel.cmd = 'gsm5/term/'+termid+'/cmd';

		//if(GSmartApp.Mqtt.client && me.channel.dta == null ) {
		//	dosendCmdInv();
		//};
		GSmartApp.Mqtt.connect(host, port, clientid, me.channel, function(topic, message) {
			if(topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);				
				if(jsonObj.ct==1) {
					if(jsonObj.cid == 'CMD_START_INV') {
						me.channel.dta = 'gsm5/transaction/inv/'+jsonObj.respdata.token;
						GSmartApp.Mqtt.client.subscribe(me.channel.dta);
						console.log('register dta ch:'+me.channel.dta);
						var viewModel = me.getViewModel();
						viewModel.set('clsbtnStart',"");
						viewModel.set('clsbtnStop',"red-button");
						viewModel.set('isStart',true);
						
						
						GSmartApp.util.State.set('CMD','CMD_STOP_INV');
						GSmartApp.util.State.set('sendChannel',me.sendChannel);
					}
				}
			} else if(topic.includes("transaction")) {
				var jsonObj = Ext.JSON.decode(message);
				for(var x in jsonObj){
					
					var sku = store.findRecord('skucode',jsonObj[x].skucode);
					var record = storeEpc.findRecord('epc',jsonObj[x].epc);
					if(!record){
						var productcode =me.lookupReference('productcode').getValue(); 
				
						if(productcode && productcode != jsonObj[x].skuid_link){
							skus.push(jsonObj[x]);
							if(skus.length>0){
								var viewModel = me.getViewModel();
								viewModel.set('clsbtnSkuError',"red-button");
							}
						}else{
							if(Number(jsonObj[x].rssi)>0){
								//chưa co epc thi them vao
								jsonObj[x].totalpackage=1;
								storeEpc.insert(0,jsonObj[x]);
								
								//kiem tra sku da ton tai chua
								//chua co them sku dong thoi cho so luong =1
								//da co sku thi cong them 1
								if(!sku){
									jsonObj[x].totalpackage=1;
									var packinglist = new Array()
									var pkl = new Object();
									pkl.epc = jsonObj[x].epc;
									pkl.skuid_link = jsonObj[x].skuid_link;
									pkl.colorid_link = jsonObj[x].colorid_link;
									pkl.colorname = jsonObj[x].colorname;
									pkl.unitid_link = jsonObj[x].unitid_link;
									pkl.unitname = jsonObj[x].unitname;
									pkl.skucode = jsonObj[x].skucode;
									packinglist.push(pkl);
									jsonObj[x].packinglist=packinglist;
									store.insert(0,jsonObj[x]);
								}else{
									store.beginUpdate();
									store.each(function(s){
										if(jsonObj[x].skucode==s.get('skucode')){
											var totalpackage = s.get('totalpackage');
											s.set('totalpackage',Number(totalpackage)+1);
											var packinglist = s.get('packinglist');
											var pkl = new Object();
											pkl.epc = jsonObj[x].epc;
											pkl.skuid_link = jsonObj[x].skuid_link;
											pkl.colorid_link = jsonObj[x].colorid_link;
											pkl.colorname = jsonObj[x].colorname;
											pkl.unitid_link = jsonObj[x].unitid_link;
											pkl.unitname = jsonObj[x].unitname;
											pkl.skucode = jsonObj[x].skucode;
											packinglist.push(pkl);
											s.set('packinglist',packinglist);
										}
										
									});
									store.endUpdate();
								}
							}else{
								skus.push(jsonObj[x]);
								if(skus.length>0){
									var viewModel = me.getViewModel();
									viewModel.set('clsbtnSkuError',"red-button");
								}
							}
						}
					}
				}
			}
		}, function(){
		    me.sendChannel = 'gsm5/device/'+device.data.code+'/cmd';
			me.funcid = '4;' + orgid_link;
	   		var cmd = {ct:0,cid:"CMD_START_INV", srcid:termid, reqdata:{timeout:120000,token:me.stoken,funcid:me.funcid}};
	   		console.log("Device channel:"+me.sendChannel);
	   		var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
	   		GSmartApp.Mqtt.client.send(message);
			
		},function(){
			var viewModel = me.getViewModel();
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnStop',"");
			viewModel.set('isStart',false);
		});
			
		
	},
	onStop:function(){
		var me = this;
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

	   	var viewModel = me.getViewModel();
		viewModel.set('clsbtnStart',"blue-button");
		viewModel.set('clsbtnStop',"");
		viewModel.set('isStart',false);
	}

});