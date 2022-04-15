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
        selType: 'rowmodel',
        // selType: 'checkboxmodel',
        mode: 'SINGLE',
        // mode: 'MULTI',
        // checkOnly: true
    },
    // features: [{
    //     ftype: 'summary',
    //     dock: 'bottom'
    // }],
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        // hidden: true,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenuShow'
            },
        ],
        bind: {
            hidden: '{isFromDashBoardMer}'
        }
    }, 
    {
        text: 'Ngày giao',
        dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 80
    },
    {
        text: 'Mã SP',
        dataIndex: 'productbuyercode',
        // width: 120,
        flex: 1,
        menuDisabled: true,
        sortable: false,
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
            },
        },
        // bind: {
        //     hidden: '{isFromDashBoardMer}'
        // }
    },
    {
        text: 'PO',
        dataIndex: 'po_buyer',
        width: 100,
        // flex: 1,
        menuDisabled: true,
        sortable: false,
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
            },
        },
        summaryType: 'count',
        summaryRenderer: function (value, record) {
            if (null == value) value = 0;
            return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + ' (line)</div>';
        },
        // bind: {
        //     hidden: '{isFromDashBoardMer}'
        // }
    }, 
    // {
    //     text: 'Mã SP (Buyer)',
    //     dataIndex: 'productbuyercode',
    //     // width: 120,
    //     flex: 1,
    //     menuDisabled: true,
    //     sortable: false,
    //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return value;
    //     },
    //     bind: {
    //         hidden: '{!isFromDashBoardMer}'
    //     }
    // },
    // {
    //     text: 'PO Buyer',
    //     dataIndex: 'po_buyer',
    //     width: 100,
    //     // flex: 1,
    //     menuDisabled: true,
    //     sortable: false,
    //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';

    //         if (record.data.ismap) {
    //             metaData.tdCls = "po_offer";
    //         }
    //         return value;
    //     },
    //     summaryType: 'count',
    //     summaryRenderer: function (value, record) {
    //         if (null == value) value = 0;
    //         return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + ' (line)</div>';
    //     },
    //     bind: {
    //         hidden: '{!isFromDashBoardMer}'
    //     }
    // }, 
    {
        text: 'PT vận chuyển',
        dataIndex: 'shipmodeid_link',
        flex: 1,
        menuDisabled: true,
        sortable: false,
        hideable: false,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'combo',
                typeAhead: true,
                triggerAction: 'all',
                selectOnFocus: false,
                bind: {
                    store: '{ShipModeStore}',
                    value: '{shipmodeid_link}'
                },
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local'
            }
        },
        renderer: 'renderShipping',
        bind: {
            hidden: '{isFromDashBoardMer}'
        }
    },
    // {
    //     text: 'Cảng xếp hàng',
    //     width: 100,
    //     dataIndex: 'portFrom'
    // },
    {
        text: 'ĐVT',
        dataIndex: 'totalpair',
        width: 60,
        menuDisabled: true,
        sortable: false,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 1 ? "Chiếc" : "Bộ (" + value + ")";
        },
        bind: {
            hidden: '{isFromDashBoardMer}'
        }
    },
    {
        text: 'SL Y/C',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        menuDisabled: true,
        sortable: false,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }
    ],
    dockedItems: [{
		dock: 'top',
		xtype:'toolbar',
		items: [{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Từ ngày',
			itemId: 'shipdate_from',
			editable: false,
			margin: 1,
            bind: {
                value: '{shipdate_from}',
                hidden: '{isFromDashBoardMer}'
            },
			width: 110,
            format:'d/m/y',
		},{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Đến ngày',
			itemId: 'shipdate_to',
			editable: false,
			margin: 1,
			width: 110,
            bind: {
                value: '{shipdate_to}',
                hidden: '{isFromDashBoardMer}'
            },
            format:'d/m/y'
		},
        {
            xtype: 'combo',
            labelWidth: 0,
            emptyText: 'Buyer',
            bind: {
                store: '{EndBuyer}',
                value: '{orgbuyerid_link}',
                hidden: '{isFromDashBoardMer}'
            },
            valueField: 'id',
            displayField: 'code',
            queryMode: 'local',
            anyMatch: true,
            itemId: 'orgbuyerid_link',
			margin: 1,
        },
		{
            xtype: 'button',
			margin: 1,
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem',
            bind: {
                hidden: '{isFromDashBoardMer}'
            },
        },
        {
            xtype: 'displayfield',
            fieldStyle: "font-weight: 500; font-size: 14px; color: black;",
            labelWidth: 0,
			margin: 1,
            value: ' DS PO Line',
            bind: {
                hidden: '{!isFromDashBoardMer}'
            }
        },
        '->',
        {
            xtype: 'button',
			margin: 1,
            itemId:'btnStockoutOrder_Create',
            text: 'Tạo Lệnh xuất kho',
            // bind: {
            //     hidden: '{isFromDashBoardMer}'
            // }
        }]
	}]
});

