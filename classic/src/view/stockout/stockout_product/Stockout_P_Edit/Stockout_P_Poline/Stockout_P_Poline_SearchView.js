Ext.define('GSmartApp.view.stockout.Stockout_P_Poline_SearchView', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_P_Poline_SearchView',
    itemId: 'Stockout_P_Poline_SearchView',
    // layout: 'border',
    controller: 'Stockout_P_Poline_SearchViewController',
    viewModel: {
        type: 'Stockout_P_Poline_SearchViewModel'
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
        dock: 'top',
        layout: 'hbox',
        items: [
            {
                xtype: 'textfield',
                itemId: 'po_buyer',
                // fieldStyle: "",
                fieldLabel: 'PO Buyer',
                reference: 'po_buyer',
				labelWidth: 65,
                width: 215,
                margin: 2,
                bind: {
                    value:'{objSearch.po_buyer}'
                },
                enableKeyEvents: true,
            },
            {
                xtype: 'textfield',
                itemId: 'productbuyercode',
                // fieldStyle: "",
                fieldLabel: 'Mã SP(Buyer)',
                reference: 'productbuyercode',
				labelWidth: 90,
                width: 240,
                margin: 2,
                bind: {
                    value:'{objSearch.productbuyercode}'
                },
                enableKeyEvents: true,
            },
            {
                xtype: 'textfield',
                itemId: 'pcontractcode',
                // fieldStyle: "",
                fieldLabel: 'Đơn hàng',
                reference: 'pcontractcode',
				labelWidth: 70,
                width: 220,
                margin: 2,
                bind: {
                    value:'{objSearch.pcontractcode}'
                },
                enableKeyEvents: true,
            },
            {
                xtype: 'datefield',
                itemId: 'shipdateFrom',
                format:'d/m/y',
                // fieldStyle: "",
                fieldLabel: 'GH từ',
                reference: 'shipdateFrom',
				labelWidth: 65,
                width: 185,
                margin: 2,
                bind: {
                    value:'{objSearch.shipdateFrom}'
                },
                enableKeyEvents: true,
            },
            {
                xtype: 'datefield',
                itemId: 'shipdateTo',
                format:'d/m/y',
                // fieldStyle: "",
                fieldLabel: 'đến',
                reference: 'shipdateTo',
				labelWidth: 35,
                width: 155,
                margin: 2,
                bind: {
                    value:'{objSearch.shipdateTo}'
                },
                enableKeyEvents: true,
            },
            // {flex: 1},
            {
                xtype: 'button',
                // text: 'Tìm kiếm',
                itemId: 'btnSearch',
                iconCls: 'x-fa fa-search',
                margin: 2,
            },
        ]
    },{
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
                text: 'Lưu',
                itemId: 'btnAdd',
                iconCls: 'x-fa fa-save',
                margin: 5
            },
        ]
    }]
})