Ext.define('GSmartApp.view.TaskBoard.TaskBoardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskBoardViewController',
    listen : {
        store : {
            '*' : {
                update : 'refreshMainTask',
                remove : 'refreshMainTask',
                add    : 'refreshMainTask'
            }
        }
    },

    refreshMainTask : function (store, model) {
        model = model instanceof Array ? model[ 0 ] : model;

        var taskStore = this.getView().down('#taskboard').getTaskStore();
        var mainTask  = taskStore.getById(model.get('TaskId'));

        if (model instanceof GSmartApp.model.TaskBoard.SubTask_model) {
            var subTasks = mainTask.subTasks();
            var nbrDone  = subTasks.query('Done', true).length;

            mainTask.set('PercentDone', nbrDone > 0 ? 100 * nbrDone / subTasks.getCount() : 0, { silent : true });

            this.getView().down('#taskboard').refreshTaskNode(mainTask);
        } else if (model instanceof GSmartApp.model.TaskBoard.Comment_model) {
            this.getView().down('#taskboard').refreshTaskNode(mainTask);
        }
    },

    onCheckboxChange : function (e, checkbox) {
        var taskboard = this.getView().down('#taskboard');
        var task      = taskboard.resolveRecordByNode(checkbox);
        var subtask   = task.subTasks().getByInternalId(Number(checkbox.getAttribute('data-id')));
        var current   = subtask.get('Done');

        subtask.set('Done', !current);
    }
})