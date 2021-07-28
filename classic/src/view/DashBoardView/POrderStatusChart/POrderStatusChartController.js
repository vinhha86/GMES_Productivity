Ext.define('GSmartApp.view.DashBoardView.POrderStatusChart.POrderStatusChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderStatusChartController',
    init: function () {

    },
    control: {
        '#btnRefresh':{
            click: 'onBtnRefresh'
        },
        '#btnChangeView':{
            click: 'onBtnChangeView'
        },
    },
    onBtnRefresh: function(){
        var viewModel = this.getViewModel();
        var POrderStatusChartStore = viewModel.getStore('POrderStatusChartStore');
        POrderStatusChartStore.load();
    },
    onBtnChangeView: function(){
        var viewModel = this.getViewModel();
        var isPOrderStatusChart_Grid_Show = viewModel.get('isPOrderStatusChart_Grid_Show');
        viewModel.set('isPOrderStatusChart_Grid_Show', !isPOrderStatusChart_Grid_Show);
    }
});