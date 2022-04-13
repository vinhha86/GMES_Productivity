Ext.define('GSmartApp.view.DashboardMer.DashboardMer_Balance.DashboardMer_BalanceView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DashboardMer_BalanceView',
    itemId: 'DashboardMer_BalanceView',
    reference: 'DashboardMer_BalanceView',
    controller: 'DashboardMer_BalanceViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true,
        enableTextSelection: true
    },
    bind: {
        store: '{SKUBalanceStore}'
    },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'MULTI',
    //     checkOnly: true
    // },
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
    columns: [
        // {
        //     xtype: 'actioncolumn',
        //     width: 28,
        //     menuDisabled: true,
        //     sortable: false,
        //     // hidden: true,
        //     align: 'center',
        //     items: [
        //         {
        //             iconCls: 'x-fa fas fa-bars violetIcon',
        //             handler: 'onMenuShow'
        //         },
        //     ],
        //     bind: {
        //         hidden: '{isFromDashBoardMer}'
        //     }
        // }, 
        {
            text: 'Mã NPL',
            dataIndex: 'mat_sku_code',
            // width: 120,
            flex: 1,
            minWidth: 120,
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
                reference: 'filterMaNPL',
                width: '99%',
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onFilterMaNPLKeyup',
                    buffer: 500
                },
            },
        },
        {
			text: 'ĐVT',
			dataIndex: 'mat_sku_unit_name',
			width: 70
		},
        {
            text: 'SL nhu cầu',
            align: 'right',
            dataIndex: 'mat_sku_demand_dh',
            width: 70,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                // return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                return Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'SL nhập kho',
            align: 'right',
            dataIndex: 'mat_sku_stockin',
            width: 70,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                // return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                return Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'SL xuất kho',
            align: 'right',
            dataIndex: 'mat_sku_stockout',
            width: 70,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                // return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                return Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'SL tồn',
            align: 'right',
            dataIndex: 'in_stock',
            width: 70,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                // return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                return Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        }
    ],
    dockedItems: [{
		dock: 'top',
		xtype:'toolbar',
		items: [
            {
                xtype: 'displayfield',
                fieldStyle: "font-weight: 500; font-size: 14px; color: black;",
                labelWidth: 0,
                margin: 1,
                value: 'Cân đối NPL',
            },
            {
                xtype: 'button',
                margin: '1 1 1 5',
                text: 'Lập phiếu mới',
                // iconCls: 'x-fa fa-bars',
                menu: [
                    {
                        itemId: 'btnNhapMuaMoi', // id:1
                        // iconCls: 'x-fa fa-plus',
                        text: 'Nguyên liệu',
                        // handler: 'onNhapMuaMoi'
                    },
                    {
                        itemId: 'btnNhapMuaMoiPhuLieu', // id:11
                        // iconCls: 'x-fa fa-plus',
                        text: 'Phụ liệu',
                        // handler: 'onNhapMuaMoiPhuLieu'
                    },
                ],
            },
        ]
	}]
});

