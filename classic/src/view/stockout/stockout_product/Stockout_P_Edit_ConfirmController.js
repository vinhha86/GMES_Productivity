Ext.define('GSmartApp.view.stockin.Stockout_P_Edit_ConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Edit_ConfirmController',
    isActivate: false,
    init: function () {
    },
    control: {
        '#btnLuu': {
            click: 'onLoginClick'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onLoginClick: function() {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var username = viewModel.get('username');
        var password = viewModel.get('password');
        return new Ext.Promise(function (resolve, reject) {
            Ext.Ajax.request({
                url :  config.getBack() + 'login',
                method:'POST',
                params: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                success: function(result, opts) {
                    var sessionData = Ext.decode(result.responseText);
                    m.onConfirmStockin(sessionData.user);
                },
                failure: function(err, opts) {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Sai tên hoặc mật khẩu xác thực',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });
        });
    },
    onConfirmStockin: function(userid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockinId = viewModel.get('stockinId');
        var approver_userid_link = userid_link;
        m.confirmStockin(stockinId, approver_userid_link);
    },
    confirmStockin: function(stockinId, approver_userid_link){
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.stockinId = stockinId;
        params.approver_userid_link = approver_userid_link;

        GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_approve', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xác thực thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        
                        m.onThoat();
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
                        title: 'Xác thực thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onEnterConfirm: function(textfield, e, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        if(e.getKey() == e.ENTER) {
            if(viewModel.get('username') == '' || viewModel.get('password') == ''){
                return;
            }else{
                m.onLoginClick();
            }
        }
    }
})