Ext.define('GSmartApp.view.balance.Balance_Main_Pcontract_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Balance_Main_Pcontract_Controller',
    init: function () {
    },
    onCalBalance_OneProduct: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var SKUBalanceStore = viewmodel.getStore('SKUBalanceStore');

        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        params.list_productid = viewmodel.get('IdProduct');

        me.setLoading("Đang tính cân đối");
        if (null!=params.pcontract_poid_link && 0!=params.pcontract_poid_link){
            console.log("hehe" + params.pcontract_poid_link);
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bypo', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        SKUBalanceStore.setData(response.data);
                    }
                }
            })
        } else {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bycontract', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        SKUBalanceStore.setData(response.data);
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