Ext.define('GSmartApp.view.sync.Task.TaskViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskViewController',
    init: function () {
        
    },
    control: {

    },
    listen: {
        controller: {
            'FolderLocalViewController' : {
                'ReloadTask' : 'onReloadTask'
            }
        }
    },
    onReloadTask: function(taskid){
        var grid = this.getView();
         var viewmodel = this.getViewModel();
         var store = viewmodel.getStore('SyncTaskStore');
         store.load({
             callback: function(records, operation, success){
                 if(success){
                    var rec = store.findRecord('id',taskid);
                    grid.getSelectionModel().select(rec, false, false);
                 }
             }
         })
    }
})