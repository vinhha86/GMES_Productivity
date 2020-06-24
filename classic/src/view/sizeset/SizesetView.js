Ext.define('GSmartApp.view.sizeset.SizesetView', {
    extend: 'Ext.grid.Panel',
    xtype: 'SizesetView',
    id: 'SizesetView',
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
        flex: 1
    }, {
        text: 'Chú thích',
        dataIndex: 'comment',
        flex: 1
    },{
        xtype: 'actioncolumn',
        width: 70,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
            handler: 'onCapNhat'
        }, {
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 110,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        },{
            flex: 1,
            border: false
        }]
    }]
});

