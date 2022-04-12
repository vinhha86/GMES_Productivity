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
            width: 120,
            // flex: 1,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            // items: {
            //     xtype: 'textfield',
            //     fieldStyle: "",
            //     margin: 1,
            //     reference: 'filterMaSP',
            //     width: '99%',
            //     enableKeyEvents: true,
            //     listeners: {
            //         keyup: 'onFilterMaSPKeyup',
            //         buffer: 500
            //     },
            // },
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
            width: 90,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'SL nhập kho',
            align: 'right',
            dataIndex: 'mat_sku_stockin',
            width: 90,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'SL xuất kho',
            align: 'right',
            dataIndex: 'mat_sku_stockout',
            width: 90,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'SL tồn',
            align: 'right',
            dataIndex: 'in_stock',
            width: 90,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        }
    ],
    // dockedItems: [{
	// 	dock: 'top',
	// 	xtype:'toolbar',
	// 	items: [{
	// 		xtype:'datefield',
	// 		labelWidth: 0,
	// 		emptyText: 'Từ ngày',
	// 		itemId: 'shipdate_from',
	// 		editable: false,
	// 		margin: 1,
    //         bind: {
    //             value: '{shipdate_from}',
    //             hidden: '{isFromDashBoardMer}'
    //         },
	// 		width: 110,
    //         format:'d/m/y',
	// 	},{
	// 		xtype:'datefield',
	// 		labelWidth: 0,
	// 		emptyText: 'Đến ngày',
	// 		itemId: 'shipdate_to',
	// 		editable: false,
	// 		margin: 1,
	// 		width: 110,
    //         bind: {
    //             value: '{shipdate_to}',
    //             hidden: '{isFromDashBoardMer}'
    //         },
    //         format:'d/m/y'
	// 	},
    //     {
    //         xtype: 'combo',
    //         labelWidth: 0,
    //         emptyText: 'Buyer',
    //         bind: {
    //             store: '{EndBuyer}',
    //             value: '{orgbuyerid_link}',
    //             hidden: '{isFromDashBoardMer}'
    //         },
    //         valueField: 'id',
    //         displayField: 'code',
    //         queryMode: 'local',
    //         anyMatch: true,
    //         itemId: 'orgbuyerid_link',
	// 		margin: 1,
    //     },
	// 	{
    //         xtype: 'button',
	// 		margin: 1,
    //         iconCls: 'x-fa fa-search',
    //         itemId: 'btnTimKiem',
    //         bind: {
    //             hidden: '{isFromDashBoardMer}'
    //         },
    //     },
    //     {
    //         xtype: 'displayfield',
    //         fieldStyle: "font-weight: 500; font-size: 14px; color: black;",
    //         labelWidth: 0,
	// 		margin: 1,
    //         value: ' DS PO Line',
    //         bind: {
    //             hidden: '{!isFromDashBoardMer}'
    //         }
    //     },
    //     '->',
    //     {
    //         xtype: 'button',
	// 		margin: 1,
    //         itemId:'btnStockoutOrder_Create',
    //         text: 'Tạo Lệnh xuất kho',
    //         bind: {
    //             hidden: '{isFromDashBoardMer}'
    //         }
    //     },
    // ]
	// }]
});

