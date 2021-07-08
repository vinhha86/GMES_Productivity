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
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenuShow'
            },
        ]
    }, {
        text: 'Mã SP (Buyer)',
        dataIndex: 'productbuyercode',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'filterMaSP',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterMaSPKeyup',
                buffer: 500
            }
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
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'filterPO',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterPOKeyup',
                buffer: 500
            }
        }
    },
    {
        text: 'Đóng gói',
        flex: 1,
        dataIndex: 'packing_method'
    },
    {
        text: 'PT vận chuyển',
        width: 150,
        dataIndex: 'shipmode_name'
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
        layout: 'hbox',
        items: [{
            xtype: 'datefield',
            fieldLabel: "Danh sách PO Line (Nhịp giao hàng) từ ngày",
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelStyle: "font-weight: bold; font-size: 14px; color: black;",
            bind: {
                value: '{shipdate_from}'
            },
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            itemId: 'shipdate_from',
            width: 470,
            margin: 2,
            editable: false,
            labelWidth: 330
        },
        {
            xtype: 'datefield',
            fieldLabel: "Đến ngày",
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelStyle: "font-weight: bold; font-size: 14px; color: black;",
            bind: {
                value: '{shipdate_to}'
            },
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            itemId: 'shipdate_to',
            width: 210,
            margin: 2,
            editable: false,
            labelWidth: 70
        }
        ]
    }
    ]
});

