Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_ForCheck_Edit_Controller',
	init: function() {
        
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                // newdata: 'onNewData',
				// urlBack:'onUrlBack'
            }
        }
	},
    control:{
        '#btnBack':{
            tap: 'onBackPage'
        },
        '#btnHome':{
            tap: 'onBtnHomeTap'
        },
        '#TabView':{
            activeItemchange: 'onTabViewActiveItemchange'
        },
    },
    onTabViewActiveItemchange: function(sender, value, oldValue, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutorderid_link = viewModel.get('stockout_order.id');
        var pkl_stockout_order_dId = viewModel.get('pkl_stockout_order_dId');

        switch(value.title){
            case 'DS vải':
                var selectedDRecord = viewModel.get('selectedDRecord');
                var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
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
                break;
            case 'Tở vải':
                if(pkl_stockout_order_dId != null){
                    var selectedPklRecord = viewModel.get('selectedPklRecord');
                    var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');
                    Stockout_order_pkl_Store.loadStore_byStockout_orderDId_async(pkl_stockout_order_dId);
                    Stockout_order_pkl_Store.load({
                        scope: this,
                        callback: function(records, operation, success) {
                            if(!success){
                                this.fireEvent('logout');
                            } else {
                                if(selectedPklRecord != null){
                                    var stockinpklid_link = selectedPklRecord.get('id');
                                    var storeItems = Stockout_order_pkl_Store.getData().items;
                                    for(var i=0; i<storeItems.length; i++){
                                        var item = storeItems[i];
                                        if(item.get('id') == stockinpklid_link){
                                            var grid = m.getView().down('#Stockin_M_Edit_Pkl_Recheck');
                                            grid.getSelectable().select(item);
                                            viewModel.set('selectedPklRecord', item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    var cbbox_pkl_stockout_order_dId = m.getView().down('#cbbox_pkl_stockout_order_dId');
                    cbbox_pkl_stockout_order_dId.setValue(pkl_stockout_order_dId);
                }
                break;
            default: 
                console.log('tab title không tồn tại');
                break;
        }
    },
    onBtnHomeTap: function(){
        this.redirectTo("mobilemenu");
    },
    onLoadData:function(id){
        var m = this;
        var viewModel = this.getViewModel();

        this.getInfo(id);
        // load store các tab
        var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
        Stockout_order_d_store.loadStore_byStockout_orderId_async(id);
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

    },
    onBackPage: function(){
        // console.log('onBackPage');
        this.redirectTo('stockoutforcheckmain');
    },
    getInfo: function(id){
        var me = this;
        var viewModel = this.getViewModel();

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockoutorder/stockoutorder_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                var data = response.data;

                if(data.unitid_link == null) { // nếu đơn vị tính là null -> met
                    data.unitid_link = 1; 
                    data.unitname = "MÉT";
                    data.unitName = "MÉT";
                }
                viewModel.set('stockout_order', data);

                setTimeout(function(){
                    me.onSort();
                }, 1000);
            }
		})
    },
    // sort store
    onSort: function(){
        var me = this.getView();
        var Stockout_ForCheck_Edit_D = me.down('#Stockout_ForCheck_Edit_D');
        Stockout_ForCheck_Edit_D.getStore().getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        });

        // var Stockin_M_Edit_Pkl_Recheck = me.down('#Stockin_M_Edit_Pkl_Recheck');
        // Stockin_M_Edit_Pkl_Recheck.getStore().getSorters().add({
        //     property: 'lotnumber',
        //     direction: 'ASC'
        // },{
        //     property: 'packageid',
        //     direction: 'ASC'
        // });
    }
})