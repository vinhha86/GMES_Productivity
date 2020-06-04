Ext.define('GSmartApp.view.tagencode.TagEncodeListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tagencodelist',
	channelEncode:null,
	stoken: null,
	funcid: '6',
	init: function() {
		this.channelEncode = {cmd:null, dta:null};
	    Ext.getStore('DeviceEncodeStore').loadStore(3);
        this.callParent(arguments);
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onUrlBack',
				encodePush:'onEncodePush',
            }
        }
    },
	onUrlBack:function(type){
		var me =this;
		
		if(type.getId()=='lstagencode'){
			var view =me.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			var temperature = Ext.util.Format.number(0,'0,0');
			viewModel.set('tagnumber',temperature);
			
			var device = GSmartApp.util.State.get('device_encode');
			if(!device){
				var data = me.lookupReference('device').getStore().getAt(0).data;
				GSmartApp.util.State.set('device_encode', data);
				me.lookupReference('device').setValue(data.id);
			}else{
				me.lookupReference('device').setValue(device.id);
			}
		}
		
		
	},
	onDeviceChange:function(){
		var me=this;
		var txtDevice = me.lookupReference('device');
		var deviceId =txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if(device){
			GSmartApp.util.State.set('device_encode', device.data);
		}
	},
	onStart:function(){
		var me = this;
		var view =me.getView();
		var viewModel = view.getViewModel();
		me.onLoadData()
		var session = GSmartApp.util.State.get('session');
		var user;
		if(session){
			user =session.user;
		}
		var gridTagEncode = me.lookupReference('gridTagEncode');
		var store = gridTagEncode.getStore();

        var params = new Object();
        var host = GSmartApp.Utils.host;
        var port =GSmartApp.Utils.port;
		var txtDevice = me.lookupReference('device');
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
		var clientid ='test#123';//GSmartApp.Ajax.getClientid();
		var termid ='11222';//GSmartApp.Ajax.getTermid();
		var orgid_link = GSmartApp.util.State.get('orgid_link');
		/* Generate token */
   		me.stoken = Ext.Number.randomInt(100000, 999999);
		me.channelEncode.cmd = 'gsm5/term/'+termid+'/cmd';
		GSmartApp.Mqtt.connect(host, port, clientid, me.channelEncode, function(topic, message) {
			if(topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);				
				if(jsonObj.ct==1) {
					if(jsonObj.cid == 'CMD_START_ENCODE') {
						me.channelEncode.dta = 'gsm5/transaction/enc/'+jsonObj.respdata.token;
						GSmartApp.Mqtt.client.subscribe(me.channelEncode.dta);
						viewModel.set('clsbtnStart',"");
						viewModel.set('clsbtnStop',"red-button");
						viewModel.set('isStart',true);
					}
				}
			} else if(topic.includes("transaction")) {
				//console.log('trans-msg:' + message);
				var jsonObj = Ext.JSON.decode(message);
				var record = store.findRecord('epc',jsonObj.epc);
				if(!record){
					if(Number(jsonObj.rssi) >0){
						store.insert(0,jsonObj);
						var temperature = Ext.util.Format.number(store.count(),'0,0');
						viewModel.set('tagnumber',temperature);
						
						me.fireEvent('encodePush', jsonObj);
					}else{
						Ext.Msg.alert(GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale], 'Epc trùng');
					}
				}
				
			}
			
		},
		function() {
			var sendChannel = 'gsm5/device/'+device.data.code+'/cmd';
	   		var cmd = {ct:0,cid:"CMD_START_ENCODE", srcid:termid, reqdata:{timeout:20000,token:"",funcid:me.funcid,orgid_link:orgid_link}};
	   		var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = sendChannel;
			message.qos = 0;
	   		GSmartApp.Mqtt.client.send(message);
			
		},function(){
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnStop',"");
			viewModel.set('isStart',false);
		});	
	},
	onStop:function(){
		var me=this;
		var viewModel = me.getViewModel();
	    viewModel.set('clsbtnStart',"blue-button");
		viewModel.set('clsbtnStop',"");
		viewModel.set('isStart',false);
		GSmartApp.Mqtt.onDisconnect();
		this.channelEncode.dta = null;
	},
	onEncodePush:function(data){
		var txtDevice = this.lookupReference('device');
		var deviceId = txtDevice.getValue();
		var record =new Object();
		record.epc=data.epc;
		record.oldepc=data.oldepc
		record.sku=data.skucode;
		record.tid=data.tid;
		record.deviceid_link=deviceId;
		var params=new Object();
		var data =new Array();
		data.push(record);
		var params=new Object();
		params.msgtype ="STOCKIN_CREATE";
		params.message = "Tạo hóa đơn";
		params.data = data;
		GSmartApp.Ajax.post('/api/v1/encode/encode_create',Ext.JSON.encode(params),
		function(success,response,options ) {
		})
	},
	onLoadData:function(){
		me=this;
		var view =me.getView();
		var viewModel = view.getViewModel();
		var deviceid = this.lookupReference('device').getValue();
		var params = new Object();
		params.deviceid=deviceid;
		var gridTagEncode = this.lookupReference('gridTagEncode');
		var store = gridTagEncode.getStore();
		me.getView().setLoading(true);
		GSmartApp.Ajax.setProxy(store,'/api/v1/encode/encode_getbydevice',params,function(records, operation, success) {
			
			var temperature = Ext.util.Format.number(store.count(),'0,0');
			viewModel.set('tagnumber',temperature);
			me.getView().setLoading(false);
			
		});
		
		
	},
	onDelete:function(tree, info){
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
					//Ext.Viewport.setMasked({ xtype: 'loadmask' });
					//GSmartApp.Ajax.post('/gsmartinv/api/v1/invoice/invoice_deletebyid','{"invoiceid": '+info.record.id+'}',
					//function(success,response,options ) {
					//	Ext.Viewport.setMasked(false);
					//})
							
			  }
		  }  
		});
	},
	cachedConfig: {
        tpl: '<div class="demo-weather">' +
            '<tpl for=".">' +
                '<div class="day">' +
					'<div class="temp">{temperature}</div>' +
                '</div>' +
            '</tpl>' +
        '</div>'
    },

    GSmartApplyTpl: function(tpl) {
        return Ext.XTemplate.get(tpl);
    }
})

