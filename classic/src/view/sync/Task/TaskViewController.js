Ext.define('GSmartApp.view.sync.Task.TaskViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskViewController',
    init: function () {

    },
    control: {
        '#TaskView': {
            select: 'onSelectTask'
        }
    },
    listen: {
        controller: {
            'FolderLocalViewController': {
                'ReloadTask': 'onReloadTask'
            }
        }
    },
    onSelectTask: function (grid, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('SyncTaskDetailStore');
        var taskid_link = record.get('id');
        store.loadtaskdetail_by_task(taskid_link);
    },
    onReloadTask: function (taskid) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('SyncTaskStore');
        store.load({
            callback: function (records, operation, success) {
                if (success) {
                    var rec = store.findRecord('id', taskid);
                    grid.getSelectionModel().select(rec, false, false);
                }
            }
        })
    }
})