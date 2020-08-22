Ext.define('GSmartApp.view.sizeset.SizesetView', {
    extend: 'Ext.grid.Panel',
    xtype: 'SizesetView',
    id: 'SizesetView',
    IdSizeset: 0,
    viewModel: {
        type: 'SizesetViewModel'
    },
    controller: 'SizesetViewController',
    reference: 'SizesetView',
    plugins: {
        cellediting: {
            clicksToEdit: 2
        }
    },
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop'
        },
        listeners: {
            drop: 'onDrop',
        }     
    },
    bind: {
        store: '{SizesetStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên dải size',
        dataIndex: 'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'sizesetNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onSizesetNameFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên dải size',
                itemId:'txtName',
                listeners:{
                    focusenter: 'onNameFocus',
                    change: 'onNameChange',
                    focusleave: 'onNameFocusLeave'
                }
            }
        }
    }, {
        text: 'Chú thích',
        dataIndex: 'comment',
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống chú thích',
                itemId:'txtComment',
                listeners:{
                    focusenter: 'onCommentFocus',
                    change: 'onCommentChange',
                    focusleave: 'onCommentFocusLeave'
                }
            }
        }
    }, {
        text: 'Cỡ',
        dataIndex: 'attrValues',
        flex: 1
    },{
        xtype: 'actioncolumn',
        width: 40,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 5,
                text: 'Thêm mới',
                width: 110,
                iconCls: 'x-fa fa-plus',
                itemId: 'btnThemMoi'
            },
            
            {
                xtype:'textfield',
                itemId:'txtname',
                // fieldLabel: 'Tên dải size',
                margin: 5,
                flex: 1,
                allowBlank: false,
                blankText: 'Nhập tên dải size',
                emptyText: 'Tên dải size'
            },
            {
                xtype:'textfield',
                itemId:'txtcomment',
                // fieldLabel: 'Chú thích',
                margin: 5,
                flex: 1,
                allowBlank: true,
                blankText: 'Nhập chú thích',
                emptyText: 'Chú thích'
            },
            {
                flex: 1,
                border: false
            }
        ]
    }]
});

