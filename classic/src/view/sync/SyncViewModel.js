Ext.define('GSmartApp.view.sync.SyncViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SyncViewModel',
    requires: ['GSmartApp.store.sync.FolderTreeStore', 'GSmartApp.store.sync.SyncTaskStore', 'GSmartApp.store.sync.SyncTaskDetailStore'],
    stores: {
        FolderTreeStore: {
            type: 'FolderTreeStore'
        },
        FolderDriverStore: {
            type: 'FolderTreeStore'
        },
        SyncTaskStore: {
            type: 'SyncTaskStore'
        },
        SyncTaskDetailStore: {
            type: 'SyncTaskDetailStore'
        }
    },
    data: {
        pathDriver: '',
        pathLocal: 'C:/'
    }
});
