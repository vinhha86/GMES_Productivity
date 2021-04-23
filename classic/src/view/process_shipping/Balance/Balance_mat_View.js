Ext.define('GSmartApp.view.process_shipping.Balance.Balance_mat_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Balance_mat_View',
    id: 'Balance_mat_View',
    controller: 'Balance_mat_ViewController',
    reference: 'Balance_mat_View',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{SKUBalanceStore_Mat}'
    },
    columns: [{
        text: 'Mã vải',
        dataIndex: 'mat_sku_code',
        flex: 1
    },
    {
        text: 'SL Y/C',
        align: 'right',
        dataIndex: 'mat_sku_demand',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'Dự kiến về',
        dataIndex: 'mat_sku_invoice_date',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 80
    },
    {
        text: 'Thực nhập',
        align: 'right',
        dataIndex: 'mat_sku_stockin',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
        }
    },
    {
        text: 'Thực xuất',
        align: 'right',
        dataIndex: 'mat_sku_stockout',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
        }
    },
    {
        text: 'Tồn',
        align: 'right',
        dataIndex: 'in_stock',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
        }
    },
    {
        text: 'Lệnh xuất vải',
        align: 'right',
        dataIndex: 'stockout_list',
        width: 120,
    },    
    // {
    //     xtype: 'actioncolumn',
    //     width: 60,
    //     menuDisabled: true,
    //     sortable: false,
    //     align: 'center',
    //     text: 'Lệnh xuất vải',
    //     iconCls: 'x-fa fas fa-bars violetIcon',
    //     handler: 'onMenu_POrderList'
    // }
    ]
});

