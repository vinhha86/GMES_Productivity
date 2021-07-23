Ext.define('GSmartApp.view.sync.SyncViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SyncViewController',
    init: function () {

    },
    control: {
        'SyncView': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        if (newCard.xtype == "FolderMainView") {
            var storeDriver = viewmodel.getStore('FolderDriverStore');
            storeDriver.loadFolderDriver(viewmodel.get('pathDriver'));

            var storeLocal = viewmodel.getStore('FolderTreeStore');
            var pathLocal = viewmodel.get('pathLocal');
            storeLocal.loadFolderLocal(pathLocal);
        }
        else if (newCard.xtype == "TaskSyncMainView") {
            var storeTask = viewmodel.getStore('SyncTaskStore');
            storeTask.loadStore();
        }


    }
})