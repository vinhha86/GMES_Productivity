Ext.define('GSmartApp.view.sync.Task.TaskDetailView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TaskDetailView',
    id: 'TaskDetailView',
    controller: 'TaskDetailViewController',
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
        store: '{SyncTaskDetailStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Bắt đầu',
        dataIndex: 'start_time ',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/y h:m:s')
    },
    {
        text: 'Kết thúc',
        dataIndex: 'finish_time ',
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
    },
    {
        text: 'Hoàn thành',
        // dataIndex: 'percent_done',
        width: 100,
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'progressbarwidget',
            bind: '{record.percent}',
            textTpl: [
                '{percent:number("0")} %'
            ]
        }
    }
    ]
});

