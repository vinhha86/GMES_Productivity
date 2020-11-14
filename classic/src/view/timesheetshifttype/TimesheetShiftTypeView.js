Ext.define('GSmartApp.view.timesheetshifttype.TimesheetShiftTypeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimesheetShiftTypeView',
    id: 'TimesheetShiftTypeView',
    viewModel: {
        type: 'TimesheetShiftTypeViewModel'
    },
    controller: 'TimesheetShiftTypeViewController',
    reference: 'TimesheetShiftTypeView',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 1
    //     }
    // },
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{TimesheetShiftTypeStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 60,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: "Chi tiết",
            handler: 'onCapNhat',
        },{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên ca',
        dataIndex: 'name',
        flex: 1,
    }, {
        text: 'Từ',
        dataIndex: 'from',
        width: 100
    }, {
        text: 'Đến',
        dataIndex: 'to',
        width: 100
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
            // {
            //     xtype: 'button',
            //     margin: 5,
            //     text: 'Xoá',
            //     width: 110,
            //     iconCls: 'x-fa fa-trash',
            //     itemId: 'btnXoa'
            // },
            {
                flex: 1,
                border: false
            },
        ]
    }]
});

