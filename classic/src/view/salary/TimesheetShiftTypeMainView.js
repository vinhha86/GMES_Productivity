Ext.define('GSmartApp.view.salary.TimesheetShiftTypeMainView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimesheetShiftTypeMainView',
    id:'TimesheetShiftTypeMainView',

    controller:'TimesheetShiftTypeMainViewController',
    // viewModel:{
    //     type:'Salary_MainView_Model'
    // },
    bind: {
        store: '{TimeShiftStore}'
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
            tooltip: "Xóa",
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
            {
                flex: 1,
                border: false
            },
        ]
    }]
})