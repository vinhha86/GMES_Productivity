Ext.define('GSmartApp.view.porders.POrderList.SewingCost.PorderSewingCost_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'PorderSewingCost_View',
    id: 'PorderSewingCost_View',
    requires: [
        'Ext.grid.Panel'
    ],
    border: true,
    controller: 'PorderSewingCost_ViewController',
    bind: {
        store: '{PorderSewingCostStore}'
    },
    selModel: 'rowmodel',
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
        rowLines: true,
        columnLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    columns: [
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            header: 'Tên công đoạn',
            dataIndex: 'workingprocess_name',
            flex: 1
        },
        {
            header: 'Thiết bị',
            dataIndex: 'device_name',
            width: 120
        },
        {
            header: 'Bậc thợ',
            dataIndex: 'laborlevel_name',
            width: 120
        },
        {
            header: 'Thời gian',
            dataIndex: 'timespent_standard',
            width: 120,
            renderer: function(value){
                return value == null ? "" : (value + " (s)");
            }
        },
        {
            header: 'Chú thích',
            dataIndex: 'techcomment',
            flex: 1
        },
        {
            header: 'Đơn giá',
            dataIndex: 'cost',
            align: 'right',
            width: 120,
            renderer: 'rendernumber',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                cancelOnEsc: false,
                completeOnEnter: false
            }
        },
        {
            header: 'Số lượng',
            dataIndex: 'amount',
            align: 'right',
            width: 90,
            renderer: 'rendernumber',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                cancelOnEsc: false,
                completeOnEnter: false
            }
        },
        {
            header: 'Tổng giá',
            dataIndex: 'totalcost',
            width: 120,
            align: 'right',
            summaryType: 'sum', 
            summaryRenderer: 'renderSum',
            renderer: 'rendernumber'
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            menuDisabled: true,
            sortable: false,
            items: [{
                iconCls: 'x-fa fas fa-trash',
                tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
                handler: 'onXoa'
            }]
        }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                tooltip: 'Thêm công đoạn',
                iconCls: 'x-fa fa-plus',
                weight: 30,
                handler: 'onThemMoi'
            },
            {
                xtype:'button',
                text: 'Chốt quy trình công nghệ',
                itemId:'btnConfirmSewingCost',
                // ui: 'header',
                tooltip: 'Chốt quy trình công nghệ',
                iconCls: 'x-fa fa-check greenIcon',
                // handler: 'onFactoriesTap',
            }            
        ]
    }]
});
