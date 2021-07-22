Ext.define('GSmartApp.view.sync.SyncViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SyncViewModel',
    requires: ['GSmartApp.store.sync.FolderTreeStore'],
    stores: {
        FolderTreeStore: {
            type: 'FolderTreeStore'
        },
        FolderDriverStore: {
            type: 'FolderTreeStore'
        }
    },
    data: {
        pathDriver: '',
        pathLocal: 'C:/'
    }
});
