Ext.define('GSmartApp.view.pcontract.PContract_Bom_PO_VIewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_PO_VIewController',
    control: {

    },
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractBom_PO_Store');
        var pcontractid_link = viewmodel.get('pcontractid_link');
        var productid_link = viewmodel.get('productid_link');

        store.loadPOConfirm(pcontractid_link, productid_link);
    }
})