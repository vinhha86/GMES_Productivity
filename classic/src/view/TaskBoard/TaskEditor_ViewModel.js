Ext.define('GSmartApp.view.TaskBoard.TaskEditor_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TaskEditor_ViewModel',
    requires: [
        'GSmartApp.store.TaskBoard.TaskBoard_Store',
        'GSmartApp.store.TaskBoard.TaskUser_Store'
    ],
    stores: {
        TaskBoard_Store: {
            type: 'TaskBoard_Store'
        },
        TaskUser_Store : {
            type: 'TaskUser_Store'
        }
    }
})