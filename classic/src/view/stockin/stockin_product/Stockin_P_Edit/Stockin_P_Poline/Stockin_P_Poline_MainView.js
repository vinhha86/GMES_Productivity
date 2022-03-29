Ext.define('GSmartApp.view.stockin.Stockin_P_Poline_MainView', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_P_Poline_MainView',
    itemId: 'Stockin_P_Poline_MainView',
    // layout: 'border',
    controller: 'Stockin_P_Poline_MainViewController',
    viewModel: {
        type: 'Stockin_P_Poline_MainViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: 'Đơn hàng: {name}'
        },
        // {
        //     ftype: 'summary',
        //     dock: 'bottom'
        // }
    ],
    // features: [{
    //     id: 'group',
    //     ftype: 'groupingsummary',
    //     groupHeaderTpl: '{name}',
    //     hideGroupedHeader: true,
    //     enableGroupingMenu: false
    // }],
    bind: {
        store: '{PContract_PO}'
    },
    columns: [
        {
            text: 'PO Buyer', 
            dataIndex: 'po_buyer', 
            flex: 1,
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'poBuyerFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onpoBuyerFilterKeyup',
                    buffer: 500
                }
            }
        },  
        {
            text: 'Mã SP (Buyer)',
            dataIndex: 'productbuyercode',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                // metaData.tdCls = 'po_offer';
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'MaSPFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onMaSPFilterKeyup',
                    buffer: 500
                }
            }
        },
        {
            text: 'Đơn hàng',
            dataIndex: 'contractcode',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                // metaData.tdCls = 'po_offer';
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'contractcodeFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'oncontractcodeFilterKeyup',
                    buffer: 500
                }
            }
        },
        {
            text: 'Ngày GH',
            dataIndex: 'shipdate',
            width: 75,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                // metaData.tdCls = 'po_offer';
                return Ext.util.Format.date(value, 'd/m/y');
            }
        },  
        {
            text: 'SL',
            align: 'end',
            dataIndex: 'po_quantity',
            width: 75,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                // metaData.tdCls = 'po_offer';
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // summaryType: 'sum',
            // summaryRenderer: 'renderSum',
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [
            {
                xtype: 'button',
                text: 'Thoát',
                itemId: 'btnThoat',
                iconCls: 'x-fa fa-window-close',
                margin: 5
            },
            // {flex: 1},
            {
                xtype: 'button',
                text: 'Xoá PO Line',
                itemId: 'btnDelete',
                iconCls: 'x-fa fa-trash',
                margin: 5,
                bind: {
                    disabled: '{isBtnDeleteDisable}'
                }
            },
            {
                xtype: 'button',
                text: 'Thêm PO Line',
                itemId: 'btnAdd',
                iconCls: 'x-fa fa-plus',
                margin: 5,
                bind: {
                    disabled: '{isBtnAddDisable}'
                }
            },
        ]
    }]
})