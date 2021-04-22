Ext.define('GSmartApp.view.process_shipping.POLine.POLineView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POLineView',
    id: 'POLineView',
    controller: 'POLineViewController',
    reference: 'POLineView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{POLineStore}'
    },
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';

            if (record.data.status == 0) {
                metaData.tdCls = "po_accept";
            }
            else if (record.data.status == -3) {
                metaData.tdCls = "po_cancel";
                metaData.tdAttr = 'data-qtip="PO đã hủy"';
            }
            return value;
        }
    }, {
        text: 'PO Vendor',
        dataIndex: 'po_vendor',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Mã SP (Buyer)',
        dataIndex: 'productbuyercode',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'SL',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'Ngày giao',
        dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 80
    },
    {
        text: 'Ngày NPL',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex: 'matdate',
        width: 70
    },
    {
        text: 'Ngày VC',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex: 'productiondate',
        width: 70
    },
    {
        text: 'Phân xưởng',
        dataIndex: 'factories',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Phụ trách',
        dataIndex: 'merchandiser_name',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 5 5',
        height: 30,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth: 0,
            value: 'Danh sách PO Line (Nhịp giao hàng)'
        }
        ]
    }
    ]
});

