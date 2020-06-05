Ext.define('GSmartApp.view.pcontract.PContractSKUMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractSKUMainViewController',
    init: function () {
        
    },
    control:{
        'PContract_POList': {
            itemclick: 'onSelectPO'
        }
    },
    onSelectPO: function(m, rec){
        var viewModel = this.getViewModel();
        var productid_link = rec.data.productid_link;

        var productStore = viewModel.getStore('PContractProductStore');
        productStore.loadStore_bypairid(productid_link);
    }
})