Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_ForCheck_MainController',
    init: function() {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#fromDate').setValue(new Date(priorDate));
        this.loadData();
    },
    control: {
        '#btnBack': {
            tap: 'onBtnBackTap'
        }
    },
    loadData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var fromDate = this.lookupReference('fromDate').getValue();
        var toDate = this.lookupReference('toDate').getValue();

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.loadStore_byPage(fromDate, toDate, 0, 0, 0);
        Stockout_order_Store.getSorters().add({
            property: 'orderdate',
            direction: 'ASC'
        });
    },
    onBtnBackTap: function(){
        this.redirectTo("mobilemenu");
    },
    onStockoutOrderFilterKeyup: function (){
        console.log('here');
        var grid = this.getView().down('#Stockout_ForCheck_List'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#stockoutOrderFilter'),
            store = grid.store,
            filters = grid.store.getFilters();
        
        var value = filterField.getValue() == null ? '' : filterField.getValue().toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            if(
                rec.get('org_from_name').toLowerCase().includes(value) ||
                rec.get('org_to_name').toLowerCase().includes(value) ||
                rec.get('stockout_order_code').toLowerCase().includes(value) ||
                Ext.Date.format(rec.get('timecreate'),'d/m/y').toLowerCase().includes(value)
                
            ){
                return true;
            }
            return false;
        });
    },
});
