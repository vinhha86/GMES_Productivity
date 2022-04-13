Ext.define('GSmartApp.view.users.User_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'User_List',
    id: 'User_List',
    viewModel: {
        type: 'UserListViewModel'
    },
    controller: 'UserListController',
    reference: 'User_List',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true,
        enableTextSelection: true,
    },
    bind: {
        store: '{UserStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        menuDisabled: true,
        sortable: false,
        align: 'center'
    }, {
        text: 'Tên người dùng',
        dataIndex: 'fullname',
        menuDisabled: true,
        sortable: false,
        width: 150,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'filterFullName',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterFullNameKeyup',
                buffer: 500
            },
        },
    }, {
        text: 'Tài khoản',
        dataIndex: 'username',
        menuDisabled: true,
        sortable: false,
        width: 150,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'filterUsername',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterUsernameKeyup',
                buffer: 500
            },
        },
    },{
        text: 'Đơn vị',
        dataIndex: 'orgname',
        menuDisabled: true,
        sortable: false,
        width: 150
    }, {
        text: 'Nhóm quyền',
        dataIndex: 'usergroup_name',
        menuDisabled: true,
        sortable: false,
        flex: 1
    }, {
        text: 'Số di động',
        dataIndex: 'tel_mobile',
        menuDisabled: true,
        sortable: false,
        width: 100
    },
    {
        text: 'Số máy bàn',
        dataIndex: 'tel_office',
        menuDisabled: true,
        sortable: false,
        width: 100
    },{
        text: 'Trạng thái',
        dataIndex: 'statusname',
        menuDisabled: true,
        sortable: false,
        width: 100
    }, {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
            handler: 'onEdit'
        },{
            iconCls: 'x-fa fas fa-list',
            tooltip: 'Danh sách Vendor/Buyer',
            handler: 'onCustommer'
        }]
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype:'textfield',
            labelWidth: 0,
            emptyText: "Họ",
            itemId: 'firstname',
            width: 90,
            margin: '5 0 5 5',
            enableKeyEvents : true,
        },{
            xtype:'textfield',
            labelWidth: 0,
            emptyText: "Tên đệm",
            width: 90,
            itemId: 'middlename',
            margin: '5 0 5 1',
            enableKeyEvents : true,
        },{
            xtype:'textfield',
            labelWidth: 0,
            emptyText: "Tên",
            width: 90,
            itemId: 'lastname',
            margin: '5 0 5 1',
            enableKeyEvents : true,
        },{
            xtype:'textfield',
            labelWidth: 0,
            emptyText: "Tài khoản",
            width: 90,
            itemId: 'username',
            margin: '5 0 5 1',
            enableKeyEvents : true,
        },{
            xtype:'combo',
            labelWidth: 0,
            margin: '5 1 5 1',
            emptyText: "Nhóm quyền",
            width: 250,
            itemId: 'groupuser',
            bind: {
                store: '{GroupUserStore}'
            },
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            enableKeyEvents : true,
        },{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Tìm kiếm',
            iconCls: 'x-fa fa-filter',
            itemId: 'btnTimKiem'
        }]
    }]
});

