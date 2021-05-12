Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_D_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_ForCheck_Edit_D_MainController',
	init: function () {
		
	},
	control: {
        '#Stockout_ForCheck_Edit_D': {
			// itemtap: 'onItemTap',
            itemsingletap: 'onStockout_ForCheck_Edit_DItemTap'
		},
	},
	onStockout_ForCheck_Edit_DItemTap: function(dataView, index, target, record, e, eOpts){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		viewModel.set('selectedDRecord', record);

        this.setComboPkl();
    },
    setComboPkl: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('pkl_stockout_order_dId', selectedDRecord.get('id'));
    },
    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutorderid_link = viewModel.get('stockout_order.id');

        var Stockout_order_d_store = viewModel.getStore('Stockin_d_Store');
        Stockout_order_d_store.loadStore_byStockout_orderId_async(stockoutorderid_link);
        Stockout_order_d_store.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    var storeItems = Stockout_order_d_store.getData().items;
                    for(var i=0; i<storeItems.length; i++){
                        var item = storeItems[i];
                        var grid = m.getView().down('#Stockout_ForCheck_Edit_D');
                        grid.getSelectable().deselectAll();
                        grid.getSelectable().select(item);
                        viewModel.set('selectedDRecord', item);
                        viewModel.set('pkl_stockout_order_dId', item.get('id'));
                    }
                }
            }
        });
    }
})