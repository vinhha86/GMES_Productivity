Ext.define('GSmartApp.view.handover.HandoverDetailPorderSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverDetailPorderSearchController',
    init: function () {
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var POrder_ListStore = viewModel.get('POrder_ListStore');
        POrder_ListStore.loadStoreByPordercode(pordercode);
    },
    listen: {

    },
    control: {
        '#HandoverDetailPorderSearch': {
            childtap: 'onChildtap'
        },
    },
    onChildtap: function ( list, location, eOpts ) {
        var record = location.record;
        this.fireEvent('selectPOrder', record);
    }
})