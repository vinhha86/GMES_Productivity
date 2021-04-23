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
        width: 150,
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
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Đóng gói',
        flex: 1,
        dataIndex: 'packing_method'
    },
    {
        text: 'Cảng xếp hàng',
        width: 100,
        dataIndex: 'portFrom'
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
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'VC',
        align: 'right',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'RC',
        align: 'right',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },
    {
        text: 'Đóng gói',
        align: 'right',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },
    {
        text: 'Giao hàng',
        align: 'right',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        // padding: '0 0 5 5',
        // height: 40,
        layout: 'hbox',
        items: [
            // {
            //     xtype: 'button',
            //     iconCls: 'x-fa fa-tasks',
            //     itemId: 'hideView',
            //     tooltip: 'Kế hoạch sản xuất'
            // },
            {
                xtype: 'datefield',
                fieldLabel: "Danh sách PO Line (Nhịp giao hàng) đến ngày",
                fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                labelStyle: "font-weight: bold; font-size: 14px; color: black;",
                bind: {
                    value: '{shipdate_to}'
                },
                format: 'd/m/Y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                itemId: 'shipdate',
                width: 470,
                margin: 2,
                editable: false,
                labelWidth: 330
            }
        ]
    }
    ]
});

