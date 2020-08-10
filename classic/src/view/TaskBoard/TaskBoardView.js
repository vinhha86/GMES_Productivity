Ext.define('GSmartApp.view.TaskBoard.TaskBoardView', {
    extend: 'Ext.panel.Panel',
    xtype: 'TaskBoardView',
    id: 'TaskBoardView',
    controller: 'TaskBoardViewController',
    viewModel: {
        type: 'TaskBoardViewModel'
    },
    layout: 'fit',
    requires : [
        // 'Kanban.examples.subtasks.view.TaskBoardController',
        // 'Kanban.examples.subtasks.model.Task',
        // 'Kanban.examples.subtasks.view.TaskEditor',

        'GSmartApp.store.TaskBoard.TaskBoard_Store',
        'GSmartApp.store.TaskBoard.TaskUser_Store',

        'Kanban.plugin.DragSelector'
    ],
    initComponent: function () {
        var me = this;

        var taskStore = new Kanban.data.TaskStore({
            data    : [
                { "Id" : 1, "Name" : "Fix IE7 bug", "State" : "ChuaBatDau", "ResourceId" : 1, "ImageUrl" : ""},
                { "Id" : 2, "Name" : "Sneak-install Chrome Frame", "State" : "ChuaBatDau", "ResourceId" : 1},
                { "Id" : 3, "Name" : "Add Windows Phone support", "State" : "DangXuLy", "ResourceId" : 3},
                { "Id" : 4, "Name" : "Make App", "State" : "DangXuLy"},
                { "Id" : 5, "Name" : "Find Unicorn", "State" : "Test", "ResourceId" : 2},
                { "Id" : 6, "Name" : "IE6 support", "State" : "DangXuLy"},
                { "Id" : 7, "Name" : "Chrome development", "State" : "Done"},
                { "Id" : 8, "Name" : "Find holy grail", "State" : "Done"},
                { "Id" : 9, "Name" : "Dig hole", "State" : "Done"},
                { "Id" : 10, "Name" : "Eat raisins", "State" : "ChuaBatDau","ResourceId" : 6},
                { "Id" : 11, "Name" : "Do some cool task", "State" : "ChuaBatDau", "ResourceId" : 7},
                { "Id" : 12, "Name" : "Eat raisins", "State" : "ChuaBatDau",  "ResourceId" : 6},
                { "Id" : 14, "Name" : "Change floor tiles", "State" : "Done"}
            ]
        });

        var resourceStore = new Kanban.data.ResourceStore({
            data    : [
                { "Id" : 1, "Name" : "Mats" },
                { "Id" : 2, "Name" : "Homer" },
                { "Id" : 3, "Name" : "Brian"},
                { "Id" : 4, "Name" : "Dave"},
                { "Id" : 5, "Name" : "Lisa"},
                { "Id" : 6, "Name" : "Lee"},
                { "Id" : 7, "Name" : "Arnold"},
                { "Id" : 8, "Name" : "That guy"}
            ]
        });

        var task = Ext.create('Kanban.view.TaskBoard',{
            
            editor : {
                xtype: 'kanban_simpleeditor',
                dataIndex: 'Name'
            },
        
            viewConfig : {
                multiSelect : true,
                plugins     : 'kanban_dragselector',
                taskBodyTpl : '<div class="task-header">' + '<div class="sch-task-name">{Name}</div>' + '</div>'
            },
        
            resourceStore : resourceStore,
        
            taskStore : taskStore,
            taskMenu: false,
            // userMenu : new Kanban.menu.UserMenu({
            //     resourceStore : resourceStore
            // }),
            
            columns : [
                {
                    state       : 'ChuaBatDau',
                    title       : 'Chưa bắt đầu',
                    dockedItems : [{
                        xtype   : 'container',
                        dock    : 'bottom',
                        layout  : 'fit',
                        border  : 0,
                        padding : '5 8',
                        items   : {
                            height : 30,
                            xtype : 'addnewfield',
                            store : taskStore,
                            emptyText: 'Việc mới'
                        }
                    },{
                        dock: 'top',
                        xtype: 'container',
                        layout: 'fit',
                        border: 0,
                        items: {
                            height:30,
                            xtype: 'filterfield',
                            store: taskStore,
                            field : 'Name' 
                        }
                    }]
                },
                {
                    state : 'DangXuLy',
                    title : 'Đang xử lý'
                },
                {
                    xtype    : 'container',
                    flex     : 1,
                    layout   : { type : 'vbox', align : 'stretch' },
                    defaults : { xtype : 'taskcolumn', flex : 1 },
                    items    : [
                        {
                            state : 'Test',
                            title : 'Test'
                        }
                    ]
                },
                {
                    state : 'Done',
                    title : 'Done'
                }
            ]
        })

        Ext.apply(me, {
            items: [task]
        });

        me.callParent();
    }
})