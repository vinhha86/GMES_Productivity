Ext.define('GSmartApp.view.TaskBoard.TaskEditorViewController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.TaskEditorViewController',

    control : {
        checkboxgroup : {
            change : 'onCheckboxChange'
        },
        'TaskEditor' : {
            activate : 'onActivate'
        }
    },
    init: function(){
        var viewmodel = this.getViewModel();
        var storeUser = viewmodel.getStore('TaskUser_Store');
        storeUser.loadUserbyOrg(-1);
    },
    onActivate: function() {
        var viewmodel = this.getViewModel();
        var form = this.getView();
        if(form.getRecord().data.tasktypeid_link == -1){
            viewmodel.set('ishidden_add_checklist', false);
        }
    },
    onCheckboxChange : function (checkboxGroup) {
        var mainTask = this.getView().getRecord();
        var subTasks = mainTask.subTasks();

        checkboxGroup.items.each(function (box, index) {
            subTasks.getAt(index).set('Done', box.getValue());
        });
    },

    onCloseClick : function () {
        var form = this.getView();

        if (form.isValid()) {
            form.updateRecord();
            form.hide();
        }
        
        this.getView().hide();
    },

    onAddSpecialKey : function (field, e, t) {
        if (e.getKey() === e.ENTER) {
            this.onItemAddClick();
        }
    },

    onAddItemFocus : function () {
        this.getView().down('#addButtons tool').show();
    },

    onAddItemBlur : function () {
        this.getView().down('#addButtons tool').hide();

        this.getView().down('[reference=newItemName]').reset();
    },

    onItemAddClick : function () {
        var form  = this.getView();
        var field = form.down('[reference=newItemName]');

        form.getRecord().subTasks().add({
            Name   : field.getValue(),
            TaskId : form.getRecord().getId()
        });

        form.down('checkboxgroup').add({
            boxLabel : field.getValue()
        });

        field.setValue();
        field.focus();
    },

    onAddCommentClick : function () {
        var form = this.getView();
        var field = form.down('#textcomment');
        var text  = field.getValue();
        
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
                            fn: function(){
                                form.getRecord().comments().add({
                                    Text   : field.getValue(),
                                    Date   : response.data.Date,
                                    UserId : response.data.UserId, /* TODO read logged in user id */
                                    TaskId : form.getRecord().getId()
                                });
                    
                                field.reset();
                                
                                var taskboard = Ext.getCmp('taskboard');
                                var taskStore = taskboard.getTaskStore();
                                var mainTask  = taskStore.getById(form.getRecord().getId());
                                taskboard.refreshTaskNode(mainTask);
                            }
                        });
                    }
                    else{
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

    onKeyUp : function(e, t) {
        if (e.getKey() === e.ESC) {
            this.onCloseClick();
        }
    }
});