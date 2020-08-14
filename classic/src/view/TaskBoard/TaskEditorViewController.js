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
        storeUser.load();

        var flowStatusStore = viewmodel.getStore('FlowStatusStore');
        flowStatusStore.loadStore();

        var storeUserFull = viewmodel.getStore('TaskUser_Store_Full');
        storeUserFull.loadUserbyOrg(1);
        storeUserFull.load();

    },
    onActivate: function () {
        var form = this.getView();
        var viewmodel = this.getViewModel();
        var comment = form.getCommentView();
        comment.userStore = viewmodel.getStore('TaskUser_Store_Full');
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
                value: 1,
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
                viewmodel.set('btncomment', true);
                viewmodel.set('btnreject', true);
                viewmodel.set('btnaccept', false);
                break;
            case 2:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','Phân xưởng không sản xuất được!');
                viewmodel.set('btncomment', true);
                viewmodel.set('btnreject', false);
                viewmodel.set('btnaccept', true);
                break;
            case 3:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','');
                viewmodel.set('btncomment', false);
                viewmodel.set('btnreject', true);
                viewmodel.set('btnaccept', true);
                break;
            case 4:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','Tôi không thể nhận việc trong thời gian này!');
                break;
            default:
                break;
        }
    },
    onAcceptReq: function(){
        var me = this;
        var form = this.getView();
        var viewmodel = this.getViewModel();

        var user_incharge = form.down('#comboUser').getValue();
        var data = GSmartApp.util.State.get('session');
        var session = data ? GSmartApp.model.Session.loadData(data) : null;
        var current_user = session.get('Id');

        var field = form.down('#textcomment');

        if(user_incharge == current_user){
        var params = new Object();
            params.taskid_link = form.getRecord().getId();
            params.comment = field.getValue();

            GSmartApp.Ajax.post('/api/v1/task/accept_porer_req', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        me.onCloseClick();

                        var taskboard = Ext.getCmp('taskboard');
                        var taskStore = taskboard.getTaskStore();
                        var mainTask = taskStore.getById(form.getRecord().getId());
                        mainTask.set('State', 'Done');

                        form.getRecord().comments().add(response.comment);
                        var checkboxGroup  = form.down('#checklist');
                        var subTasks = mainTask.subTasks();
                        for(var i=0; i< subTasks.data.length; i++){
                            var sub = subTasks.data.items[i];
                            sub.set('Done', true);
                        }
                        
                        taskboard.refreshTaskNode(mainTask);


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
                else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Có lỗi trong quá trình xử lý dữ liệu!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
        }
        else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn không phải Người phụ trách công việc! Bạn không được từ chối YCSX cho phân xưởng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                },
                fn: function () {
                    viewmodel.set('flow_status', 3);
                    field.reset();
                }
            });
        }
    },
    onRejectReq: function(){
        var me = this;
        var form = this.getView();
        var viewmodel = this.getViewModel();

        var user_incharge = form.down('#comboUser').getValue();
        var data = GSmartApp.util.State.get('session');
        var session = data ? GSmartApp.model.Session.loadData(data) : null;
        var current_user = session.get('Id');

        if(user_incharge == current_user){
            var field = form.down('#textcomment');

            var params = new Object();
            params.taskid_link = form.getRecord().getId();
            params.comment = field.getValue();
            params.status = 2;

            GSmartApp.Ajax.post('/api/v1/task/reject_porder_req', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        me.onCloseClick();
                        
                        var taskboard = Ext.getCmp('taskboard');
                        var taskStore = taskboard.getTaskStore();
                        taskStore.remove(form.getRecord());
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
                else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Có lỗi trong quá trình xử lý dữ liệu!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
        }
        else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn không phải Người phụ trách công việc! Bạn không được từ chối YCSX cho phân xưởng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                },
                fn: function () {
                    viewmodel.set('flow_status', 3);
                    var field = form.down('#textcomment');
                    field.reset();
                }
            });
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
                        mainTask.set('State', 'InProgress');
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