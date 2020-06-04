Ext.define('GSmartApp.view.salebill.SalebillCreateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salebillcreate',
    channel:null,
    sendChannel: null,
    stoken: null,
    funcid: '5',
	init: function() {
		this.channel = {cmd:null, dta:null};
		Ext.getStore('DevicePayStore').loadStore(4);
        this.callParent(arguments);
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
		
		if(type.getId()=='lssalebill'){
		//	Ext.getStore('OrgStore').GetOrgDest('lssalebill');
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			viewModel.set('isStart',false);
			viewModel.set('clsbtnStart',"blue-button");
			//this.onQrCode(id);
			this.getById(id);
			
			//set device
			var device = GSmartApp.util.State.get('device_pay');
			if(!device){
				var store = me.lookupReference('device').getStore();
				var data =store.getAt(0).data
				GSmartApp.util.State.set('device_pay', data);
				me.lookupReference('device').setValue(data.id);
			}else{
				me.lookupReference('device').setValue(device.id);
			}
		}
	},
	onUrlBack:function(type){
		//console.log(type);
		var me=this;
		/* Generate token */
		if(type.getId()=='lssalebill'){
		//	Ext.getStore('OrgStore').GetOrgDest('lssalebill');
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('isStart',false);
			viewModel.set('clsbtnStart',"blue-button");
			this.stoken = Ext.Number.randomInt(100000, 999999);
			me.fromMasterReset();
			
		}
	},
	fromMasterReset:function(){
		var me=this;
		var gridSalebill = this.lookupReference('gridSalebill');
		var gridSalebillEpc = this.lookupReference('gridSalebillEpc');
		var formMaster = this.lookupReference('formMaster');
		var formTotal = this.lookupReference('formTotal');
		gridSalebill.getStore().removeAll();
		gridSalebillEpc.getStore().removeAll();
		formTotal.reset(true);
		formMaster.reset(true);
		//set device
		var device = GSmartApp.util.State.get('device_pay');
		if(!device){
			var store = me.lookupReference('device').getStore();
			if(store.getAt(0)){
				var data =store.getAt(0).data
				GSmartApp.util.State.set('device_pay', data);
				me.lookupReference('device').setValue(data.id);
			}
		}else{
			me.lookupReference('device').setValue(device.id);
		}
		
		//set user
		var session = GSmartApp.util.State.get('session');
		var user;
		if(session){
			user =session.user;
		}
		var params = new Object();
		params.orgname= user.org_name;
		params.salesname = user.full_name;
		params.billdate=new Date();
		formMaster.getForm().setValues(params);
	},
	onDeviceChange:function(){
		var me=this;
		var txtDevice = me.lookupReference('device');
		var deviceId =txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if(device){
			GSmartApp.util.State.set('device_pay', device.data);
		}
	},
	onBlack:function(){
		this.redirectTo('lssalebill');
	},
	onIsTabEpc:function(){
		var view =this.getView();
		var viewModel = view.getViewModel();
		var isTabEpc =viewModel.get('isTabEpc');
		viewModel.set('isTabEpc',!isTabEpc);
	},
	onStart:function(){
		var session = GSmartApp.util.State.get('session');
		var user;
		if(session){
			user =session.user;
		}
		var me = this;

		var gridSalebill = me.lookupReference('gridSalebill');
		var store = gridSalebill.getStore();
		var gridSalebillEpc = me.lookupReference('gridSalebillEpc');
		var storeEpc = gridSalebillEpc.getStore();

        var params = new Object();
		var txtDevice = me.lookupReference('device');
		var host = GSmartApp.Utils.host;
        var port =GSmartApp.Utils.port;
		var deviceId = txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
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
		var clientid =GSmartApp.Ajax.getClientid();
		var termid =GSmartApp.Ajax.getTermid();
		var orgid_link = GSmartApp.util.State.get('orgid_link');
		me.channel.cmd = 'gsm5/term/'+termid+'/cmd';
		console.log("channel:" + me.channel.cmd);
		GSmartApp.Mqtt.connect(host, port, clientid, me.channel, function(topic, message) {
			if(topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);				
				if(jsonObj.ct==1) {
					if(jsonObj.cid == 'CMD_START_PAY') {
						me.channel.dta = 'gsm5/transaction/pos/'+jsonObj.respdata.token;
						GSmartApp.Mqtt.client.subscribe(me.channel.dta);
						console.log('register dta ch:'+me.channel.dta);
						var viewModel = me.getViewModel();
						viewModel.set('clsbtnStart',"");
						viewModel.set('clsbtnStop',"red-button");
						viewModel.set('isStart',true);
						
						
						GSmartApp.util.State.set('CMD','CMD_STOP_PAY');
						GSmartApp.util.State.set('sendChannel',me.sendChannel);
					}
				}
			} else if(topic.includes("transaction")) {
				var jsonObj = Ext.JSON.decode(message);
				var record = storeEpc.findRecord('epc',jsonObj.epc);
				if(!record){
					if(Number(jsonObj.rssi) >0){
						storeEpc.insert(0,jsonObj);
						var sku = store.findRecord('skucode',jsonObj.skucode);
						if(!sku){
							jsonObj.totalpackage = jsonObj.amount;
							store.insert(0,jsonObj);
						}else{
							store.beginUpdate();
							store.each(function(s){
								if(jsonObj.skucode==s.get('skucode')){
									var totalpackage = s.get('totalpackage');
									s.set('totalpackage',Number(totalpackage)+1);
									var totalsum = s.get('totalsum');
									s.set('totalsum',totalsum+Number(jsonObj.totalsum));
								}
							});
							store.endUpdate();
						}
						var totalamount =gridSalebillEpc.getStore().sum('totalamount');
						var totalvat =gridSalebillEpc.getStore().sum('totalvat');
						var totalsum =gridSalebillEpc.getStore().sum('totalsum');
						var discount =gridSalebillEpc.getStore().sum('discount');
						var params = new Object();
						params.discount=Ext.util.Format.number(discount,'0,0.00');
						params.totalamount = Ext.util.Format.number( totalamount,'0,0.00');
						params.totalvat= Ext.util.Format.number( totalvat,'0,0.00');
						params.totalsum =  Ext.util.Format.number(totalsum,'0,0.00');
						me.lookupReference('formTotal').getForm().setValues(params);
					}
				}
				
			}
		},
		function() {
			me.sendChannel = 'gsm5/device/'+device.data.code+'/cmd';
			me.funcid = '5;' + orgid_link;
	   		var cmd = {ct:0,cid:"CMD_START_PAY", srcid:termid, reqdata:{timeout:20000,token:me.stoken,funcid:me.funcid}};
	   		//console.log("Device channel:"+sendChannel);
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
		var me =this;
		var viewModel = me.getViewModel();
	    viewModel.set('clsbtnStart',"blue-button");
		viewModel.set('clsbtnStop',"");
		viewModel.set('isStart',false);
		var termid =GSmartApp.Ajax.getTermid();
		if (GSmartApp.Mqtt.client) {
	   		var cmd = {ct:0,cid:"CMD_STOP_PAY", srcid:termid, reqdata:{timeout:20000,token:me.stoken}};
	   		console.log("Device channel:"+me.sendChannel);
	   		var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
	   		GSmartApp.Mqtt.client.send(message);
   		} 

	   	me.channel.dta = null;
	   	GSmartApp.Mqtt.onDisconnect();
	},
	onSave:function(){
		var me=this;
		me.onStop();
		var gridSalebill = this.lookupReference('gridSalebill');
		var gridSalebillEpc = this.lookupReference('gridSalebillEpc');
		var formMaster = this.lookupReference('formMaster');
		var formTotal = this.lookupReference('formTotal');
		var salebill = formMaster.getValues();
		salebill.billdate =new Date(salebill.billdate);
		salebill.customerbirday=new Date(salebill.customerbirday);
		salebill.discount = formTotal.getForm().getValues().discount.replace(/[^0-9\.]/g, '');
		salebill.totalamount = formTotal.getForm().getValues().totalamount.replace(/[^0-9\.]/g, '');
		salebill.totalvat = formTotal.getForm().getValues().totalvat.replace(/[^0-9\.]/g, '');
		salebill.totalsum = formTotal.getForm().getValues().totalsum.replace(/[^0-9\.]/g, '');
		var items = gridSalebillEpc.getStore().getData().items;
		var dataEpc =new Array();
		for(var i in items){
			var item = items[i].data;
			if(isNaN(item.id)){
				item.id = null;
			}
			dataEpc.push(item);
		}
		salebill.epcs =dataEpc;
		
		var items = gridSalebill.getStore().getData().items;
		var dataSku =new Array();
		for(var i in items){
			var item = items[i].data;
			if(isNaN(item.id)){
				item.id = null;
			}
			dataSku.push(item);
		}
		salebill.skus =dataSku;
		
		var data =new Array();
		data.push(salebill);
		var params=new Object();
		params.msgtype ="SALEBILL_CREATE";
		params.message = "Tạo hóa đơn bán hàng";
		params.data = data;
		GSmartApp.Ajax.post('/api/v1/salebill/salebill_create',Ext.JSON.encode(params),
		function(success,response,options ) {
			if(success){
				console.log(response.responseText);
				var response = Ext.decode(response.responseText);
				if(200 == response.respcode){
					if(isNaN(salebill.id) || salebill.id==null){
						me.fromMasterReset();
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
		})
	},
	onPay:function(){
		var form =Ext.create({
				xtype: 'window',
				width: 400,
				height: 430,
				margin:10,
				layout: 'fit',
				resizable: true,
				modal: true,
				items:[{
					title:GSmartApp.Locales.thanhtoan[GSmartApp.Locales.currentLocale],
					xtype: 'salebillpayment'
				}]
			}).show();
	},
	onDelete:function(grid, info){
	    var gridSalebill = this.lookupReference('gridSalebill');
		var gridSalebillEpc = this.lookupReference('gridSalebillEpc');
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
				gridSalebillEpc.getStore().remove(info.record);
				var store =gridSalebill.getStore();
				store.beginUpdate();
				store.each(function(s){
					if(info.record.get('skucode')==s.get('skucode')){
						store.beginUpdate();
						store.each(function(s){
							if(jsonObj.skucode==s.get('skucode')){
								var amount = s.get('amount');
								s.set('amount',Number(amount)-1);
								var totalsum = s.get('totalsum');
								s.set('totalsum',totalsum-Number(info.record.totalsum));
							}
						});
						store.endUpdate();
					}
					
				});
				store.endUpdate();  
			  }
		  }  
		});
		
	},
	getById:function(id){
		var me=this;
		var formMaster = this.lookupReference('formMaster');
		var gridSalebill = this.lookupReference('gridSalebill');
		var gridSalebillEpc = this.lookupReference('gridSalebillEpc');
		var device = GSmartApp.util.State.get('device');
		var session = GSmartApp.util.State.get('session');
	    me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/salebill/salebill_getbyid','{"id": '+id+'}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				var data = response.data;
				if(data!=null){
					data.billdate =new Date(data.billdate);
					data.customerbirday=new Date(data.customerbirday);
					formMaster.getForm().setValues(data);
					//me.lookupReference('device').setValue(device.id);
					gridSalebillEpc.getStore().removeAll();
					gridSalebillEpc.getStore().setData(data.epcs);
					
					gridSalebill.getStore().removeAll();
					gridSalebill.getStore().setData(data.skus);
					
					var totalamount =gridSalebillEpc.getStore().sum('totalamount');
					var totalvat =gridSalebillEpc.getStore().sum('totalvat');
					var totalsum =gridSalebillEpc.getStore().sum('totalsum');
					var discount =gridSalebillEpc.getStore().sum('discount');
					var params = new Object();
					params.discount=Ext.util.Format.number(discount,'0,0.00');
					params.totalamount = Ext.util.Format.number( totalamount,'0,0.00');
					params.totalvat= Ext.util.Format.number( totalvat,'0,0.00');
					params.totalsum =  Ext.util.Format.number(totalsum,'0,0.00');
					me.lookupReference('formTotal').getForm().setValues(params);
				}
			}
			 me.getView().setLoading(false);
		})
	},
	onAddSkuEnter:function(btn, e, eOpts ){
		var me=this;
		if(13==e.charCode){
			me.onAddSku();
		}
	},
	onAddSku:function(){
		var me =this;
		var skucode = this.lookupReference('txtSkucode').getValue();
		var gridSalebill = this.lookupReference('gridSalebill');
		 me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/categoty/getSkuByCode','{"skucode": "'+skucode+'"}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
					var data = response.data;
					if(data.length>0){
						var date = new Date();
						var ticks = date.getTime();
						gridSalebill.getStore().insert(0,{
							'id':'TEMP'+ticks,
							'skucode':data[0].code,
							'skuname':data[0].name,
							'skuid_link':data[0].id,
							'colorcode':data[0].colorcode,
							'colorname':data[0].colorname,
							'colorid_link':data[0].colorid_link,
							'unitcode':data[0].unitcode,
							'unitid_link':data[0].unitid_link,
							'unitname':data[0].unitname,
							'unitprice':data[0].unitname,
							'amount':data[0].amount,
							'discountpercent':data[0].discountpercent,
							'discount':data[0].discount,
							'totalamount':data[0].totalamount,
							'vatpercent':data[0].vatpercent,
							'totalvat':data[0].totalvat,
							'totalsum':data[0].totalsum
							});
						me.lookupReference('txtSkucode').setValue('');
						var totalamount =gridSalebill.getStore().sum('totalamount');
						var totalvat =gridSalebill.getStore().sum('totalvat');
						var totalsum =gridSalebill.getStore().sum('totalsum');
						var params = new Object();
						params.discount=Ext.util.Format.number( discount,'0,0.00');
						params.totalamount = Ext.util.Format.number( totalamount,'0,0.00');
						params.totalvat= Ext.util.Format.number( totalvat,'0,0.00');
						params.totalsum =  Ext.util.Format.number(totalsum,'0,0.00');
						me.lookupReference('formTotal').getForm().setValues(params);
						
					}
			}
			 me.getView().setLoading(true);
		})
		
	},
	onCustomerEnter:function(btn, e, eOpts){
		if(13==e.charCode){
			this.onCustomer();
		}
	},
	onCustomer:function( ){
		var formMaster = this.lookupReference('formMaster');
		var customercode = this.lookupReference('customercode').getValue();
		GSmartApp.Ajax.post('/api/v1/customer/customer_getbycode','{"customercode": "'+customercode+'"}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				var data = response.data;
				if(data.length>0){
					data[0].id =null;
					data[0].customerbirday =new Date(data[0].customerbirday).toLocaleDateString();
					formMaster.setValues(data[0]);
				}
			}
		})
	}
	
})