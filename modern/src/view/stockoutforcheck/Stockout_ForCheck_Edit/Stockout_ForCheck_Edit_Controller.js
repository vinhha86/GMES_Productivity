Ext.define('GSmartApp.view.stockin.Stockout_ForCheck_Edit_Controller', {
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
        // '#TabView':{
        //     activeItemchange: 'onTabViewActiveItemchange'
        // },
    },
    onTabViewActiveItemchange: function(sender, value, oldValue, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var lot_stockindId = viewModel.get('lot_stockindId');
        var pkl_stockindId = viewModel.get('pkl_stockindId');
        var pklRecheck_stockindId = viewModel.get('pklRecheck_stockindId');

        switch(value.title){
            case 'DS vải':
                var selectedDRecord = viewModel.get('selectedDRecord');
                var Stockin_d_Store = viewModel.getStore('Stockin_d_Store');
                // Stockin_d_Store.loadStore_byStockinId(stockinid_link); // loadStore_byStockinId_async
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
                break;
            case 'Kiểm 10%':
                if(pklRecheck_stockindId != null){
                    var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');
                    var StockinPklRecheckStore = viewModel.getStore('StockinPklRecheckStore');
                    // StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus(pklRecheck_stockindId, 2);
                    StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus_async(pklRecheck_stockindId, 2);
                    StockinPklRecheckStore.load({
                        scope: this,
                        callback: function(records, operation, success) {
                            if(!success){
                                this.fireEvent('logout');
                            } else {
                                if(selectedPklRecheckRecord != null){
                                    var stockinpklid_link = selectedPklRecheckRecord.get('id');
                                    var storeItems = StockinPklRecheckStore.getData().items;
                                    for(var i=0; i<storeItems.length; i++){
                                        var item = storeItems[i];
                                        if(item.get('id') == stockinpklid_link){
                                            var grid = m.getView().down('#Stockin_M_Edit_Pkl_Recheck');
                                            grid.getSelectable().select(item);
                                            viewModel.set('selectedPklRecheckRecord', item);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    var cbbox_pklRecheck_stockindId = m.getView().down('#cbbox_pklRecheck_stockindId');
                    cbbox_pklRecheck_stockindId.setValue(pklRecheck_stockindId);
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
    onLoadData:function(id,type){
        console.log('onLoadData: ' + id + ' ' + type);
        var viewModel = this.getViewModel();

        this.getInfo(id);
        // load store các tab
        var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
        Stockout_order_d_store.loadStore_byStockout_orderId(id);
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
            var response = Ext.decode(response.responseText); console.log(response);
            if(response.respcode == 200) {
                var data = response.data;

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