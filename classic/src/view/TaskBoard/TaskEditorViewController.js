Ext.define('GSmartApp.view.TaskBoard.TaskEditorViewController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.TaskEditorViewController',

    control : {
        checkboxgroup : {
            change : 'onCheckboxChange'
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

            form.getRecord().comments().add({
                Text   : field.getValue(),
                Date   : new Date(),
                UserId : 8, /* TODO read logged in user id */
                TaskId : form.getRecord().getId()
            });

            field.reset();
        }
    },

    onKeyUp : function(e, t) {
        if (e.getKey() === e.ESC) {
            this.onCloseClick();
        }
    }
});