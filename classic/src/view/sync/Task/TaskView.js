Ext.define('GSmartApp.view.sync.Task.TaskView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TaskView',
    id: 'TaskView',
    controller: 'TaskViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE',
        checkOnly: true
    },
    bind: {
        store: '{SyncTaskStore}'
    },
    columns: [{
        text: 'Tên',
        dataIndex: 'name',
        width: 100
    },
    {
        text: 'Loại',
        dataIndex: 'type_name',
        width: 100
    },
    {
        text: 'Ngày tạo',
        dataIndex: 'date_created ',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/y h:m:s')
    },
    {
        text: 'Thư mục nguồn',
        dataIndex: 'src',
        flex: 1
    },
    {
        text: 'Thư mục đích',
        dataIndex: 'des',
        flex: 1
    },
    {
        text: 'Trạng thái',
        dataIndex: 'status_name',
        width: 100
    }
    ]
});

