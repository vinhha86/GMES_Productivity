Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'Dashboard_KhoTP_POLine_List',
    id: 'Dashboard_KhoTP_POLine_List',
    reference: 'Dashboard_KhoTP_POLine_List',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true,
        enableTextSelection: true
    },
    bind: {
        store: '{POLineStore}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        hidden: true,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenuShow'
            },
        ]
    }, 
    {
        text: 'Ngày giao',
        dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 80
    },
    {
        text: 'Mã SP (Buyer)',
        dataIndex: 'productbuyercode',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';

            if (record.data.ismap) {
                metaData.tdCls = "po_offer";
            }
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
        },
        summaryType: 'count',
        summaryRenderer: function (value, record) {
            if (null == value) value = 0;
            return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + ' (line)</div>';
        }
    }, 
    {
        text: 'Đóng gói',
        width: 150,
        dataIndex: 'packing_method'
    },
    {
        text: 'PT vận chuyển',
        flex: 1,
        dataIndex: 'shipmode_name'
    },
    {
        text: 'Cảng xếp hàng',
        width: 100,
        dataIndex: 'portFrom'
    },
    {
        text: 'ĐVT',
        dataIndex: 'totalpair',
        width: 60,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 1 ? "Chiếc" : "Bộ (" + value + ")";
        }
    },
    {
        text: 'SL Y/C',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: function (value, meta, record) {
            if (null == value) value = 0;
            return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    }
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'vbox',
        items: [{
            layout: 'hbox',
            xtype: 'toolbar',
            padding: 5,
            height: 40,
            items: [
                {
                    xtype: 'button',
                    text: 'Tạo Lệnh xuất kho'
                },
            ]
        }
        ]
    },
    ]
});

