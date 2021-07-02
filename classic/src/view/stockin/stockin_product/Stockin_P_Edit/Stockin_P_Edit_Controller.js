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
            }
        }
	},
    control:{
        '#btnBack':{
            click: 'onBackPage'
        },
        '#btnLuu':{
            click: 'onSave'
        },
        '#btnConfirm':{
            click: 'onBtnConfirm'
        }
    },
    onNewData:function(type, id){
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');

        viewModel.set('stockin.stockindate',new Date());
        viewModel.set('stockin.usercreateid_link', session.id);
        viewModel.set('stockin.stockintypeid_link', id);
        // viewModel.set('stockin.status',-1);

        var mainView = Ext.getCmp('Stockin_P_Edit');
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
                        viewModel.set('stockin.orgid_to_link', records[0].data.org_grant_id_link)
                    }
					else{
                        viewModel.set('stockin.orgid_to_link', records[0].data.orgid_link)
                    }

                    if(id == 21) { // Nhap tu san xuat
                        var OrgFromStore = viewModel.getStore('OrgFromStore');
                        OrgFromStore.loadStore(9, false);
                        var OrgToStore = viewModel.getStore('OrgToStore');
                        OrgToStore.loadStore(8, false);
                        // var listidtype_to = "8";
                        // var OrgToStore = viewModel.getStore('OrgToStore');
                        // OrgToStore.loadStore_byRoot(listidtype_to);
                    }
                    if(id == 22) { // Nhap dieu chuyen
                        var OrgFromStore = viewModel.getStore('OrgFromStore');
                        OrgFromStore.loadStore(8, false);
                        var OrgToStore = viewModel.getStore('OrgToStore');
                        OrgToStore.loadStore(8, false);
                        // var listidtype_to = "8";
                        // var OrgToStore = viewModel.getStore('OrgToStore');
                        // OrgToStore.loadStore_byRoot(listidtype_to);
                    }
				}
			}
		});
    },
    onLoadData:function(id,type){
        this.getInfo(id);
    },
    onBackPage: function(){
        this.redirectTo('stockin_p_main');
    },
    getInfo: function(id, isConfirm){
        var m = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinD_Store');

        var params = new Object();
        params.id = id ;

        var mainView = Ext.getCmp('Stockin_P_Edit');
        if(mainView) mainView.setLoading(true);

        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            if(mainView) mainView.setLoading(false);
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                // console.log(response.data);
                // if(viewModel == null) viewModel = m.getViewModel();
                viewModel.set('stockin', response.data);
                store.setData(response.data.stockin_d);
                store.commitChanges();

                if(response.data.stockintypeid_link == 21) { // Nhap tu san xuat
                    var OrgFromStore = viewModel.getStore('OrgFromStore');
                    OrgFromStore.loadStore(9, false);
                    var OrgToStore = viewModel.getStore('OrgToStore');
                    OrgToStore.loadStore(8, false);
                    var POrder_ListStore = viewModel.getStore('POrder_ListStore');
                    POrder_ListStore.POrderPOLine_loadby_po(response.data.pcontract_poid_link);
                    var POrder_ListGrantStore = viewModel.getStore('POrder_ListGrantStore');
                    POrder_ListGrantStore.loadStore(response.data.porderid_link);
                }
                if(response.data.stockintypeid_link == 22) { // Nhap dieu chuyen
                    var OrgFromStore = viewModel.getStore('OrgFromStore');
                    OrgFromStore.loadStore(8, false);
                    var OrgToStore = viewModel.getStore('OrgToStore');
                    OrgToStore.loadStore(8, false);
                }

                // set gia tri sl nhap mac dinh = sl yeu cau
                m.setSlNhap();

                // nếu là Duyệt
                if(isConfirm == true){
                    m.onConfirm();
                }
            }
		})
    },
    setSlNhap: function(){
        // set gia tri sl nhap mac dinh = sl yeu cau
        var m = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinD_Store');
        var stockin = viewModel.get('stockin');

        if(stockin.status == -1){ // 
            var stockin_d = viewModel.get('stockin.stockin_d');
            if(stockin_d == null) stockin_d = [];
            for(var i = 0; i < stockin_d.length; i++){
                stockin_d[i].totalpackagecheck = stockin_d[i].totalpackage;
            }
            viewModel.set('stockin.stockin_d', stockin_d);
            // viewModel.set('stockin', response.data);
            store.setData(stockin_d);
            store.commitChanges();
        }
        // console.log(stockin);
    },
    CheckValidate: function(){
		var mes = "";
		var stockin = this.getViewModel().get('stockin');
        // console.log(stockin);
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
    onSave: function(isConfirm){
        var me=this;

        var mes = this.CheckValidate();
        if(mes == ""){
            var viewModel = this.getViewModel();
            var params = new Object();
            params.data = [];
            var stockin = viewModel.get('stockin');
            params.data.push(stockin);
            
            var mainView = Ext.getCmp('Stockin_P_Edit');
            if(mainView) mainView.setLoading(true);

            GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create', Ext.JSON.encode(params),
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
                            me.getInfo(response.id, isConfirm);
                            // this.redirectTo("stockin_p_main/" + response.id + "/edit");
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
    },
    onBtnConfirm: function(){
        this.onSave(true);
    },
	onConfirm: function(){
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinId = stockin.id;
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
			// console.log(approver_userid_link);

			var params = new Object();
			params.stockinId = stockinId;
			params.approver_userid_link = approver_userid_link;

            var mainView = Ext.getCmp('Stockin_P_Edit');
            if(mainView) mainView.setLoading(true);
	
			GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_approve', Ext.JSON.encode(params),
				function (success, response, options) {
                    if(mainView) mainView.setLoading(false);
                    var response = Ext.decode(response.responseText);
					if (success) {
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
							viewModel.set('stockin', response.data);
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
							msg: response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				})
        })
    }    
})