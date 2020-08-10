Ext.define('GSmartApp.model.TaskBoard.TaskBoard_Model', {
    extend : 'Kanban.model.Task',

    requires : [
        'GSmartApp.model.TaskBoard.SubTask_model',
        'GSmartApp.model.TaskBoard.Comment_model'
    ],

    fields : [
        { name : 'Duration', type : 'int' },
        {
            name    : 'PercentDone',
            type    : 'int'
        }
    ],

    associations : [
        {
            model          : 'GSmartApp.model.TaskBoard.Comment_model',
            associationKey : 'Comment_model',
            name           : 'Comment_model',
            type           : 'hasMany'
        },
        {
            model          : 'GSmartApp.model.TaskBoard.SubTask_model',
            associationKey : 'SubTask_model',
            name           : 'SubTask_model',
            type           : 'hasMany'
        }
    ],

    // Don't allow setting as Done if some subtask is not completed
    isValidTransition : function(state) {
        if (state === 'Done') {
            var subtasks = this.subTasks();

            return this.callParent(arguments) && subtasks.query('Done', false).length === 0;
        }

        return this.callParent(arguments);
    }
});