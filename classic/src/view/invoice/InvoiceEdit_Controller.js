Ext.define('GSmartApp.view.invoice.InvoiceEdit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceEdit_Controller',
	init: function() {
		var viewModel = this.getViewModel();
		var UnitStore = viewModel.getStore('UnitStore');
		UnitStore.loadStore();
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData'
            }
        }
	},
    control:{
        '#btnBack': {
            click: 'onBack'
        },
        '#btnLuu': {
            click: 'onSave'
        }
    },
    onLoadData: function(id){
		if(id == 0){
			
		}else{
			this.getInfo(id);
		}

    },
    onNewData: function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('invoice.invoicedate', new Date())
    },
    getInfo: function(id){        
        var me = this.getView();
        var viewmodel = this.getViewModel();
        me.setLoading('Đang tải dữ liệu');

        var params = new Object();
        params.invoiceid = id;

        GSmartApp.Ajax.postJitin('/api/v1/invoice/getInvoiceByID',Ext.JSON.encode(params),
			function(success,response,options ) {
				me.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
                            viewmodel.set('invoice', response.data);
							console.log(response.data);
						}
					} else {
						var response = Ext.decode(response.responseText);
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Có lỗi trong quá trình tải dữ liệu',
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
			})	
    },
    onBack: function(){
        this.redirectTo("lsinvoice");
    },
    onSave: function(){
        var viewmodel = this.getViewModel();
		var m = this;
        var me = this.getView();
		var params = new Object();
		// params.data = viewmodel.get('invoice');
		var data = new Array();

		var invoice = viewmodel.get('invoice');
		console.log(invoice);
		// invoice_d
		var invoice_d = invoice.invoice_d;
		if(invoice_d != null){
			for(var i = 0; i < invoice_d.length; i++){
				if(invoice_d[i].id == 0 || typeof invoice_d[i].id === 'string'){
					invoice_d[i].id = null;
					// packinglist
				}
			}
		}

		data.push(viewmodel.get('invoice'));
		
		params.data = data;
        me.setLoading("Đang lưu dữ liệu");

        GSmartApp.Ajax.postJitin('/api/v1/invoice/invoice_create',Ext.JSON.encode(params),
			function(success,response,options ) {
				me.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Lưu thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
							if(Ext.getCmp('InvoiceEdit_D').getStore()){
								Ext.getCmp('InvoiceEdit_D').getStore().commitChanges();
							}
							if(invoice.id == null || invoice.id == 0){
								m.redirectTo("lsinvoice/" + response.id + "/edit");
							}else{
								m.getInfo(response.id);
							}
						}
					} else {
						var response = Ext.decode(response.responseText);
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
})