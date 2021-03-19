Ext.define('GSmartApp.view.stockout.Stockout_M_Edit_ConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_Edit_ConfirmController',
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
                    m.onConfirmStockout(sessionData.user);
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
    onConfirmStockout: function(userid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockoutId = viewModel.get('stockoutId');
        var approver_userid_link = userid_link;
        m.confirmStockout(stockoutId, approver_userid_link);
    },
    confirmStockout: function(stockoutId, approver_userid_link){
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.stockoutId = stockoutId;
        params.approver_userid_link = approver_userid_link;

        this.fireEvent('Confirmed', approver_userid_link);

        // GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_approve_material', Ext.JSON.encode(params),
        //     function (success, response, options) {
        //         if (success) {
        //             var response = Ext.decode(response.responseText);
        //             // console.log(response);
        //             if (response.respcode == 200) {
        //                 Ext.Msg.show({
        //                     title: 'Thông báo',
        //                     msg: 'Xác thực thành công',
        //                     buttons: Ext.MessageBox.YES,
        //                     buttonText: {
        //                         yes: 'Đóng',
        //                     }
        //                 });
                        
        //                 var stockout = Ext.getCmp('Stockout_M_Edit').getViewModel().get('stockout');
        //                 stockout.approve_date = response.data.approve_date;
        //                 stockout.approver_userid_link = response.data.approver_userid_link;
        //                 stockout.status = 1;
        //                 stockout.statusString = 'Đã duyệt';
        //                 Ext.getCmp('Stockout_M_Edit').down('#btnConfirm').setHidden(true);
        //                 Ext.getCmp('Stockout_M_Edit').down('#statusString').setValue('Đã duyệt');
        //                 // console.log(stockout);
        //                 m.onThoat();
        //             }
        //             else {
        //                 Ext.Msg.show({
        //                     title: 'Xác thực thất bại',
        //                     msg: response.message,
        //                     buttons: Ext.MessageBox.YES,
        //                     buttonText: {
        //                         yes: 'Đóng',
        //                     }
        //                 });
        //             }

        //         } else {
        //             Ext.Msg.show({
        //                 title: 'Xác thực thất bại',
        //                 msg: null,
        //                 buttons: Ext.MessageBox.YES,
        //                 buttonText: {
        //                     yes: 'Đóng',
        //                 }
        //             });
        //         }
        //     })
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