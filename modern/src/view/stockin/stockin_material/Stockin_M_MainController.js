Ext.define('GSmartApp.view.stockin.Stockin_M_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_MainController',
    init: function() {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#fromDate').setValue(new Date(priorDate));
        this.loadData();
    },
    control: {
        '#btnThem': {
            tap: 'onBtnThemTap'
        },
        '#btnBack': {
            tap: 'onBtnBackTap'
        }
    },
    loadData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var fromDate = this.lookupReference('fromDate').getValue();
        var toDate = this.lookupReference('toDate').getValue();

        var StockinStore = viewModel.getStore('StockinStore');
        StockinStore.loadStore(null, fromDate, toDate, null, 0, 100, 1);
        StockinStore.getSorters().add('stockindate');
    },
    onBtnThemTap: function ( btn, e, eOpts ){
        var viewModel = this.getViewModel();
        var viewId = "stockin_m";
        this.redirectTo(viewId + "/" + 0 + "/edit");
    },
    onBtnBackTap: function(){
        this.redirectTo("mobilemenu");
    }
});
