Ext.define('GSmartApp.view.planporder.PlanPoderView_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PlanPoderView_ViewModel',
    requires: [
        'GSmartApp.store.plan.TaskStore',
        'GSmartApp.store.POrderFilter'
    ],
    stores:{
        TaskStore: {
            type: 'TaskStore'
        },
        OrgStore: {
            type: 'ListOrgStore'
        },     
        POrderUnGranted: {
            type: 'POrderFilter'
        }   
    }
})