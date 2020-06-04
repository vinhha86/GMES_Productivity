Ext.define('GSmartApp.view.invoice.InvoiceEdit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceEdit_Controller',
	init: function() {
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
        this.getInfo(id);

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
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/invoice/invoice_getbyid',Ext.JSON.encode(params),
			function(success,response,options ) {
				me.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
                            viewmodel.set('invoice', response.data);
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
        var me = this.getView();
        var params = new Object();
        params.data = viewmodel.get('invoice');
        me.setLoading("Đang lưu dữ liệu");

        GSmartApp.Ajax.post('/api/v1/invoice/invoice_create',Ext.JSON.encode(params),
			function(success,response,options ) {
				me.setLoading(false);
					if (success) {
						var response = Ext.decode(response.responseText);
						if (response.respcode == 200) {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: 'Thành công',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});							
							this.redirectTo("lsinvoice/" + response.id + "/edit");
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