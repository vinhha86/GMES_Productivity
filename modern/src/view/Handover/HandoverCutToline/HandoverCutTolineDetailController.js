Ext.define('GSmartApp.view.handover.HandoverCutTolineDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutTolineDetailController',
    init: function() {
        var viewModel = this.getViewModel();
        viewModel.set('viewId', 'handover_cut_toline_edit');

        // load cbo org_to
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
    control: {
        // '#btnThem': {
        //     tap: 'onBtnThemTap'
        // }
    },
    onLoadData: function (id){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('handoverid_link', id);
        if(id == 0){
            m.loadNewInfo();
        }else{
            m.loadInfo(id);
        }
    },
    loadInfo: function(handoverid_link){
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('handoverid_link');

        var params = new Object();
        params.id = handoverid_link;

        GSmartApp.Ajax.post('/api/v1/handover/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;

                    // log
                    console.log('function loadInfo: success');
                    console.log(data);

                    // set data
                    viewModel.set('isCreateNew', false);
                    viewModel.set('currentRec', data);

                    var pordercode = data.ordercode.toString();
                    viewModel.set('pordercode',pordercode);

                    var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
                    ListOrgStore_To.loadStoreByPorderIdLink(data.porderid_link);

                    // set sku store
                    var handoverProducts = data.handoverProducts;
                    if(handoverProducts != null && handoverProducts.length > 0){
                        var handoverProduct = handoverProducts[0];
                        if(
                            handoverProduct != null && 
                            handoverProduct.handoverSKUs != null && 
                            handoverProduct.handoverSKUs.length > 0
                        ){
                            var handoverSKUs = handoverProduct.handoverSKUs;
                            var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
                            HandoverSkuStore.setData([]);
                            HandoverSkuStore.setData(handoverSKUs);
                        }
                    }
                }else{
                    console.log('function loadInfo: failed');
                }
            })
    }
});
