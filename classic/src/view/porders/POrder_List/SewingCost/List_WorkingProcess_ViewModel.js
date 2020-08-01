Ext.define('GSmartApp.view.porders.SewingCost.POrder_List.List_WorkingProcess_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.List_WorkingProcess_ViewModel',
    requires: [
        'GSmartApp.store.WorkingProcess.WorkingProcess_Store'
    ],
    stores: {
        WorkingProcess_Store: {
            type: 'WorkingProcess_Store'
        }
    },
    data: {
        productid_link: 0
    }
})