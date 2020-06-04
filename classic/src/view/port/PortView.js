Ext.define('GSmartApp.view.Port.PortView', {
    extend: 'Ext.grid.Panel',
    xtype: 'portView', // same with database, 'PortView' shows error
    id: 'PortView',
    viewModel: {
        type: 'PortViewModel'
    },
    controller: 'PortViewController',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    reference: 'PortView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PortStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên viết tắt',
        dataIndex: 'code',
        width: 100
    }, {
        text: 'Tên cảng',
        dataIndex: 'name',
        width: 150,
        flex: 1
    }, {
        text: 'Tên cảng tiếng Anh',
        dataIndex: 'name_en',
        width: 150,
        flex: 1
    }, {
        xtype: 'actioncolumn',
        width: 50,
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
        }]
    }]
});

