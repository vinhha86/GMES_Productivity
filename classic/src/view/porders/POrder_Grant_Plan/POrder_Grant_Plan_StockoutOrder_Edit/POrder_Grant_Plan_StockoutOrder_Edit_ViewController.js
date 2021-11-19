Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_StockoutOrder_Edit_ViewController',
    init: function () {
        
    },
    control: {
        '#POrder_Grant_Plan_StockoutOrder_Edit_View': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat',
        },
        '#btnCreate': {
            click: 'onCreate',
        },
        '#btnTest': {
            click: 'onTest',
        },
    },
    onTest: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date_list = viewModel.get('date_list');
        var pordergrantid_link = viewModel.get('pordergrantid_link');
        
        console.log(date_list);
        console.log(pordergrantid_link);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onCreate: function(){
        console.log('btn create pressed');
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date_list = viewModel.get('date_list');
        var pordergrantid_link = viewModel.get('pordergrantid_link');
    },
})