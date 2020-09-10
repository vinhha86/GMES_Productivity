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
        var main = this.getView();
        var viewModel = this.getViewModel();
        viewModel.set('pcontract_poid_link', rec.data.id);
        var productid_link = rec.data.productid_link;

        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        productStore.loadStore_bypairid_Async(productid_link, rec.data.po_quantity, true);
        productStore.load({
			scope: this,
			callback: function(records, operation, success) {
				var record = productStore.getAt(0);
                var skuView = main.down('#PContractSKUView');
                var cmbSanPham = skuView.down('#cmbSanPham');
                cmbSanPham.select(record);
                viewModel.set('IdProduct', record.get('id'));

                //clear sku list
                var storeSku = viewModel.getStore('PContractSKUStore');
                storeSku.removeAll();
                storeSku.loadStoreByPO_and_Product(record.get('id'), rec.data.id);
			}
		});
        

        
    },
    onFilterProduct: function(combo, record, eOpts ){
        // console.log(record);
        var viewmodel =  this.getViewModel();
        var store = viewmodel.getStore('PContractPOList');
        var productid_link = record.get('productid_link');
        // viewmodel.set('IdProduct_filterPO',productid_link);
        
        
        var pcontractid_link = viewmodel.get('PContract.id');

        store.loadLeafOnly_ByContract(pcontractid_link , productid_link);
    }
})