Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_Grant_SKU_Plan_ViewModel',
    requires: [
        'GSmartApp.store.porder.POrderGrant_SKU_PlanStore',
        'GSmartApp.store.porder.POrderGrant_SKU_Plan_MaterialStore',
    ],
    stores: {
        POrderGrant_SKU_PlanStore: {
            type: 'POrderGrant_SKU_PlanStore'
        },
        POrderGrant_SKU_Plan_MaterialStore: {
            type: 'POrderGrant_SKU_Plan_MaterialStore'
        },
    },
    data: {
        sourceView: null,
        eventRecord: null,
        porder_grantid_link: null
    },
    formulas: {
        // isHiddenYard: function (get) {
        //     if (get('order.unitid_link') == 1) return true;
        //     return false;
        // },
    }
})