Ext.define('GSmartApp.view.dm_tinhthanh.TinhView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TinhView',

    title: 'Danh sách tỉnh thành',

    controller: 'TinhViewController',

    bind:{
        store:'{org_store}'
    },

    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    columns: [{
        text: 'STT',
        xtype: 'rownumberer',
        width: 80,
        align: 'center'
    },
    {
        xtype: 'actioncolumn',
        width: 50,
        iconCls: 'x-fa fa-trash',
        handler:'onXoa'
    },
    {
        text: 'Tên ',
        dataIndex: 'name',
        flex: 2,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            },

    }, {
        text: 'Mã ',
        dataIndex: 'code',
        flex: 1,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            },
    }
    ],

    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [
            {
                xtype: 'button',
                text: 'Thêm',
                width: 80,
                itemId: 'Them'
            }, {
                width: 50,
            },
            {
                xtype: 'textfield',
                emptyText: 'Tên tỉnh thành',
                flex: 2,
                margin: '0 2 0 0',
                bind: '{Tinh.name}'
            },
            {
                xtype: 'textfield',
                emptyText: 'Mã tỉnh thành',
                flex: 1,
                bind: '{Tinh.code}'
            }
        ]
    }
    ]
})