Ext.define('GSmartApp.view.porders.POrder_List.POrder_InfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_InfoViewController',
    init: function () {
        var me = this.getView();

        if (this.getView().IdPOrder == 0) {
            this.getView().getForm().reset();
        }
        let productiondate_plan = this.lookupReference('productiondate_plan');
        let golivedate = this.lookupReference('golivedate');
        productiondate_plan.getPicker().monthYearFormat = 'm-Y';
        golivedate.getPicker().monthYearFormat = 'm-Y';
        // me.down('#contractcode').focus();
    },
    loadInfo: function (id) {
        var me = this.getView();
        if (id == 0) {
            me.getForm().reset();
            return;
        }

        var viewModel = this.getViewModel();
        var params = new Object();
        params.porderid_link = id;
        GSmartApp.Ajax.post('/api/v1/porder/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewModel.set('porder', response.data);
                        viewModel.set('productiondate_plan', new Date(response.data.productiondate_plan));  
                        viewModel.set('golivedate', new Date(response.data.golivedate));
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: [{
                            itemId: 'cancel',
                            text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                        }]
                    });
                }
            })
    }
})