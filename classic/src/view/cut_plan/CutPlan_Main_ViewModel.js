Ext.define('GSmartApp.view.Detail.CutPlan_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CutPlan_Main_ViewModel',
    requires: ['GSmartApp.store.Sku', 'GSmartApp.store.cutplan.CutPlanRowStore', 'GSmartApp.store.warehouse.WarehouseStore'],
    stores: {
        ProductStore: {
            type: 'sku'
        },
        CutPlanRowStore: {
            type: 'CutPlanRowStore'
        },
        WarehouseStore: {
            type: 'WarehouseStore'
        },
        WarehouseCutplanStore: {
            type: 'WarehouseStore'
        }
    },
    data: {
        isReadOnly: true,
        npl: {

        },
        colorid_link_active: 0,
        cutplanrowid_link: 0,
        width_npl: '100%',
        type: {
            type: 1
        },
        productid_link: 0,
        pcontractid_link: 0
    }
})