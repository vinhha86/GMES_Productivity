Ext.define('GSmartApp.view.process_shipping.ProcessShippingMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessShippingMainViewController',
    init: function () {

    },
    control: {
        '#tabDetail': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        if (newCard.xtype == "Balance_mat_View") {
            this.onCalBalance();
        }
        else if (newCard.xtype == 'SizeBreakdown_Grant_MainView') {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('POrder_ListGrantStore');
            var porderid_link = viewmodel.get('porderid_link');
            store.loadStore(porderid_link);
        }
    },
    onCalBalance: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var SKUBalanceStore_Mat = viewmodel.getStore('SKUBalanceStore_Mat');

        var params = new Object();
        params.porderid_link = viewmodel.get('porderid_link');

        me.setLoading("Đang tính cân đối");
        GSmartApp.Ajax.post('/api/v1/balance/cal_balance_byporder', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        SKUBalanceStore_Mat.setData(response.data);
                    }
                }
            })
    },
})