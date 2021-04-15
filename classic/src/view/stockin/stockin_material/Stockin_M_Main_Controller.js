Ext.define('GSmartApp.view.stockin.Stockin_M_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Main_Controller',
    onPContract_Stockin: function (pcontractid) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontractid_link', pcontractid);

        var store = viewmodel.getStore('StockinStore');
        store.loadStore_Material(null, null, null, null, null, pcontractid, null, null);
    },
})