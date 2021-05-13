Ext.define('GSmartApp.view.stockout.Stockout_OrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_OrderController',
    init: function() {
        // this.callParent(arguments);
        var me = this.getView();

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockoutorderdate_from').setValue(new Date(priorDate));

        this.onOrderSearch();
        
        // var store_stockout = this.getViewModel().getStore('Stockout');
        // if (store_stockout) {
        //     var page = store_stockout.currentPage;
        //     if (page == null) {
        //         page = 1;
        //     }
        //      store_stockout.loadByDate(0,'', new Date(),new Date(), page, 25, 0 ,0);
        // }
    },
    onActivate: function () {
        this.onOrderSearch();
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onOrderSearch',
            }
        }
    },        
    control:{

    },
    onOrderSearch: function(){
        var me = this.getView();
        var t = this;

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('Stockout_order_Store');

        var limit = me.down('#orderlimitpage').getValue();
        // var stockouttypeid = me.down('#stockouttypeid').getValue();
        var fromDate = me.down('#stockoutorderdate_from').getValue();
        var toDate = me.down('#stockoutorderdate_to').getValue();
        // var OrgToStore = me.down('#OrgToStore').getValue();
        // var OrgFromStore = me.down('#OrgFromStore').getValue();
        // var stockoutcode = '';
        // var orgid_from_link = null;
        // var orgid_to_link = null;
        // var stockouttypefrom = 1;
        // var stockouttypeto = 10;

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }
        
        store.loadStore_byPage(fromDate, toDate, page, limit, 0);
    },
});
