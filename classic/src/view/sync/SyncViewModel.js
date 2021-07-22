Ext.define('GSmartApp.view.sync.SyncViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SyncViewModel',
    requires: ['GSmartApp.store.sync.FolderTreeStore', 'GSmartApp.store.sync.SyncTaskStore'],
    stores: {
        FolderTreeStore: {
            type: 'FolderTreeStore'
        },
        FolderDriverStore: {
            type: 'FolderTreeStore'
        },
        SyncTaskStore: {
            type: 'SyncTaskStore'
        }
    },
    data: {
        pathDriver: '',
        pathLocal: 'C:/'
    }
});
