Ext.define('GSmartApp.view.Customer.CutPlan_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CutPlan_Main_ViewModel',
    requires: ['GSmartApp.store.Sku'],
    stores: {
        ProductStore: {
            type: 'sku'
        }
    },
    data: {
        porder: null,
        isReadOnly: true
    }
})