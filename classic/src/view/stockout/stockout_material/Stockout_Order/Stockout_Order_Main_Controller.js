Ext.define('GSmartApp.view.stockout.Stockout_Order_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Order_Main_Controller',
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
    control: {
        '#Stockout_Order': {
            select: 'onStockout_orderSelect'
        },
    },
    onStockout_orderSelect: function (e, selected, eOpts) {
        // console.log(selected);
        var viewmodel = this.getViewModel();
        var storeDetail = viewmodel.getStore('Stockout_order_d_Store');
        storeDetail.removeAll();
        storeDetail.GetByStockoutOrder(selected.data.id);
    },
    onOrderSearch: function(){
        var me = this.getView();
        var t = this;

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('Stockout_order_Store');

        // var limit = me.down('#orderlimitpage').getValue();
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

        // if (limit == null) {
        //     limit = 25;
        // }

        // if (page == null) {
        //     page = 1;
        // }
        
        store.loadStore_byPage(fromDate, toDate, null, null, null);
    },

    onMenu_StockoutOrderList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Tạo phiếu Xuất NPL cho nhà cắt',
                    itemId: 'btnMenu_StockoutOrderList_Cat',
                    separator: true,
                    margin: '10 0 0',
                    // iconCls: 'x-fa fas fa-edit brownIcon',
                    handler: function () {
                        // console.log(record);
                        var stockoutorderidObj = new Object();
                        stockoutorderidObj.id = record.get('id');
                        GSmartApp.util.State.set('stockoutorderidObj', stockoutorderidObj);
                        me.redirectTo('stockout_m/1/create');
                        // me.redirectTo('stockout_m/1/create/16');
                        // me.redirectTo('stockout_m/1/create/' + record.get('id'));
                    },
                },
                {
                    text: 'Tạo phiếu Xuất điều chuyển',
                    itemId: 'btnMenu_StockoutOrderList_GiaCong',
                    separator: true,
                    margin: '10 0 0',
                    // iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function () {
                        console.log(record);
                    }
                },
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
    },
});
