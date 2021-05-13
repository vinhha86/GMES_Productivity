Ext.define('GSmartApp.view.process_shipping.POrder_Offer_viewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_Offer_viewModel',
    requires: ['GSmartApp.store.pcontract.PContractPOStore'],
    stores: {
        POrder_ListStore: {
            type: 'POrder_ListStore'
        }
    },
    data: {
        pcontract_poid_link: 0
    }
})