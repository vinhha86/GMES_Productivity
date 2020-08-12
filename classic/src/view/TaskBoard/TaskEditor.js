Ext.define('GSmartApp.view.TaskBoard.TaskEditor', {
    extend : 'Ext.form.Panel',
    xtype  : 'TaskEditor',
    mixins : [
        'Kanban.editor.Base'
    ],

    requires : [
        'GSmartApp.view.TaskBoard.TaskEditorViewController',
        'GSmartApp.view.TaskBoard.Comment'
    ],

    controller : 'TaskEditorViewController',
    viewModel: {
        type: 'TaskEditor_ViewModel'
    },

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
                    xtype      : 'displayfield',
                    name       : 'Name',
                    itemId     : 'nameField',
                    fieldStyle: "font-weight: bold; font-size: 15px",
                    flex       : 1,
                    margin     : '0 20 0 0'
                }
            ]
        },
        {
            xtype      : 'displayfield',
            name       : 'Description',
            fieldLabel: 'Mô tả ',
            labelStyle: "font-weight: bold; font-size: 13px",
            itemId     : 'descriptionField',
            fieldStyle: "font-size: 13px",
            flex       : 1,
            margin     : '0 20 0 0'
        },
        // {
        //     xtype        : 'combobox',
        //     itemId       : 'stateCombo',
        //     name         : 'State',
        //     displayField : 'Name',
        //     valueField   : 'Id',
        //     fieldLabel   : 'List'
        // },
        {
            xtype        : 'combobox',
            bind: {
                store: '{TaskUser_Store}'
            },
            name         : 'ResourceId',
            displayField : 'Name',
            valueField   : 'Id',
            fieldLabel   : 'Người phụ trách'
        },
        {
            xtype      : 'checkboxgroup',
            fieldLabel : 'Chi tiết',
            itemId      : 'checklist',
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
            bind: {
                hidden: '{ishidden_add_checklist}'
            },
            items  : [
                {
                    xtype     : 'textfield',
                    emptyText : 'Thêm chi tiết',
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
            itemId     : 'textcomment',
            cls        : 'comments',
            emptyText  : 'Nội dung chú thích...',
            fieldLabel : 'Thêm chú thích',
            anchor     : '90%',
            height     : 50
        },
        {
            xtype   : 'button',
            text    : 'Thêm chú thích',
            anchor  : null,
            handler : 'onAddCommentClick'
        },
        {
            xtype     : 'component',
            cls       : 'comment-title',
            focusable : false,
            html      : 'Danh sách chú thích'
        },
        {
            xtype        : 'Comment'
        }

    ],

    buttons : [
        {
            text    : 'Thoát',
            iconCls: 'x-fa fa-window-close',
            handler : 'onCloseClick'
        }
    ],

    // afterRender : function () {
        // var controller = this.getController();
        // this.callParent(arguments);

        // var model  = this.panel.taskStore.getModel(),
        //     states = model.prototype.states,
        //     locale = Sch.locale.Active[ 'Kanban.locale' ] || {};

        // var data =  Ext.Array.map(states, function (state) {
        //     return {
        //         Id   : state,
        //         Name : locale[ state ] || state
        //     };
        // });

        // this.down('#stateCombo').setStore({
        //     fields : ['Id', 'Name'],
        //     data : data
        // });
        // this.getEl().on('keyup', controller.onKeyUp, controller);
    // },


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
        return this.down('#Comment');
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
                checked  : subtask.get('Done'),
                name  : subtask.getId()
            };
        }));

        record.comments().sort('Date', 'DESC');

        commentView.setStore(record.comments());

        this.show();

        this.down('field').focus();
    }
});