Ext.define('GSmartApp.view.pcontract.PContract_Bom_PO_VIewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_PO_VIewController',
    control: {

    },
    listen: {
        store: {
            'PContractPOStore': {
                'loaddone': 'onLoadDone'
            }
        }
    },
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractBom_PO_Store');
        var pcontractid_link = viewmodel.get('pcontractid_link');
        var productid_link = viewmodel.get('productid_link');
        var material_skuid_link = viewmodel.get('material_skuid_link');

        store.loadPOConfirm(pcontractid_link, productid_link, material_skuid_link);
    },
    onLoadDone: function (data) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractBom_PO_Store');
        var value = store.findRecord('id', data[0].pcontract_poid_link);
        console.log(value);
        grid.getSelectionModel().select(value, true, true);
    }
})