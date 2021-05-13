Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Stockout_order_list_DetailView', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_order_list_DetailView',
    id: 'Stockout_order_list_DetailView',
    controller: 'Stockout_order_list_DetailViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{Stockout_order_d_Store}'
    },
    columns: [
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text: 'Mã NPL',
            dataIndex: 'materialCode',
            width: 120
        },
        {
            text: 'Tên NPL',
            dataIndex: 'materialName',
            width: 150
        }, {
            text: 'Màu NPL',
            dataIndex: 'tenMauNPL',
            flex: 1
        }, {
            text: 'Cỡ khổ',
            dataIndex: 'coKho',
            width: 80
        }, {
            text: 'ĐVT',
            dataIndex: 'unitName',
            width: 70
        }, {
            text: 'SL yêu cầu',
            dataIndex: 'totalyds',
            width: 100,
            renderer: function (value, metaData, record) {
                return value + " m";
            }
        }
    ]
});

