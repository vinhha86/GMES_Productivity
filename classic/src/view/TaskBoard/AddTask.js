Ext.define('GSmartApp.view.TaskBoard.AddTask', {
    extend : 'Ext.form.Panel',
    xtype  : 'AddTask',
    id: 'AddTask',
    controller : 'AddTask_ViewController',
    viewModel: {
        type: 'AddTask_ViewModel'
    },
    layout: 'hbox',
    items: [{
        xtype: 'textarea',
        margin: 3,
        fieldLabel: 'Nội dung',
        emptyText: 'Thêm việc mới',
        allowBlank: false,
        blankText: 'Không được để trống',
        bind: {
            value: '{text}'
        }
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [
            {
                border: false,
                flex : 1
            },{
                xtype:'button',
                text: 'Lưu',
                margin: 3,
                itemId:'btnLuu',
                iconCls: 'x-fa fa-save',
                formBind: true
            },{
                xtype:'button',
                text: 'Thoát',
                margin: 3,
                itemId:'btnThoat',
                iconCls: 'x-fa fa-window-close'
            }
        ]
    }]
});