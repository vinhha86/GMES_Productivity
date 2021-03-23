Ext.define('GSmartApp.view.stockin.Stockin_P_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_P_Edit_Controller',
	init: function() {
        
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
        '#btnBack':{
            click: 'onBackPage'
        },
        '#btnLuu':{
            click: 'onSave'
        }
    },
    onUrlBack: function(type){
        
    },
    onNewData:function(type){
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');

        viewModel.set('stockin.stockindate',new Date());
        viewModel.set('stockin.usercreateid_link', session.id);
        viewModel.set('listepc', new Map());
        viewModel.set('stockin.orgid_to_link', session.orgid_link)
    },
    onLoadData:function(id,type){
        this.getInfo(id);
    },
    onBackPage: function(){
        this.redirectTo('stockin_p_main');
    },
    getInfo: function(id){
        var me = this;
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('StockinDetailStore');
        var listepc = viewmodel.get('listepc');

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                console.log(response.data);
                viewmodel.set('stockin', response.data);
                for(var i=0; i<response.listepc.length; i++){
                    listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                }
                store.setData(response.data.stockin_d);
            }
		})
    },
    CheckValidate: function(){
		var mes = "";
		var stockin = this.getViewModel().get('stockin');
        console.log(stockin);
		if(stockin.stockintypeid_link == null){
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (stockin.orgid_from_link == null){
			mes = "Bạn chưa chọn nơi giao";
		}
		else if (stockin.orgid_to_link == null){
			mes = "Bạn chưa chọn nơi nhập";
		} 
		else if (stockin.stockin_d.length == 0){
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
    onSave: function(){
        var me = this.getView();

        var mes = this.CheckValidate();
        if(mes == ""){
            var viewmodel = this.getViewModel();
            var params = new Object();
            params.data = [];
            var stockin = viewmodel.get('stockin');
            // for(var i =0; i<stockin.stockin_d.length;i++){
            //     delete stockin.stockind[i].sku;
            // }
            console.log(stockin);
            params.data.push(stockin);
            me.setLoading("Đang lưu dữ liệu");
            GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create', Ext.JSON.encode(params),
                function (success, response, options) {
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
                            this.redirectTo("stockin_p_main/" + response.id + "/edit");
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
        else{
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
    }
})