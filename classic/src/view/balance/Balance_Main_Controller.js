Ext.define('GSmartApp.view.balance.Balance_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Balance_Main_Controller',
    init: function () {
        // this.onCalBalance();
    },
    onCalBalance: function(){
        var viewmodel = this.getViewModel();
        var SKUBalanceStore = viewmodel.getStore('SKUBalanceStore');
        console.log(SKUBalanceStore);
        if (null!=SKUBalanceStore){
            SKUBalanceStore.loadBalanceByPo(viewmodel.get('pcontractid_link'), viewmodel.get('pcontract_poid_link'));
        }
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    },
})