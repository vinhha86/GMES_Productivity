Ext.define('GSmartApp.view.DashboardMer.Dashboard_Mer_View', {
    extend: 'Ext.panel.Panel',
    xtype: 'Dashboard_Mer_View',
    id: 'dashboard_mer',
    reference: 'Dashboard_Mer_View',
    controller: 'Dashboard_Mer_ViewController',
    requires: ['Ext.chart.*'],
    viewModel: {
        type: 'Dashboard_Mer_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'north',
        border: false,
        height: '50%',
        // title: 'Top',
        // xtype: '',
        margin: 1,
        layout: 'hbox',
        items: [
            {
                xtype: 'BarChartProductShipDateView',
                itemId: 'BarChartProductShipDateView',
                border: true,
                margin: 1,
                height: '100%',
                flex: 1,
            },
            {
                xtype: 'Dashboard_KhoTP_POLine_Main',
                itemId: 'Dashboard_KhoTP_POLine_Main',
                border: true,
                margin: 1,
                height: '100%',
                width: '100%',
                flex: 1,
                disabled: true, // mặc định là hidden, khi ấn lên BarChartProductShipDateView item -> hidden: false
                // style: 'visibility:hidden;',
                viewModel: {
                    type: 'Dashboard_KhoTP_POLine_ViewModel',
                    data: {
                        isFromDashBoardMer: true,
                    }
                }
            },
            {
                xtype: 'DashboardMer_BalanceView',
                border: true,
                margin: 1,
                height: '100%',
                flex: 1,
                disabled: true,
                // style: 'visibility:hidden;',
            }
        ]
    }, {
        region: 'center',
        border: false,
        height: '50%',
        margin: 1,
        layout: 'hbox',
        items: [{
            xtype: 'DashboardMer_PoLineSKUView',
            border: true,
            margin: 1,
            height: '100%',
            flex: 2,
            disabled: true,
            // style: 'visibility:hidden;',
        }, {
            xtype: 'DashboardMer_ProgressView',
            border: true,
            margin: 1,
            height: '100%',
            flex: 1,
            disabled: true,
            // style: 'visibility:hidden;',
        }]
    }],

    dockedItems: [{
        dock: 'top',
        xtype: 'panel',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype:'textfield',
				labelWidth: 80,
                margin: 1,
                emptyText: "Đơn hàng",
                itemId: 'contract_code',
                width: 130,
                enableKeyEvents : true,
                bind: {
                    value: '{objSearch.contract_code}'
                },
            },
            {
                xtype:'textfield',
				labelWidth: 80,
                margin: 1,
                emptyText: "Mã hàng",
                itemId: 'product_code',
                width: 130,
                enableKeyEvents : true,
                bind: {
                    value: '{objSearch.product_code}'
                },
            },
            {
                xtype:'textfield',
				labelWidth: 80,
                margin: 1,
                emptyText: "PO",
                itemId: 'po_code',
                width: 130,
                enableKeyEvents : true,
                bind: {
                    value: '{objSearch.po_code}'
                },
            },
            {
                xtype: 'combo',
				labelWidth: 80,
                emptyText:'Buyer',
                itemId: 'buyer',
                bind: {
                    store : '{EndBuyerStore}',
                    value: '{objSearch.buyer}'
                },
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                anyMatch: true,
                margin: 1,
                width: 150,
                enableKeyEvents : true,
            },
            {
                xtype: 'combo',
				labelWidth: 80,
                emptyText:'Vendor',
                itemId: 'vendor',
                bind: {
                    store : '{VendorStore}',
                    value: '{objSearch.vendor}'
                },
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                anyMatch: true,
                margin: 1,
                width: 150,
                enableKeyEvents : true,
            },
            // {
            //     xtype: 'datefield',
			// 	labelWidth: 80,
            //     emptyText:'Từ ngày',
            //     itemId: 'contract_datefrom',
            //     reference: 'contract_datefrom',
            //     format:'d/m/Y',
            //     margin: 1,
            //     width: 130,
            //     enableKeyEvents : true,
            // },
            {
                xtype: 'button',
                margin: 1,
                // text: 'Tìm kiếm',
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem'
            }
        ]
    }]
})