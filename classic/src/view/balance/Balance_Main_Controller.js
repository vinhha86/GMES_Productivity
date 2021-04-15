Ext.define('GSmartApp.view.balance.Balance_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Balance_Main_Controller',
    init: function () {
        this.onCalBalance();
    },
    onCalBalance: function(){
        var viewmodel = this.getViewModel();
        var SKUBalanceStore = viewmodel.getStore('SKUBalanceStore');
        var BalanceProductStore = viewmodel.getStore('BalanceProductStore');

        // if (null!=SKUBalanceStore){
        //     SKUBalanceStore.loadBalanceByPo(viewmodel.get('pcontractid_link'), viewmodel.get('pcontract_poid_link'));
        // }
        console.log(viewmodel.get('pcontractid_link'));

        var params = new Object();
        params.pcontractid_link = viewmodel.get('pcontractid_link');
        params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        if (null!=params.pcontract_poid_link){
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bypo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    console.log(response);
                    if (response.respcode == 200) {
                        SKUBalanceStore.setData(response.data);
                        BalanceProductStore.setData(response.product_data);
                    }
                }
            })
        } else {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bycontract', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    console.log(response);
                    if (response.respcode == 200) {
                        SKUBalanceStore.setData(response.data);
                        BalanceProductStore.setData(response.product_data);
                    }
                }
            })
        }
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
})