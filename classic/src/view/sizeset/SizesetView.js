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
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
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
        }
    }, {
        text: 'Chú thích',
        dataIndex: 'comment',
        flex: 1
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
    listeners:{
        dblclick: 'onRowClick'
    },
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
                flex: 1,
                border: false
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
                xtype: 'button',
                margin: 5,
                text: 'Lưu',
                width: 110,
                iconCls: 'x-fa fa-plus',
                itemId: 'btnLuu'
            }
        ]
    }]
});

