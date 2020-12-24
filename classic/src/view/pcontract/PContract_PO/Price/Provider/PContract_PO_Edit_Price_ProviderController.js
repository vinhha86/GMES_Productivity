Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.Provider.PContract_PO_Edit_Price_ProviderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Price_ProviderController',
    init: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var ListProviderStore = viewModel.getStore('ListProviderStore');
        ListProviderStore.loadStoreByOrgTypeString_Async('5');
        ListProviderStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				} else {
                    var record = viewModel.get('record');
                    var providerid_link = record.data.providerid_link;
                    var data = ListProviderStore.findRecord('id', providerid_link);
                    me.getSelectionModel().select(data, true);
				}
			}
        });
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnAdd': {
            click: 'onAdd'
        },
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onAdd: function(){
        var m = this.getView();
        var viewModel = this.getViewModel();
        // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
        var select = m.getSelectionModel().getSelection();
        this.fireEvent("AddProvider", select);
        this.onThoat();
    }
})