Ext.define('GSmartApp.view.TaskBoard.TaskEditorViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskEditorViewController',

    control: {
        checkboxgroup: {
            change: 'onCheckboxChange'
        },
        'TaskEditor': {
            activate: 'onActivate'
        },
        '#comboUser' : {
            select: 'onUpdateUser'
        },
        '#comboFlowStatus' : {
            select: 'onSelectStatus'
        }
    },
    init: function () {
        var form = this.getView();
        var viewmodel = this.getViewModel();
        var storeUser = viewmodel.getStore('TaskUser_Store');
        storeUser.loadUserbyOrg(-1);

        var flowStatusStore = viewmodel.getStore('FlowStatusStore');
        flowStatusStore.loadStore();

        
    },
    onActivate: function () {
        var form = this.getView();
        var viewmodel = this.getViewModel();
        var form = this.getView();
        if (form.getRecord().data.tasktypeid_link == -1) {
            viewmodel.set('ishidden_add_checklist', false);
            viewmodel.set('isdisable_checkbox', false);
        }
        else {
            viewmodel.set('isdisable_checkbox', true);
        }

        form.down('#comboUser').setValue(form.getRecord().getResourceId());

        //Loai task la ycsx thi moi hien day du 
        var flowStatusStore = viewmodel.getStore('FlowStatusStore');
        if (form.getRecord().data.tasktypeid_link != 0){
            filters = flowStatusStore.getFilters();
            filters.add({
                property: 'id',
                value: 2,
                operator: '>',
            })
        }
        else {
            flowStatusStore.clearFilter();
        }
    },
    onSelectStatus: function(combo, record, eOpts){
        var viewmodel = this.getViewModel();
        var status = record.get('id');
        switch(status){
            case 1:
                viewmodel.set('isedit_comment', false);
                viewmodel.set('comment','Phân xưởng chấp nhận Yêu cầu');
                break;
            case 2:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','Phân xưởng không sản xuất được!');
                break;
            case 3:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','');
                break;
            case 4:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','Tôi không thể nhận việc trong thời gian này!');
                break;
            default:
                break;
        }
    },
    onUpdateUser: function(combo, record, eOpts){
        var form = this.getView();
        form.setLoading("Đang xử lý dữ liệu");

        var params = new Object();
        params.userid_link = record.get('Id');
        params.taskid_link = form.getRecord().getId();

        GSmartApp.Ajax.post('/api/v1/task/update_task_userincharge', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        form.getRecord().comments().add(response.data);
                        
                        var taskboard = Ext.getCmp('taskboard');
                        var taskStore = taskboard.getTaskStore();
                        var mainTask = taskStore.getById(form.getRecord().getId());
                        mainTask.set('ResourceId',record.get('Id'));
                        taskboard.refreshTaskNode(mainTask);
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                form.down('#comboUser').setValue(form.getRecord().getResourceId());
                            }
                        });
                    }
                }
                else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Có lỗi trong quá trình xử lý dữ liệu!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function () {
                            form.down('#comboUser').setValue(form.getRecord().getResourceId());
                        }
                    });
                }
            })
    },
    onCheckboxChange: function (checkboxGroup, newValue) {
        var me = this.getView();
        me.setLoading('Đang xử lý dữ liệu');
        var mainTask = this.getView().getRecord();
        var subTasks = mainTask.subTasks();

        var params = new Object();
        params.data = [];
        checkboxGroup.items.each(function (box, index) {
            var obj = new Object();
            obj.Id = box.getName();
            obj.Done = box.getValue();
            obj.Name = "";
            obj.TaskId = 0;

            params.data.push(obj);
        });

        GSmartApp.Ajax.post('/api/v1/task/update_checklist', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        checkboxGroup.items.each(function (box, index) {
                            subTasks.getAt(index).set('Done', box.getValue());
                        });

                        var taskboard = Ext.getCmp('taskboard');
                        var taskStore = taskboard.getTaskStore();
                        var mainTask = taskStore.getById(me.getRecord().getId());
                        mainTask.set('State',response.status);
                        taskboard.refreshTaskNode(mainTask);
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                checkboxGroup.removeAll();

                                checkboxGroup.add(Ext.Array.map(subTasks.getRange(), function (subtask) {
                                    return {
                                        boxLabel: subtask.getName(),
                                        checked: subtask.get('Done'),
                                        name: subtask.getId()
                                    };
                                }));
                            }
                        });
                    }
                }
                else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Có lỗi trong quá trình xử lý dữ liệu!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function () {
                            checkboxGroup.removeAll();

                            checkboxGroup.add(Ext.Array.map(subTasks.getRange(), function (subtask) {
                                return {
                                    boxLabel: subtask.getName(),
                                    checked: subtask.get('Done'),
                                    name: subtask.getId()
                                };
                            }));
                        }
                    });
                }
            })
    },

    onCloseClick: function () {
        var form = this.getView();

        if (form.isValid()) {
            form.updateRecord();
            form.hide();
        }

        this.getView().hide();
    },

    onAddSpecialKey: function (field, e, t) {
        if (e.getKey() === e.ENTER) {
            this.onItemAddClick();
        }
    },

    onAddItemFocus: function () {
        this.getView().down('#addButtons tool').show();
    },

    onAddItemBlur: function () {
        this.getView().down('#addButtons tool').hide();

        this.getView().down('[reference=newItemName]').reset();
    },

    onItemAddClick: function () {
        var form = this.getView();
        var field = form.down('[reference=newItemName]');
        var text = field.getValue();

        if (text) {
            var params = new Object();
            params.taskid_link = form.getRecord().getId();
            params.checklist = text;

            GSmartApp.Ajax.post('/api/v1/task/add_checklist', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Thành công",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function () {
                                    form.getRecord().subTasks().add({
                                        Name: text,
                                        TaskId: form.getRecord().getId()
                                    });

                                    form.down('checkboxgroup').add({
                                        boxLabel: text,
                                        name: response.data.id
                                    });

                                    field.setValue();
                                    field.focus();

                                    var taskboard = Ext.getCmp('taskboard');
                                    var taskStore = taskboard.getTaskStore();
                                    var mainTask = taskStore.getById(form.getRecord().getId());
                                    taskboard.refreshTaskNode(mainTask);
                                }
                            });
                        }
                        else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                    }
                })
        }
    },

    onAddCommentClick: function () {
        var form = this.getView();
        var field = form.down('#textcomment');
        var text = field.getValue();

        if (text) {
            var params = new Object();
            params.taskid_link = form.getRecord().getId();
            params.text = text;

            GSmartApp.Ajax.post('/api/v1/task/add_comment', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Thành công",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function () {
                                    form.getRecord().comments().add({
                                        Text: field.getValue(),
                                        Date: response.data.Date,
                                        UserId: response.data.UserId, /* TODO read logged in user id */
                                        TaskId: form.getRecord().getId(),
                                        typename : response.data.typename
                                    });

                                    field.reset();

                                    var taskboard = Ext.getCmp('taskboard');
                                    var taskStore = taskboard.getTaskStore();
                                    var mainTask = taskStore.getById(form.getRecord().getId());
                                    taskboard.refreshTaskNode(mainTask);
                                }
                            });
                        }
                        else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                    }
                })
        }
    },

    onKeyUp: function (e, t) {
        if (e.getKey() === e.ESC) {
            this.onCloseClick();
        }
    }
});