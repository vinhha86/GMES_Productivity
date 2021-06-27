Ext.define('GSmartApp.view.handover.HandoverPackToStock_Detail_PorderSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverPackToStock_Detail_PorderSearchController',
    init: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var pordercode = viewModel.get('pordercode');
        var granttoorgid_link = viewModel.get('granttoorgid_link');
        var POrder_ListStore = viewModel.get('POrder_ListStore');
        // POrder_ListStore.loadStoreByPordercode(pordercode);
        POrder_ListStore.loadStoreByPordercode_Async(pordercode, granttoorgid_link);
        POrder_ListStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				} else {
                    // console.log(records);
                    var items = POrder_ListStore.getData().items;
                    if(viewId == 'handover_pack_tostock_detail'){
                        if(items.length == 0){
                            m.fireEvent('found0Porder');
                        }
                        if(items.length == 1){
                            m.fireEvent('found1Porder', records);
                        }
                    }
				}
			}
        });
    },
    listen: {

    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
    },
    onQuayLai: function(){
        this.getView().up('window').close();
    },
    onLuu: function(){
        // console.log('luu');
        var viewModel = this.getViewModel();
        var m = this.getView();
        var select = m.getSelectionModel().getSelection();

        this.fireEvent('foundManyPorder', select);
    },
})