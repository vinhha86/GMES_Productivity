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
            width: 180
        }, {
            text: 'Thẻ kho',
            dataIndex: 'data_spaces',
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
            text: 'SL giữ',
            dataIndex: 'totalyds_lock',
            width: 80,
            renderer: function (value, metaData, record) {
                value = value == null ? "" : value + ' y';
                return value;
            },
            bind: {
                hidden: '{isHiddenYard}'
            }
        },
        {
            text: 'SL giữ',
            dataIndex: 'totalmet_lock',
            width: 80,
            renderer: function (value, metaData, record) {
                value = value == null ? "" : value + ' m';
                return value;
            },
            bind: {
                hidden: '{!isHiddenYard}'
            }
        }, {
            text: 'Số cây YC',
            dataIndex: 'roll_request',
            width: 60,
            editor: {
                xtype: 'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true
            },
            renderer: function (value, metaData, record) {
                value = value == null ? "" : value;
                return value;
            }
        }, {
            text: 'SL YC',
            dataIndex: 'totalyds',
            width: 100,
            renderer: function (value, metaData, record) {
                return value + " y";
            },
            bind: {
                hidden: '{isHiddenYard}'
            }
        },
        {
            text: 'SL YC',
            dataIndex: 'totalmet',
            width: 100,
            renderer: function (value, metaData, record) {
                return value + " m";
            },
            bind: {
                hidden: '{!isHiddenYard}'
            }
        }
    ]
});

