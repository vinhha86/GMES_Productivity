Ext.define('GSmartApp.view.pcontract.PContract_porder_gantt_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_porder_gantt_ViewModel',
    requires: ['GSmartApp.store.pcontract.PContract_porder_gantt_store'],
    stores:{
        TaskStore: {
            type: 'PContract_porder_gantt_store'
        }     
    }
})