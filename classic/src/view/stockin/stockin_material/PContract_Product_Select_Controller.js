Ext.define('GSmartApp.view.stockin.PContract_Product_Select_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Product_Select_Controller',
	init: function() {
        var viewmodel = this.getViewModel();
        console.log(viewmodel.get('pcontractid_link'));
        var PContractProductStore = viewmodel.getStore('PContractProductStore');
        PContractProductStore.loadStore(viewmodel.get('pcontractid_link'), null);
    },
    onCloseButton:function(){
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(){
        var select = this.getView().getSelectionModel().getSelection();
        if(select.length > 0){
            this.fireEvent('onSelect_Products', select);
        }
    },
    onProductCodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('ProductCodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.ProductCodeFilter = filters.add({
                id: 'ProductCodeFilter',
                property: 'productBuyerCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ProductCodeFilter) {
            filters.remove(this.ProductCodeFilter);
            this.ProductCodeFilter = null;
        }
    },
})