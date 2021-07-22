Ext.define('GSmartApp.view.sync.Folder.DriverView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DriverView',
    id: 'DriverView',
    controller: 'DriverViewController',
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
        store: '{FolderDriverStore}'
    },
    columns: [{
        width: 35,
        xtype: 'templatecolumn',
        dataIndex: 'IsDir',
        tpl: '<tpl if="IsDir"><i class="fa fa-folder" style="color: #3074bb"></i></tpl>'
    }, {
        text: 'Tên',
        dataIndex: 'Name',
        flex: 1
    },
    {
        text: 'Kích thước',
        dataIndex: 'Size',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            value = Math.round((value / 1024) * 100) / 100;
            return value == 0 ? "" : value + " KB";
        }
    },
    {
        text: 'Ngày cập nhật',
        dataIndex: 'ModTime ',
        width: 120
    }
    ],
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: "Tên thư mục",
                    margin: 3,
                    flex: 1,
                    editable: false,
                    bind: {
                        value: '{pathDriver}'
                    }
                }
            ]
        },
        {

        }
    ]
});

