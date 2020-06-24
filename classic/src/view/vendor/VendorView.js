Ext.define('GSmartApp.view.vendor.VendorView', {
    extend: 'Ext.grid.Panel',
    xtype: 'VendorView', // same with database, 'PortView' shows error
    id: 'VendorView',
    viewModel: {
        type: 'VendorViewModel'
    },
    controller: 'VendorViewController',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    reference: 'VendorView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{OrgStore}'
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
        text: 'Tên vendor',
        dataIndex: 'name',
        width: 150,
        flex: 1
    }, {
        text: 'Thành phố',
        dataIndex: 'city',
        width: 150,
        flex: 1
    }, {
        text: 'Địa chỉ',
        dataIndex: 'address',
        width: 150,
        flex: 1
    }, {
        text: 'Người đại diện',
        dataIndex: 'contactperson',
        width: 150,
        flex: 1
    }, {
        text: 'Email',
        dataIndex: 'email',
        width: 150,
        flex: 1
    }, {
        text: 'Điện thoại',
        dataIndex: 'phone',
        width: 150,
        flex: 1
    }, {
        text: 'Màu đại diện',
        dataIndex: 'clsName',
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

