Ext.define('GSmartApp.view.process_shipping.POrder.POrder_List.POrderView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderView',
    id: 'POrderView',
    controller: 'POrderViewController',
    reference: 'POrderView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{POrder_ListStore}'
    },
    features: [
        {
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '<b>Phân xưởng: {name}</b>',
            hideGroupedHeader: false,
            enableGroupingMenu: false,
        },
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    columns: [
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_POrderList'
                },
            ]
        },
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text: 'Mã lệnh',
            dataIndex: 'ordercode',
            width: 120,
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('status');
                if (c == 0) {
                    metaData.tdCls = 'process-free';
                } else if (c == 1) {
                    metaData.tdCls = 'process-granted';
                } else if (c == 2) {
                    metaData.tdCls = 'process-ready';
                } else if (c == 3) {
                    metaData.tdCls = 'process-subprocess';
                } else if (c == 4) {
                    metaData.tdCls = 'process-running';
                } else if (c == 5) {
                    metaData.tdCls = 'process-done';
                } else if (c == 6) {
                    metaData.tdCls = 'process-finish';
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count',
            summaryRenderer: 'renderSum',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'ordercodeFilterField',
                width: 116,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onOrderCodeFilterKeyup',
                    buffer: 500
                }
            }
        },
        {
            text: 'Mã SP (Buyer)',
            dataIndex: 'stylebuyer',
            width: 140,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stylebuyerFilterField',
                width: 136,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStyleBuyerFilterKeyup',
                    buffer: 500
                }
            }
        },
        {
            text: 'PO Buyer',
            dataIndex: 'po_buyer',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'po_buyerFilterField',
                width: 116,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPo_BuyerFilterKeyup',
                    buffer: 500
                }
            }
        },
        {
            text: 'Buyer',
            dataIndex: 'buyername',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Vendor',
            dataIndex: 'vendorname',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Vào chuyền',
            dataIndex: 'startDatePlan',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            // flex: 1,
            width: 70,
        }, {
            text: 'Giao hàng',
            dataIndex: 'golivedate',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            // flex: 1,
            width: 70,
        }, {
            text: 'Số lượng',
            dataIndex: 'totalorder',
            renderer: function (value) {
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            // flex: 1,
            width: 100,
            align: 'end',
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        }, {
            text: 'Trạng thái',
            dataIndex: 'statusName',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }
    ]
});

