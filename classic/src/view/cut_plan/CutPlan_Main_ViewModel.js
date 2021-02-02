Ext.define('GSmartApp.view.Customer.CutPlan_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CutPlan_Main_ViewModel',
    requires: ['GSmartApp.store.Sku', 'GSmartApp.store.cutplan.CutPlanRowStore'],
    stores: {
        ProductStore: {
            type: 'sku'
        },
        CutPlanRowStore : {
            type: 'CutPlanRowStore'
        }
    },
    data: {
        porder: null,
        isReadOnly: true,
        isHiddenNPL: false,
        npl: {
            
        },
        colorid_link_active: 0,
        width_npl: '30%'
    }
})