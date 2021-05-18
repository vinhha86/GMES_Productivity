Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_MainController',
    init: function() {
        var viewModel = this.getViewModel();
    },
    control: {
        '#btnBack': {
            tap: 'onBtnBackTap'
        },
    },
    onBtnBackTap: function(){
        this.redirectTo("mobilemenu");
    },
});
