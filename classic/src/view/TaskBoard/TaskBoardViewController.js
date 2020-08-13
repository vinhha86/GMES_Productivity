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
    control: {
        '#btnAddTask': {
            click: 'onAddTask'
        }
    },

    onAddTask: function(){
        var view = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 200,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm việc mới',
            closeAction: 'destroy',
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'AddTask'
            }]
        });
        form.show();        
        form.down('#AddTask').down('#text').focus();

        form.down('#AddTask').on('Addtask', function(task){
            var taskStore = view.down('#taskboard').getTaskStore();

            taskStore.insert(0, task);
            form.close();
        })
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

    beforeDrop: function(drop, dragContext, e, eOpts){
        var task = dragContext.taskRecords[0];
        if(task.get('tasktypeid_link') != -1){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn không được phép di chuyển công việc! Trạng thái công việc sẽ được tự động cập nhật',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function () {
                    dragContext.finalize(false);
                }
            });
            return false;
        }
    },

    onTaskDrop: function(drop, task, eOpts ){

    }

    // onCheckboxChange : function (e, checkbox) {
    //     var taskboard = this.getView().down('#taskboard');
    //     var task      = taskboard.resolveRecordByNode(checkbox);
    //     var subtask   = task.subTasks().getByInternalId(Number(checkbox.getAttribute('data-id')));
    //     var current   = subtask.get('Done');

    //     subtask.set('Done', !current);
    // }
})