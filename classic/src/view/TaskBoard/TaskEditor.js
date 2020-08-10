Ext.define('GSmartApp.view.TaskBoard.TaskEditor', {
    extend : 'Ext.form.Panel',
    xtype  : 'subtaskstaskeditor',

    mixins : [
        'Kanban.editor.Base'
    ],

    requires : [
        'Kanban.examples.subtasks.view.TaskEditorViewController',
        'Kanban.examples.subtasks.view.CommentView'
    ],

    controller : 'taskeditor',

    /**
     * @cfg {String} triggerEvent The event that should trigger the editing to start. Set to null to disable the editor from being activated.
     */
    triggerEvent : 'taskdblclick',

    width       : 450,
    height      : 550,
    autoScroll  : true,
    bodyPadding : 20,
    floating    : true,

    constrain   : true,
    modal       : true,
    cls         : 'taskeditor',
    defaults    : {
        labelAlign : 'top',
        anchor     : '100%'
    },

    items : [
        {
            xtype  : 'container',
            layout : 'hbox',
            items  : [
                {
                    xtype      : 'textfield',
                    name       : 'Name',
                    itemId     : 'nameField',
                    cls        : 'namefield',
                    allowBlank : false,
                    flex       : 1,
                    margin     : '0 20 0 0'
                },
                {
                    xtype   : 'tool',
                    type    : 'close',
                    cls     : 'close',
                    handler : 'onCloseClick',
                    tabIndex : -1
                }
            ]
        },
        {
            xtype        : 'combobox',
            itemId       : 'stateCombo',
            name         : 'State',
            displayField : 'Name',
            valueField   : 'Id',
            fieldLabel   : 'List'
        },
        {
            xtype        : 'combobox',
            store        : 'UserStore',
            name         : 'ResourceId',
            displayField : 'Name',
            valueField   : 'Id',
            fieldLabel   : 'Assigned to'
        },
        {
            xtype      : 'checkboxgroup',
            fieldLabel : 'Checklist',
            columns    : 1,
            vertical   : true,
            cls        : 'checklist',
            defaults   : {
                boxLabelAlign : 'after'
            }
        },
        {
            xtype  : 'container',
            layout : 'hbox',
            itemId : 'addButtons',
            items  : [
                {
                    xtype     : 'textfield',
                    emptyText : 'Add checklist item...',
                    reference : 'newItemName',
                    flex      : 1,
                    listeners : {
                        specialkey : 'onAddSpecialKey',
                        focus      : 'onAddItemFocus',
                        blur       : 'onAddItemBlur'
                    }
                },
                {
                    xtype   : 'tool',
                    cls     : 'cancel-add',
                    hidden  : true,
                    type    : 'close',
                    handler : function () {
                        this.getEl().focus();
                    },
                    width   : 50
                }
            ]
        },
        {
            xtype      : 'textarea',
            itemId     : 'comments',
            cls        : 'comments',
            emptyText  : 'Write comment...',
            fieldLabel : 'Add Comment',
            anchor     : '90%',
            height     : 50
        },
        {
            xtype   : 'button',
            text    : 'Add',
            anchor  : null,
            handler : 'onAddCommentClick'
        },
        {
            xtype     : 'component',
            cls       : 'comment-title',
            focusable : false,
            html      : 'Comments'
        },
        {
            xtype        : 'commentview'
        }

    ],

    buttons : [
        {
            text    : 'Close',
            handler : 'onCloseClick'
        }
    ],

    afterRender : function () {
        var controller = this.getController();
        this.callParent(arguments);

        var model  = this.panel.taskStore.getModel(),
            states = model.prototype.states,
            locale = Sch.locale.Active[ 'Kanban.locale' ] || {};

        var data =  Ext.Array.map(states, function (state) {
            return {
                Id   : state,
                Name : locale[ state ] || state
            };
        });

        this.down('#stateCombo').setStore({
            fields : ['Id', 'Name'],
            data : data
        });
        this.getEl().on('keyup', controller.onKeyUp, controller);
    },


    listeners : {
        show : {
            // Close editor when clicking on its mask element
            fn : function() {
                if (this.zIndexManager.mask) {
                    this.mon(this.zIndexManager.mask, 'click', function() {
                        if (this.isVisible()) {
                            this.getController().onCloseClick();
                        }
                    }, this);
                }
            },

            single : true
        }
    },

    getSubtaskList: function() {
        return this.down('checkboxgroup');
    },

    getCommentView : function() {
        return this.down('#commentView');
    },

    triggerEdit : function (record, e) {

        if (e.getTarget('.subtask')) return;

        this.getForm().loadRecord(record);

        var checkboxGroup = this.getSubtaskList();
        var commentView   = this.getCommentView();

        checkboxGroup.removeAll();

        checkboxGroup.add(Ext.Array.map(record.subTasks().getRange(), function (subtask) {
            return {
                boxLabel : subtask.getName(),
                checked  : subtask.get('Done')
            };
        }));

        record.comments().sort('Date', 'DESC');

        commentView.setStore(record.comments());

        this.show();

        this.down('field').focus();
    }
});