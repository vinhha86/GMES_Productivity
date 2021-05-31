Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_ForCheck_Edit_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        
        // nếu vào từ view xuất kho
        var tempObj = GSmartApp.util.State.get('tempObj');
        if(tempObj){
            viewModel.set('is_stockout_m_view', tempObj.is_stockout_m_view);
            GSmartApp.util.State.set('tempObj', null);

            // ẩn tay tab tở vải nếu vào từ view xuất kho
            // var view = this.getView().down('#TabView');
            // var tabToVai = view.down('#Stockout_ForCheck_Edit_ToVai_Main');
            // tabToVai.tab.hide();
        }else{ // nếu vào từ view tở vải
            // do nothing
        }
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
                            if(selectedDRecord != null){
                                var storeItems = Stockout_order_d_store.getData().items;
                                for(var i=0; i<storeItems.length; i++){
                                    var item = storeItems[i];
                                    if(item.get('id') == selectedDRecord.get('id')){
                                        var grid = m.getView().down('#Stockout_ForCheck_Edit_D');
                                        grid.getSelectable().select(item);
                                        viewModel.set('selectedDRecord', item);
                                        viewModel.set('pkl_stockout_order_dId', item.get('id'));
                                    }
                                }
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
                                    var id = selectedPklRecord.get('id');
                                    var storeItems = Stockout_order_pkl_Store.getData().items;
                                    for(var i=0; i<storeItems.length; i++){
                                        var item = storeItems[i]; console.log(item.get('id'));
                                        if(item.get('id') == id){
                                            var grid = m.getView().down('#Stockout_ForCheck_Edit_ToVai');
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
                    
                }
            }
        });

    },
    onBackPage: function(){
        var viewModel = this.getViewModel();
        var is_stockout_m_view = viewModel.get('is_stockout_m_view');
        if(is_stockout_m_view){ // view xuất kho
            this.redirectTo('stockout_m');
        }else{ // view tở vải
            this.redirectTo('stockoutforcheckmain');
        }
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
                }
                if(data.unitid_link == 1){
                    data.unitname = "MÉT";
                    data.unitName = "MÉT";
                }
                if(data.unitid_link == 3){
                    data.unitname = "YDS";
                    data.unitName = "YDS";
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
        var viewmodel = this.getViewModel();
        var Stockout_order_d_store = viewmodel.getStore('Stockout_order_d_store');

        Stockout_order_d_store.getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        });

        var Stockout_order_pkl_Store = viewmodel.getStore('Stockout_order_pkl_Store');
        Stockout_order_pkl_Store.getSorters().add({
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    }
})