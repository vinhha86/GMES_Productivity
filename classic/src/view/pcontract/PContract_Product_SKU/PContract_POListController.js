Ext.define('GSmartApp.view.pcontract.PContract_POListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POListController',
    onPOBuyerFilterKeyup:function(){
        var grid = this.getView(),
            filterField = this.lookupReference('POBuyerFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.POBuyerFilter = filters.add({
                id: 'POBuyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.POBuyerFilter) {
            filters.remove(this.POBuyerFilter);
            this.POBuyerFilter = null;
        }
    }
})