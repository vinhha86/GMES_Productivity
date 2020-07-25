Ext.define('GSmartApp.view.porders.POrder_List.POrder_InfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_InfoViewController',
    init: function () {
        // let me = this.getView();
        // console.log(me.IdPOrder);
        // this.loadInfo(me.IdPOrder);

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
        let me = this.getView();
        if (id == 0) {
            me.getForm().reset();
            return;
        }

        let viewModel = this.getViewModel();
        viewModel.getStore('POrder_ListStatusStore').loadStore();

        let params = new Object();
        params.porderid_link = id;
        GSmartApp.Ajax.post('/api/v1/porder/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        viewModel.set('porder', res.data);
                        viewModel.set('productiondate_plan', new Date(res.data.productiondate_plan));  
                        viewModel.set('golivedate', new Date(res.data.golivedate));
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