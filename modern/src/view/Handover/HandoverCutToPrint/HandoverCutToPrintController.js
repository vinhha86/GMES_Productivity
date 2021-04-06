Ext.define('GSmartApp.view.handover.HandoverCutToPrintController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutToPrintController',
    init: function() {
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('viewId', 'handover_cut_toprint');

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

        var HandoverStore = viewModel.getStore('HandoverStore');
        HandoverStore.loadStoreBySearch(2, '', 
        fromDate, toDate, null, null, [], 100, 1, viewId);
        // HandoverStore.getSorters().add('handover_date');
        HandoverStore.getSorters().add({
            property: 'handover_date',
            direction: 'DESC'
        });
    },
    onBtnThemTap: function ( btn, e, eOpts ){
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        this.redirectTo(viewId + "/" + 0 + "/edit");
        // console.log(viewId + "/" + 0 + "/edit");
    },
    onBtnBackTap: function(){
        // Ext.util.History.back();
        this.redirectTo("mobilemenu");
    }
});
