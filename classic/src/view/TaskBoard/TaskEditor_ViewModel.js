Ext.define('GSmartApp.view.TaskBoard.TaskEditor_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TaskEditor_ViewModel',
    requires: [
        'GSmartApp.store.TaskBoard.TaskBoard_Store',
        'GSmartApp.store.TaskBoard.TaskUser_Store',
        'GSmartApp.store.TaskBoard.TaskFlowStatusStore'
    ],
    stores: {
        TaskUser_Store : {
            type: 'TaskUser_Store'
        },
        FlowStatusStore: {
            type: 'TaskFlowStatusStore'
        }
    },
    data: {
        ishidden_add_checklist: true,
        isdisable_checkbox: false,
        flow_status: 3,
        isedit_comment: true,
        comment: ''
    }
})