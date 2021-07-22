Ext.define('GSmartApp.view.sync.Folder.FolderLocalView', {
    extend: 'Ext.grid.Panel',
    xtype: 'FolderLocalView',
    id: 'FolderLocalView',
    controller: 'FolderLocalViewController',
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
        store: '{FolderTreeStore}'
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
        dataIndex: 'ModTime',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/y h:m:s')
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
                    bind: {
                        value: '{pathLocal}'
                    },
                    enableKeyEvents: true,
                    itemId: 'textpathLocal'
                }
            ]
        },
        {
            dock: 'right',
            layout: 'vbox',
            // hidden: true,
            border: true,
            items:
                [
                    {
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        tooltip: 'Upload to Driver',
                        iconCls: 'x-fa fa-arrow-right',
                        weight: 30,
                        itemId: 'btnUpload'
                    },
                    { height: 10 },
                    {
                        xtype: 'button',
                        tooltip: 'Download folder',
                        iconCls: 'x-fa fa-arrow-left',
                        itemId: 'btnDopnload',
                        weight: 30
                    },
                    {
                        flex: 1
                    }
                ]
        }
    ]
});

