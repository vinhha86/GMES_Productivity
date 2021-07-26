Ext.define('GSmartApp.view.sync.SyncJob.SyncJobView', {
    extend: 'Ext.grid.Panel',
    xtype: 'SyncJobView',
    id: 'SyncJobView',
    controller: 'SyncJobViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{SyncJobStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên',
        dataIndex: 'jobname',
        width: 150
    },
    {
        text: 'Class',
        dataIndex: 'class_namespace',
        width: 150
    },
    {
        text: 'Time format',
        dataIndex: 'time_format',
        width: 100
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
        text: 'Người lập',
        dataIndex: 'user_created_name',
        width: 120
    },
    {
        text: 'Ngày lập',
        dataIndex: 'date_created',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/y H:i:s')
    }
    ]
});

