Ext.define('GSmartApp.view.process_shipping.ProcessShippingMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProcessShippingMainViewModel',
    requires: ['GSmartApp.store.pcontract.PContractPOStore',
        'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.SKUBalanceStore',
        'GSmartApp.store.porder.porderSKUStore',
        'GSmartApp.store.porder.POrder_ListGrantStore'],
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
        },
        POLineSKU_Store: {
            type: 'PContractSKUStore'
        },
        porderSKUStore: {
            type: 'porderSKUStore'
        },
        POrder_ListGrantStore: {
            type: 'POrder_ListGrantStore'
        }
    },
    data: {
        shipdate_to: new Date(),
        shipdate_from: new Date(),
        porderid_link: 0,
        pcontract_poid_link: 0,
        productid_link: 0
    }
})