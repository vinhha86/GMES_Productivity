Ext.define('GSmartApp.view.process_shipping.ProcessShippingMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProcessShippingMainViewModel',
    requires: ['GSmartApp.store.pcontract.PContractPOStore',
        'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.SKUBalanceStore'],
    stores: {
        POLineStore: {
            type: 'PContractPOStore'
        },
        POrder_ListStore: {
            type: 'POrder_ListStore'
        },
        SKUBalanceStore_Mat: {
            type: 'SKUBalanceStore'
        },
        SKUBalanceStore_Trim: {
            type: 'SKUBalanceStore'
        }
    },
    data: {
        shipdate_to: new Date(),
        porderid_link: 1379
    }
})