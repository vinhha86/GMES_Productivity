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
        text: 'Mã SP (Buyer)',
        dataIndex: 'productbuyercode',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, 
    {
        text: 'Ngày giao',
        dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 80
    },
    {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Đóng gói',
        width: 100
    },
    {
        text: 'Cảng xếp hàng',
        width: 100
    },
    {
        text: 'SL Y/C',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'Cắt',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'VC',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'RC',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },
    {
        text: 'Đóng gói',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },
    {
        text: 'Giao hàng',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, 
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

