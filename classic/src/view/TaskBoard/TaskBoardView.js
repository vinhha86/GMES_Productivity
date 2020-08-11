Ext.define('GSmartApp.view.TaskBoard.TaskBoardView', {
    extend: 'Ext.panel.Panel',
    xtype: 'TaskBoardView',
    id: 'TaskBoardView',
    controller: 'TaskBoardViewController',
    viewModel: {
        type: 'TaskBoardViewModel'
    },
    layout: 'fit',
    requires: [
        'GSmartApp.view.TaskBoard.TaskBoardViewController',
        'GSmartApp.model.TaskBoard.TaskBoard_Model',
        'GSmartApp.view.TaskBoard.TaskEditor',

        'GSmartApp.plugin.DragSelector'
    ],
    initComponent: function () {
        var me = this;

        var viewmodel = this.getViewModel();
        var taskStore = viewmodel.getStore('TaskBoard_Store');
        taskStore.loadStore();
        var userStore = viewmodel.getStore('TaskUser_Store');
        userStore.loadUserbyOrg(-1);

        var task = Ext.create('Kanban.view.TaskBoard', {
            id: 'taskboard',
            enableUserMenu: false,
            border: true,
            taskMenu: false,
            taskStore: taskStore,
            resourceStore: userStore,

            editor: {
                xtype: 'TaskEditor'
            },

            fitColumns: false,
            defaults: {
                width: 300
            },

            columns: [
                {
                    state: 'NotStarted',
                    title: 'Chưa bắt đầu'
                },
                {
                    state: 'InProgress',
                    title: 'Đang làm'
                },
                {
                    state: 'Done',
                    title: 'Đã xong'
                },
                {
                    state: 'Done',
                    title: 'Từ chối'
                }
            ],

            viewConfig: {
                resourceImgTpl: '',
                multiSelect: true,
                plugins: 'kanban_dragselector',

                taskBodyTpl: '<div class="{cls_task}">' +
                    '<div class="task-progress" style="width:{PercentDone}%"></div>' +
                    '<span class="task-id">{Name}</span>' +
                    '<span class="task-user">{[values.task.getResource() && values.task.getResource().getName()]}</span>' +
                    '</div>' +
                    '<div class="task-body">' +
                    '<div class="sch-task-name">{Description}</div>' +
                    '<tpl if="values.task.getResource() && values.task.getResource().get(\'ImageUrl\')">' +
                    '<img class="task-userimg" src="{[values.task.getResource().get("ImageUrl")]}"/>' +
                    '</tpl>' +
                    '<ul class="subtasks">' +
                    '<tpl for="values.task.subTasks()">' +
                    '<li class="{[values.data.Done ? "subtask-done" : ""]}"><label class="subtask"><input data-id="{[values.internalId]}" class="subtask-checkbox" disabled = "true" type="checkbox" name="checkbox" {[ values.data.Done ? "checked" : "" ]} >{[values.data.Name]}</label></li>' +
                    '</tpl>' +
                    '</ul>' +
                    '<div class="task-footer">' +
                    '<tpl if="values.task.comments().getCount() == 1">' +
                    '<span class="task-comments x-fa fa-comment-o"> {[values.task.comments().getCount()]} comment</span>' +
                    '<tpl elseif = "values.task.comments().getCount() &gt;= 2">'+ 
                    '<span class="task-comments x-fa fa-comment-o"> {[values.task.comments().getCount()]} comments</span>'+
                    '</tpl>' +
                    '</div>' +
                    '</div>',

                // Enable smart diff update of the Task HTML contents
                onUpdate: function (store, record, operation, modifiedFieldNames) {

                    var fragment = document.createElement('div');
                    var currentNode = this.getNode(record);
                    var selModel = this.getSelectionModel();

                    this.tpl.overwrite(fragment, this.collectData([record]));
                    Ext.fly(currentNode).down('.task-header').syncContent(Ext.fly(fragment).down('.task-header', true));

                    Ext.fly(currentNode).down('.task-body').update(Ext.fly(fragment).down('.task-body', true).innerHTML);

                    selModel.onUpdate(record);
                    if (selModel.isSelected(record)) {
                        this.onItemSelect(record);
                    }
                }
            },

            listeners: {
                //// Event check subtask o ngoai tam thoi bo khong cho check
                // "change": {
                //     fn: 'onCheckboxChange',
                //     element: 'body'
                // }, 
                taskdrop: 'onTaskDrop',
                beforetaskdropfinalize: 'beforeDrop',
            }
        
        })

        Ext.apply(me, {
            items: [task],
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items:[{
                    xtype: 'button',
                    tooltip: 'Thêm việc khác',
                    iconCls: 'x-fa fa-plus',
                    itemId: 'btnAddTask'
                }]
            }]
        });

        me.callParent();
    }
})