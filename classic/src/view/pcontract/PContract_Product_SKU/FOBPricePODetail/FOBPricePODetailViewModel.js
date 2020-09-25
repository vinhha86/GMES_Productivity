Ext.define('GSmartApp.view.pcontract.FOBPricePODetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.FOBPricePODetailViewModel',
    requires: ['GSmartApp.store.FOBPricePODetailStore'],
	stores: {
        FOBPricePODetailStore: {
            type: 'FOBPricePODetailStore'
        }
    },
    data: {
        record: null
    }
})