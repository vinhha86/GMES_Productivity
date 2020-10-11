Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutTolineConfirmController',
    isActivate: false,
    init: function () {

    },
    control: {
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
    },
    onLuu: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var username = viewModel.get('username');
        var password = viewModel.get('password');
        var handoverid_link = viewModel.get('handoverid_link');
        var params = new Object();
        params.username = username;
        params.password = password;
        params.handoverid_link = handoverid_link;

        params.msgtype = "SET_STATUS";
        params.message = "Set status";

        GSmartApp.Ajax.post('/api/v1/handover/userconfirm', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xác nhận thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        
                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xác nhận thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Xác nhận thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
})