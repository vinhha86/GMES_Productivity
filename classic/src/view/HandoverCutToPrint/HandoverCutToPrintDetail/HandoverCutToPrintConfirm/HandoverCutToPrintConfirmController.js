Ext.define('GSmartApp.view.handovercuttoprint.HandoverCutToPrintConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutToPrintConfirmController',
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
                    console.log('Success login user:', sessionData);
                    // console.log(sessionData.user);
                    m.changeHandoverStatus(sessionData.user);
                    //
                    // Ext.Msg.show({
                    //     title: 'Thông báo',
                    //     msg: 'Xác nhận thành công',
                    //     buttons: Ext.MessageBox.YES,
                    //     buttonText: {
                    //         yes: 'Đóng',
                    //     }
                    // });
                },
                failure: function(err, opts) {
                    console.log('Failure login user', err);
                    //

                    //
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Xác nhận thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });
        });
    },
    changeHandoverStatus: function(userid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('handoverid_link');
        var status = 0;
        var approver_userid_link = 0;
        var receiver_userid_link = 0;
        if(viewModel.get('isOut')) {
            status = 1;
            approver_userid_link = userid_link;
        }
        if(viewModel.get('isIn')) {
            status = 2;
            receiver_userid_link = userid_link;
        }
        m.setStatus(status, handoverid_link, approver_userid_link, receiver_userid_link);
    },
    setStatus: function(status, handoverid_link, approver_userid_link, receiver_userid_link){
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.status = status;
        params.handoverid_link = handoverid_link;
        params.approver_userid_link = approver_userid_link;
        params.receiver_userid_link = receiver_userid_link;
        params.msgtype = "HANDOVER_SETSTATUS";
        params.message = "Set status";

        GSmartApp.Ajax.post('/api/v1/handover/setstatus', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xác thực thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        //
                        var mainView = Ext.getCmp('handover_cut_toprint_edit');
                        if(approver_userid_link != 0)
                            mainView.getViewModel().set('currentRec.approver_userid_link', approver_userid_link);
                        if(receiver_userid_link != 0)
                            mainView.getViewModel().set('currentRec.receiver_userid_link', receiver_userid_link);
                        mainView.getViewModel().set('currentRec.status', status);
                        //
                        m.onThoat();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Xác thực thất bại',
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
})