Ext.define('GSmartApp.view.invcheck.InvCheckNewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.invchecknew',
	packinglist:null,
    init: function() {
		this.packinglist=new Array();
        this.callParent(arguments);
		var productstore =  this.lookupReference('productcode').getStore();
		productstore.load({
			 params: {
				type: 1
			}
		});
		Ext.getStore('DeviceInvStore').loadStore(1);
		Ext.getStore('BossStore').loadStore(6);
	//	Ext.getStore('WareHouseStore').invCheckLoadStore(3);
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
		if(type.getId()=='lsinvcheck'){
			Ext.getStore('WareHouseStore').GetOrgDest('lsinvcheck');
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			viewModel.set('isEdit',true);
			this.onQrCode(id);
			this.getById(id);
			this.lookupReference('id').setValue(id);
		}
	},
	onUrlBack:function(type){
		var me=this;
		if(type.getId()=='lsinvcheck'){
			Ext.getStore('WareHouseStore').GetOrgDest('lsinvcheck');
			var view =this.getView();
			var formInvCheck = this.lookupReference('formInvCheck').getForm();
			var gridInvCheck = this.lookupReference('gridInvCheck');
			gridInvCheck.getStore().removeAll();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			viewModel.set('isEdit',false);
			formInvCheck.reset(true);
			var params = new Object();
			params.invcheckdatetime = new Date();
			//params.orgcheckid_link=GSmartApp.util.State.get('orgid_link');
			formInvCheck.setValues(params);
			try{
				view.qrcode._el.getElementsByTagName('img')[0].src="";
			}catch(e){}
		}
	},
	onBlack:function(){
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry = viewModel.get('urlback');
		this.redirectTo(entry.get('id'));
	},
	onDeviceChange:function( combo, newValue, oldValue, eOpts){
		var me=this;
		var txtDevice = me.lookupReference('device');
		var deviceId =txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if(device){
			GSmartApp.util.State.set('device_invcheck', device.data);
		}
		
	},
	onHidden:function(){
		var view =this.getView();
		var viewModel = view.getViewModel();
		var formMaster = this.lookupReference('formMaster');
		var IsformMaster = formMaster.getHidden();
		viewModel.set('IsformMaster',!IsformMaster);
		
		formMaster.setHidden(!IsformMaster);
	},
	onInvCheckCreate:function(){
		var me=this;
		var formInvCheck = this.lookupReference('formInvCheck').getForm();
		var data =formInvCheck.getValues();
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry= viewModel.get('urlback');
		if(data.orgcheckid_link!='' && data.orgcheckid_link!=null){
			var params=new Object();
			params.msgtype ="INVCHECK_CREATE";
			params.message = "Tạo hóa đơn";
			params.orgfrom_code = data.orgcheckid_link;
			params.productcode = data.p_skuid_link;
			params.bossid = data.bossid_link;
			params.extrainfo = data.extrainfo;
			
			me.getView().setLoading(true);
			GSmartApp.Ajax.post('/api/v1/invcheck/invcheck_create',Ext.JSON.encode(params),
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
					if(300==response.respcode){
						Ext.Msg.show({ 
						  title: 'Vui lòng đóng phiên kiểm kê trước khi tạo phiên mới',
						  msg: null, 
						  buttons: [{
							itemId: 'cancel',   
							text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale], 
						  }]
						});
					}
					if(response.data!=null && response.data.length>0){
					//	me.getById(response.data[0].id);
						me.redirectTo(entry.get('urlc')+"/"+response.data[0].id+"/edit");
					}
				}
				me.getView().setLoading(false);
			})
		}else{
			Ext.Msg.show({ 
			  title: 'Vui lòng chọn kho/cửa hàng kiểm kê',
			  msg: null, 
			  buttons: [{
				itemId: 'cancel',   
				text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale], 
			  }]
			});
		}
	},
	getById:function(invcheckid){
		var me=this;
		var formInvCheck = this.lookupReference('formInvCheck').getForm();
		var gridInvCheck = this.lookupReference('gridInvCheck');
		me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/invcheck/invcheck_getbyid','{"id": '+invcheckid+'}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				var data = response.data[0];
				if(data!=null){
					data.invcheckdatetime = new Date(data.invcheckdatetime);
					formInvCheck.setValues(data);
					gridInvCheck.getStore().removeAll();
					gridInvCheck.getStore().setData(data.skus);
				}
			}
			me.getView().setLoading(false);
		})
	},
	onInvCheckLoad:function(){
		var id = this.lookupReference('id').getValue();
		this.getById(id);
	},
	onPackinglist:function(grid,info){
		var me=this;
		var record = info.record.data;
		if(record.invcheckid_link && record.skuid_link){
			me.getView().setLoading(true);
			GSmartApp.Ajax.post('/api/v1/invcheck/invcheck_getepcbysku','{"invcheckid_link": '+record.invcheckid_link+',"skuid_link":'+record.skuid_link+'}',
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
					var data = response.data;
					if(data!=null){
						var form =Ext.create({
							xtype: 'window',
							width: 700,
							height: 550,
							margin:10,
							layout: 'fit',
							resizable: true,
							modal: true,
							items:[{
								title:GSmartApp.Locales.packinglist_chitiet[GSmartApp.Locales.currentLocale], 
								master_record:record,
								xtype: 'invcheckpackinglist'
							}]
						}).show();
						var grid = form.down('grid');
						var store = grid.getStore();
						store.removeAll();
						if(data!=null){
							store.setData(data);
						}
						form.down('comboboxfield').setValue(GSmartApp.Utils.deviceid);
						form.down('formpanel').setValues(record);
					}
				}
				me.getView().setLoading(false);
			})
		
		}
	},
	onQrCode:function(){
		var view  = this.getView();
		var refs = this.getReferences();
		if(view.qrcode ==null){
			view.qrcode = new QRCode("invCheckQrcode", {
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
});
