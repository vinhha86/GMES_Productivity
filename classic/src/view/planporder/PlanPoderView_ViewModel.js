Ext.define('GSmartApp.view.planporder.PlanPoderView_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PlanPoderView_ViewModel',
    requires: [
        'GSmartApp.store.plan.TaskStore',
        'GSmartApp.store.POrderFilter',
        'GSmartApp.store.pcontract.PContract_porder_gantt_store'
    ],
    stores:{
        OrgStore: {
            type: 'ListOrgStore'
        },     
        POrderUnGranted: {
            type: 'POrderFilter'
        }   ,
        TaskStore: {
            type: 'PContract_porder_gantt_store'
        }    
    },
    data: {
        gantt: {
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 1),
            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()+6, 1),
            listid: '13,14'
        }
    }
})