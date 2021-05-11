Ext.define('GSmartApp.view.stockin.Stockout_ForCheck_Edit_D_MainController', {
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

        this.setComboPklRecheck();
    },
    setComboPklRecheck: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('pklRecheck_stockindId', selectedDRecord.get('id'));
    },
    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var selectedDRecord = viewModel.get('selectedDRecord');

        var Stockin_d_Store = viewModel.getStore('Stockin_d_Store');
        Stockin_d_Store.loadStore_byStockinId_async(stockinid_link);
        Stockin_d_Store.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    if(selectedDRecord != null){
                        var storeItems = Stockin_d_Store.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == selectedDRecord.get('id')){
                                var grid = m.getView().down('#Stockin_M_Edit_D');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedDRecord', item);
                                viewModel.set('lot_stockindId', item.get('id'));
                                viewModel.set('pkl_stockindId', item.get('id'));
                                viewModel.set('pklRecheck_stockindId', item.get('id'));
                            }
                        }
                    }
                }
            }
        });
    }
})