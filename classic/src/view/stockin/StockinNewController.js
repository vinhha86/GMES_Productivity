Ext.define('GSmartApp.view.stockin.StockinNewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockinnew',
    channel:null,
    sendChannel: null,
	packinglist:null,
	stoken: null,
	skus:[],
	funcid:'2',
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
		//Ext.getStore('OrgStore').loadStore(5);
		Ext.getStore('SkuStore').loadSkuType(1);
			
		
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
		if(type.getId()=='lsnhapkhomoi'||type.getId()=='lsnhaptunhacat'||type.getId()=='lsnhapdieuchuyen'
		||type.getId()=='lsnhaptugiacong'||type.getId()=='lsnhapcapbu'||type.getId()=='lsnhapxavai'){
			Ext.getStore('OrgStore').GetOrgDest('lsnhapdieuchuyen');
			var stockincode = this.lookupReference('stockincode');
			stockincode.setReadOnly(true);
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			viewModel.set('stockintypeid_link',type.get('type'));
			viewModel.set('isEdit',false);
			viewModel.set('isStart',false);
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnSkuError',"");
			this.onQrCode(id);
			this.getById(id);
			
			if(type.getId()=='lsnhapkhomoi'){
				viewModel.set('isNhapmoi',true);
			}else{
				viewModel.set('isNhapmoi',false);
			}
			
			//set device
			var device = GSmartApp.util.State.get('device_inv');
			if(!device){
				var store = me.lookupReference('device').getStore();
				var data =store.getAt(0)
				if(data){
					GSmartApp.util.State.set('device_inv', data.data);
					me.lookupReference('device').setValue(data.data.id);
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
		}
	},
	onUrlBack:function(type){
		var me =this;
		
		if(type.getId()=='lsnhapkhomoi'||type.getId()=='lsnhaptunhacat'||type.getId()=='lsnhapdieuchuyen'
		||type.getId()=='lsnhaptugiacong'||type.getId()=='lsnhapcapbu'||type.getId()=='lsnhapxavai'){
			Ext.getStore('OrgStore').GetOrgDest('lsnhapdieuchuyen');
			var view =this.getView();
			var viewModel = view.getViewModel();
			var stockincode = this.lookupReference('stockincode');
			stockincode.setReadOnly(false);
			viewModel.set('urlback',type);
			viewModel.set('stockintypeid_link',type.data.type);
			viewModel.set('isEdit',true);
			viewModel.set('isStart',false);
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnSkuError',"");
			var formStockin = this.lookupReference('formStockin');
			var gridStockin = this.lookupReference('gridStockin');
			formStockin.reset(true);
			gridStockin.getStore().removeAll();
			
			try{
				view.qrcode._el.getElementsByTagName('img')[0].src="";
			}catch(e){}
			
			if(type.getId()=='lsnhapkhomoi'){
				viewModel.set('isNhapmoi',true);
			}else{
				viewModel.set('isNhapmoi',false);
			}
			
			var dataForm = new Object();
			//set device
			var device = GSmartApp.util.State.get('device_inv');
			if(!device){
				var store = me.lookupReference('device').getStore();
				var data =store.getAt(0).data
				GSmartApp.util.State.set('device_inv', data);
				//me.lookupReference('device').setValue(data.id);
				dataForm.deviceid = device.id;
			}else{
				//me.lookupReference('device').setValue(device.id);
				dataForm.deviceid = device.id;
			}
			dataForm.stockindate = new Date();
			formStockin.getForm().setValues(dataForm)
			
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
		var view =this.getView();
		var viewModel = view.getViewModel();
		var isTabEpc =viewModel.get('isTabEpc');
		viewModel.set('isTabEpc',!isTabEpc);
	},
	onAddSku:function(){
		var me =this;
		var gridStockin = this.lookupReference('gridStockin');
		var skucode = this.lookupReference('txtSkucode').getValue();
		GSmartApp.Ajax.post('/api/v1/categoty/getSkuByCode','{"skucode": "'+skucode+'"}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				var data = response.data;
				if(data.length>0){
					var date = new Date();
					var ticks = date.getTime();
					gridStockin.getStore().insert(0,{
							'id':'TEMP'+ticks,
							'skucode':data[0].code,
							'skuname':data[0].name,
							'skuid_link':data[0].id,
							'colorcode':data[0].colorcode,
							'colorname':data[0].colorname,
							'colorid_link':data[0].colorid_link,
							'unitcode':data[0].unitcode,
							'unitid_link':data[0].unitid_link,
							'unitname':data[0].unitname
							});
					me.lookupReference('txtSkucode').setValue('');
				}
			}
		})
	},
	onAddPackingList:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var datalist;
		Ext.Ajax.request({
			 url: config.getAppBaseUrl()+'/api/v1/stockin/getPackingListByStockinDID',
			 method:'POST',
			 cors: true,
			 headers :{
				  'Content-Type':"GSmartApplication/json"
			 },
			 useDefaultXhrHeader: false,
			 params:'{"stockindid": "'+record.id+'"}',
			 success : function(response,options ) {
				var response = Ext.decode(response.responseText);
				datalist = response.data;
				var form =Ext.create({
					xtype: 'window',
					width: 900,
					height: 550,
					margin:10,
					layout: 'fit',
					resizable: true,
					modal: true,
					items:[{
						stockind_record:record,
						xtype: 'stockinpackinglist'
					}]
				}).show();
				var grid = form.down('grid');
				var store = grid.getStore();
				store.removeAll();
				if(datalist!=null){
					store.setData(datalist);
				}
			 },
			 failure :function(response,options){
			 }
		 });
		
		
		
		
	},
	onProductError:function(){
		var form =Ext.create({
				xtype: 'window',
				width: 950,
				height: 500,
				title:'Danh sách sản phẩm lỗi', 
				layout: 'fit',
				resizable: true,
				modal: true,
				items:[{
					xtype: 'producterrorlist'
				}]
			}).show();
			var grid = form.down('grid');
			var store = grid.getStore();
			store.removeAll();
			if(this.skus){
				store.setData(this.skus);
			}
		
	},
	onSave:function(){
		this.onStop();
		var me=this;
		var view =this.getView();
		var viewModel = view.getViewModel();
		var formStockin = this.lookupReference('formStockin');
		var gridStockin = this.lookupReference('gridStockin');
		var stockin = formStockin.getValues();
		
		stockin.stockindate =new Date(stockin.stockindate);
		var stockind =new Array();
		var items = gridStockin.getStore().getData().items;
		for(var i in items){
			var item = items[i].data;
			if(isNaN(item.id)){
				item.id = null;
			}
			stockind.push(item);
		}
		stockin.stockintypeid_link = viewModel.get('stockintypeid_link');
		stockin.stockind =stockind;
		var data =new Array();
		data.push(stockin);
		var params=new Object();
		params.msgtype ="STOCKIN_CREATE";
		params.message = "Tạo hóa đơn";
		params.data = data;
		GSmartApp.Ajax.post('/api/v1/stockin/stockin_create',Ext.JSON.encode(params),
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				formStockin.getForm().reset(true);
				gridStockin.getStore().removeAll();
				
				this.skus=[];
				viewModel.set('clsbtnSkuError',"red-button");
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
	getById:function(id){
		var me=this;
		var stockincode = this.lookupReference('stockincode');
		var formStockin = this.lookupReference('formStockin');
		var gridStockin = this.lookupReference('gridStockin');
		me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/stockin/stockin_getbyid','{"id": '+id+'}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				var data = response.data;
				if(data!=null){
					stockincode.setReadOnly(true);
					data.stockindate =new Date(data.stockindate);
					formStockin.getForm().setValues(data);
					gridStockin.getStore().removeAll();
					gridStockin.getStore().setData(data.stockind);
				}
			}
			me.getView().setLoading(false);
		})
	},
	onDelete:function(grid, rowIndex, colIndex){
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
				var record = grid.getStore().getAt(rowIndex);
				var id = record.get('id');  
				gridStockinEpc.getStore().remove(record);
				var store =gridStockin.getStore();
				store.beginUpdate();
				store.each(function(s){
					if(record.get('skucode')==s.get('skucode')){
						var packinglist = s.get('packinglist');
						Ext.Array.each(packinglist, function(precord, index, countriesItSelf) {
							if(precord!=null && precord.epc == record.get('epc')){
								Ext.Array.remove ( packinglist,precord );
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
	onQrCode:function(){
		var view  = this.getView();
		var refs = this.getReferences();
		if(view.qrcode ==null){
			view.qrcode = new QRCode("stockinQrcode", {
				text: "",
				width: 150,
				height: 150,
				colorDark : "#000000",
				colorLight : "#ffffff",
				correctLevel : QRCode.CorrectLevel.H
			})	
		}
		view.qrcode.clear(); // clear the code.
		view.qrcode.makeCode("xin chào"); // make another code.
	},
	onPackinglist:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex).data;
		console.log(record)
		//if(!isNaN(info.record.id)){
			var form =Ext.create({
					xtype: 'window',
					width: 750,
					height: 550,
					title:GSmartApp.Locales.packinglist_chitiet[GSmartApp.Locales.currentLocale], 
					layout: 'fit',
					resizable: true,
					modal: true,
					items:[{
						master_record:record,
						master_store:grid.getStore(),
						xtype: 'stockinpackinglist'
					}]
				}).show();
				var grid = form.down('grid');
				var store = grid.getStore();
				store.removeAll();
				if(record.packinglist!=null){
					store.setData(record.packinglist);
				}
				form.down('form').getForm().setValues(record);
		//}
	},
	onImport:function(){
		var stockin = this.lookupReference('formStockin').getValues();;
		var me=this;
		var view =this.getView();
		var viewModel = view.getViewModel();
		var type = viewModel.get('stockintypeid_link');
		if(stockin.id==null){
		var form =Ext.create({
					xtype: 'window',
					width: 400,
					height: 500,
					margin:10,
					layout: 'fit',
					resizable: true,
					modal: true,
					items:[{
						title:GSmartApp.Locales.btn_import_nhapkho[GSmartApp.Locales.currentLocale], 
						xtype:'formpanel',
						margin:10,
						items:[{
							 layout:'vbox',
							 items:[{
								 xtype:'formpanel',
								 margin:'0 0 5 0',
								 items:[{
									 xtype: 'searchfield',
									 listeners: {
										 change:function( grid, newValue, oldValue, eOpts ) {
											var store = form.down('grid').getStore();
											store.filter('invoicenumber',newValue);
										 }
									 }
								 }]
							 },{
								 xtype:'grid',
								 columnLines:true,
								 rowLines:true,
								 height:320,
								 store:'InvoiceListStore',
								 columns: [{
									 width:40,
									 xtype:'checkcolumn',
									 dataIndex:'ischeck'
								 },{
									 flex:1,
									 text:GSmartApp.Locales.sohoadon[GSmartApp.Locales.currentLocale], 
									 dataIndex: 'invoicenumber'
								 },{
									 flex:1,
									 text:GSmartApp.Locales.ngay_hoadon[GSmartApp.Locales.currentLocale], 
									 dataIndex: 'invoicedate'
								 }]
							 }]
						}],buttons: [{
							 xtype:'button',
							 text: GSmartApp.Locales.btn_import_nhapkho[GSmartApp.Locales.currentLocale],
							 handler: function(){
								var store = form.down('grid').getStore();
								var row = store.findRecord('ischeck',true);
								if(row){
									if(1==type){
										me.getInvoicenumber(form,row.data.invoicenumber);
									}else{
										me.getStockOutById(form,row.data.id);
									}
								}else{
									Ext.Msg.show({ 
									  title: 'Thông báo',
									  msg: null, 
									  buttons: [{ 
										itemId: 'ok',  
										text: 'Vui lòng chọn hóa đơn/phiếu xuất kho',   
										ui: 'action' 
									  }] 
									});
								}
								
								
							 }
						},{
							 xtype:'button',
							 text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
							 handler: function(){
								form.close();
							 }
						}]
					}]
				}).show();
				var grid = form.down('grid');
				var store = grid.getStore();
				if(1==type){
					GSmartApp.Ajax.post('/api/v1/invoice/invoice_activate','',
					function(success,response,options ) {
						if(success){
							var response = Ext.decode(response.responseText);
							var data = response.data;
							if(data!=null && data.length>0){
								store.removeAll();
								store.setData(data);
							}
						}
					})
				}else{
					GSmartApp.Ajax.post('/api/v1/stockout/stockout_activate','{"stockouttypeid_link": "'+type+'"}',
					function(success,response,options ) {
						if(success){
							var response = Ext.decode(response.responseText);
							var data = response.data;
							if(data!=null && data.length>0){
								store.removeAll();
								for (var x in data) {
								  var row = new Object();
								  row.id=data[x].id;
								  row.invoicenumber=data[x].stockoutcode;
								  row.invoicedate = data[x].stockoutdate;
								  store.insert(0,row);
								}
							}
						}
					})
				}
		}
	},
	onSoPhieuKeypress:function( me, e, eOpts){
		if(13==e.charCode){
			this.getStockinByCode(me.getValue());
		}
	},
	onInvoicenumberKeypress:function( me, e, eOpts){
		if(13==e.charCode){
			this.getInvoicenumber(me.getValue());
		}
	},
	onInvoicenumber(){
		var invoicecode = this.lookupReference('invoicenumber').getValue();
		this.getInvoicenumber(invoicecode,true);
	},
	getStockinByCode:function(stockincode){
		var me=this;
		var view =this.getView();
		var formStockin = this.lookupReference('formStockin');
		var gridStockin = this.lookupReference('gridStockin');
		var viewModel = view.getViewModel();
		me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/stockin/getStockinByCode','{"stockincode": "'+stockincode+'"}',
		function(success,response,options ) {
			if(success){
				var response = Ext.decode(response.responseText);
				var data = response.data;
				if(data!=null && data.length>0){
					gridStockin.getStore().removeAll();
					gridStockin.getStore().setData(data[0].stockind);
					formStockin.getForm().setValues(data[0]);
					viewModel.set('isbtnplus',false);
					viewModel.set('isbtnclose',true);
				}
			}
			me.getView().setLoading(false);
		})
	},
	getInvoicenumber:function(form,invoicecode){
		var me=this;
		var view =this.getView();
		var formStockin = this.lookupReference('formStockin');
		var gridStockin = this.lookupReference('gridStockin');
		var viewModel = view.getViewModel();
		var datav = formStockin.getValues();
		me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/invoice/getInvoiceByCode','{"invoicecode": "'+invoicecode+'"}',
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
					var data = response.data;
					if(data.length>0){
						gridStockin.getStore().removeAll();
						gridStockinEpc.getStore().removeAll();
						formStockin.reset(true);
						var invoiced = data[0].invoiced;
						for(var x in invoiced){
							var date = new Date();
							var ticks = date.getTime();
							gridStockin.getStore().insert(0,{
									'id':'TEMP'+ticks,
									'skucode':invoiced[x].skucode,
									'skuname':invoiced[x].skuname,
									'skuid_link':invoiced[x].skuid_link,
									'colorcode':invoiced[x].colorcode,
									'colorname':invoiced[x].colorname,
									'colorid_link':invoiced[x].colorid_link,
									'unitcode':invoiced[x].unitcode,
									'unitid_link':invoiced[x].unitid_link,
									'unitname':invoiced[x].unitname,
									'totalpackage':invoiced[x].totalpackage,
									'totalyds':invoiced[x].totalyds,
									'foc':invoiced[x].foc,
									'unitprice':invoiced[x].unitprice,
									'packinglist':stockoutd[x].packinglist
									});
						}
						
						gridStockinEpc.getStore().setData(epcs);
						var invoice = data[0];
						invoice.id = null;
						
						invoice.stockindate = datav.stockindate;
						invoice.invoicedate = new Date(invoice.invoicedate);
						formStockin.getForm().setValues(invoice);
						
					}
					
				}
				form.close();
				me.getView().setLoading(false);
			}
		)
	},
	getStockOutById:function(form,id){
		var me=this;
		var view =this.getView();
		var formStockin = this.lookupReference('formStockin');
		var gridStockin = this.lookupReference('gridStockin');
		var gridStockinEpc = this.lookupReference('gridStockinEpc');
		var viewModel = view.getViewModel();
		var datav = formStockin.getValues();
		me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/stockout/stockout_getbyid','{"id": "'+id+'"}',
			function(success,response,options ) {
				if(success){
					var response = Ext.decode(response.responseText);
					var data = response.data;
					var epcs = response.epcs;
					if(data){
						gridStockin.getStore().removeAll();
						gridStockinEpc.getStore().removeAll();
						formStockin.reset(true);
						var stockoutd = data.stockoutd;
						for( var x in stockoutd){
							var date = new Date();
							var ticks = date.getTime();
							gridStockin.getStore().insert(0,{
									'id':'TEMP'+ticks,
									'skucode':stockoutd[x].skucode,
									'skuname':stockoutd[x].skuname,
									'skuid_link':stockoutd[x].skuid_link,
									'colorcode':stockoutd[x].colorcode,
									'colorname':stockoutd[x].colorname,
									'colorid_link':stockoutd[x].colorid_link,
									'unitcode':stockoutd[x].unitcode,
									'unitid_link':stockoutd[x].unitid_link,
									'unitname':stockoutd[x].unitname,
									'totalpackage':stockoutd[x].totalpackage,
									'totalyds':stockoutd[x].totalyds,
									'foc':stockoutd[x].foc,
									'unitprice':stockoutd[x].unitprice,
									'packinglist':stockoutd[x].packinglist
									});
						}
						gridStockinEpc.getStore().setData(epcs);
						var invoice = data;
						invoice.id = null;
						invoice.invoicenumber = invoice.stockoutcode;
						invoice.stockindate = datav.stockoutdate;
						invoice.invoicedate = new Date(invoice.stockoutdate);
						formStockin.getForm().setValues(invoice);
						
					}
					
				}
				form.close();
				me.getView().setLoading(false);
			}
		)
	},
	onPackingListSave:function(){
		var me=this;
		var record = this.getView().stockind_record;
		var gridPackinglist = this.lookupReference('gridPackinglist');
		var store = gridPackinglist.getStore();
		var packinglist =new Array();
		var items = store.getData().items;
		for(var i in items){
			items[i].data.id =0;
			items[i].data.stockindid_link = record.id;
			items[i].data.skuid_link = record.skuid_link;
			items[i].data.colorid_link = record.colorid_link;
			
			packinglist.push(items[i].data);
		}
		me.getView().setLoading(true);
		GSmartApp.Ajax.post('/api/v1/stockin/PackinglistInsert',Ext.JSON.encode(packinglist),
		function(success,response,options ) {
			me.getView().setLoading(false);
		})
	},
	onPackingListClose:function(){
		var view = this.getView().up('window');
		view.close();
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
		this.skus = new Array();
		
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
		GSmartApp.Mqtt.connect(host, port, clientid, me.channel, function(topic, message) {
			if(topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);				
				if(jsonObj.ct==1) {
					if(jsonObj.cid == 'CMD_START_INV') {
						me.channel.dta = 'gsm5/transaction/inv/'+jsonObj.respdata.token;
						GSmartApp.Mqtt.client.subscribe(me.channel.dta);
						console.log('register dta ch:'+me.channel.dta);
						var viewModel = me.getViewModel();
						viewModel.set('clsbtn',"blue-button");
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
					
					var productcode =me.lookupReference('productcode').getValue(); 
				
					if(productcode && productcode != jsonObj[x].skuid_link){
						this.skus.push(jsonObj[x]);
						if(this.skus.length>0){
							var viewModel = me.getViewModel();
							viewModel.set('clsbtnSkuError',"red-button");
						}
					}else{
						if(record && Number(record.get('rssi'))< 1){
							if(Number(jsonObj[x].rssi)>0){
								// co epc thi update rssi =1
								storeEpc.beginUpdate();
								storeEpc.each(function(epc){
									if(jsonObj[x].epc==epc.get('epc')){
										s.set('rssi',1);
									}
								})
								storeEpc.endUpdate();
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
											var totalpackagecheck = s.get('totalpackagecheck');
											s.set('totalpackagecheck',Number(totalpackagecheck)+1);
											var packinglist = s.get('packinglist');
											var totalydscheck = s.get('totalydscheck');
											s.set('totalydscheck',Number(totalydscheck)+Number(jsonObj[x].totalyds));
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
								this.skus.push(jsonObj[x]);
								if(this.skus.length>0){
									var viewModel = me.getViewModel();
									viewModel.set('clsbtnSkuError',"red-button");
								}
							}
						}
					}
				}
			}
		}, function() {
			me.sendChannel = 'gsm5/device/'+device.data.code+'/cmd';
			me.funcid = '2;' + orgid_link;
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
	}

});
