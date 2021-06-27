Ext.define('GSmartApp.view.handover.HandoverPackToStock_Detail_ConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverPackToStock_Detail_ConfirmController',
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
        var currentStatus = viewModel.get('currentStatus');
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
                    m.changeHandoverStatus(sessionData.user, currentStatus);
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
    changeHandoverStatus: function(userid_link, currentStatus){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('handoverid_link');
        var viewId = viewModel.get('viewId');
        var status = 0;
        var approver_userid_link = 0;
        var receiver_userid_link = 0;
        if(
            currentStatus == 0 &&
            (
            viewId == 'handover_pack_tostock_detail'
            )
        ) {
            status = 1;
            approver_userid_link = userid_link;
        }
        var obj = new Object();
        obj.status = status;
        obj.handoverid_link = handoverid_link;
        obj.approver_userid_link = approver_userid_link;
        obj.receiver_userid_link = receiver_userid_link;

        m.fireEvent('updateStatus', obj);
    },
    onEnterConfirm: function(textfield, e, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        if(e.getKey() == e.ENTER) {
            console.log('here yet');
            if(viewModel.get('username') == '' || viewModel.get('password') == ''){
                return;
            }else{
                m.onLoginClick();
            }
        }
    }
})