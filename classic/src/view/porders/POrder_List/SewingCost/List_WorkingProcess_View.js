Ext.define('GSmartApp.view.porders.POrderList.SewingCost.List_WorkingProcess_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'List_WorkingProcess_View',
    id: 'List_WorkingProcess_View',
    requires: [
        'Ext.grid.Panel'
    ],
    border: true,
    controller: 'List_WorkingProcess_ViewController',
    viewModel: {
        type: 'List_WorkingProcess_ViewModel'
    },
    bind: {
        store: '{WorkingProcess_Store}'
    },
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    },
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
        rowLines: true,
        columnLines: true
    },
    columns: [
        {
            header: 'Tên công đoạn',
            dataIndex: 'name',
            width: 150,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'workingname',
                width: '99%',
                // flex: 1,
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onWorkingnameKeyup',
                    buffer: 500
                }
            }
        }, {
            header: 'Thiết bị',
            dataIndex: 'devicegroup_name',
            width: 120
        },
        {
            header: 'Bậc thợ',
            dataIndex: 'laborlevel_name',
            width: 120
        },
        {
            header: 'Thời gian',
            dataIndex: 'timespent_standard',
            width: 120,
            renderer: function(value){
                return value == null ? "" : (value + " (s)");
            }
        },
        {
            header: 'Chú thích',
            dataIndex: 'techcomment',
            flex: 1
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [
            {
                border: false,
                flex : 1
            },{
                xtype:'button',
                text: 'Chọn',
                margin: 3,
                itemId:'btnChon',
                iconCls: 'x-fa fa-check'
            },{
                xtype:'button',
                text: 'Thoát',
                margin: 3,
                itemId:'btnThoat',
                iconCls: 'x-fa fa-window-close'
            }
        ]
    }]
});
