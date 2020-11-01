Ext.define('GSmartApp.view.POrder_Balance.POrderBalance_Detail_AddPositionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderBalance_Detail_AddPositionController',
    init: function () {
        
    },
    control: {
        '#btnLuu': {
            click: 'onBtnLuu'
        },
        '#btnThoat': {
            click: 'onBtnThoat'
        }
    },
    onBtnThoat: function(){
        var view = this.getView().up('window');
		view.close();
    },
    onBtnLuu: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var porderid_link = viewModel.get('porderid_link');
        var amount = viewModel.get('amount');
        // console.log(porderid_link + " " + amount);

        me.Luu(porderid_link, amount);
    },
    Luu: function(porderid_link, amount){
        var me = this;
        var params = new Object();
        params.porderid_link = porderid_link;
        params.amount = amount;

        GSmartApp.Ajax.post('/api/v1/porder_balance/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm mới thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                        });
                        var POrderBalanceView = Ext.getCmp('POrderBalance');
                        POrderBalanceView.getViewModel().getStore('POrderBalanceStore').load();
                        me.onBtnThoat();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm mới thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
});