Ext.define('GSmartApp.view.DashBoardView.POrderStatusChart.POrderStatusChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderStatusChartController',
    init: function () {

    },
    control: {
        '#btnRefresh':{
            click: 'onBtnRefresh'
        },
    },
    onBtnRefresh: function(){
        var viewModel = this.getViewModel();
        var POrderStatusChartStore = viewModel.getStore('POrderStatusChartStore');
        POrderStatusChartStore.load();
    }
});