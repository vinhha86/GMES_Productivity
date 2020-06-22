Ext.define('GSmartApp.view.pcontract.PContractSKUMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractSKUMainViewController',
    init: function () {
        
    },
    control:{
        'PContract_POList': {
            itemclick: 'onSelectPO'
        },
        '#productFilter': {
            select: 'onFilterProduct'
        }
    },
    onSelectPO: function(m, rec){
        var viewModel = this.getViewModel();
        var productid_link = rec.data.productid_link;

        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        productStore.loadStore_bypairid(productid_link, true);
    },
    onFilterProduct: function(combo, record, eOpts ){
        var store = this.getViewModel().getStore('PContractPOList');
        var productid_link = this.getViewModel().get('IdProduct');
        var pcontractid_link = this.getViewModel().get('PContract.id');

        store.loadStore(pcontractid_link , productid_link);
    }
})