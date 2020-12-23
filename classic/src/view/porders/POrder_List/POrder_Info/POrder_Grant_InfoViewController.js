Ext.define('GSmartApp.view.porders.POrder_List.POrder_Grant_InfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_InfoViewController',
    init: function () {
    },
    loadInfo: function (id) {
        let me = this.getView();
        if (id == 0) {
            me.getForm().reset();
            return;
        }
        var viewModel = this.getViewModel();
        let params = new Object();
        params.idPorderGrant = id;
        GSmartApp.Ajax.post('/api/v1/porder_grant/findone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        viewModel.set('POrder_grant', res.data);
                        viewModel.set('golivedate', Ext.Date.parse(res.data.golivedate, 'c'));
                        viewModel.set('productiondate_plan', Ext.Date.parse(res.data.productiondate_plan, 'c'));
                        // console.log(res);
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin PO_Grant thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})