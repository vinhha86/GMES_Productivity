Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_detail_D_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_detail_D_View',
    id: 'Stockout_detail_D_View',
    controller: 'Stockout_detail_D_ViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
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
        },{
            text: 'Màu NPL',
            dataIndex: 'tenMauNPL',
            flex: 1
        },{
            text: 'Cỡ khổ',
            dataIndex: 'coKho',
            width: 80
        },{
            text: 'ĐVT',
            dataIndex: 'unitName',
            width: 70
        },{
            text: 'SL yêu cầu',
            dataIndex: 'totalyds',
            width: 100,
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true
            },
            renderer: function (value, metaData, record) {
                return value+" m";
            }
        }
    ],
    dockedItems:[{
        dock: 'top',
		xtype: 'toolbar',
        items:[{
            xtype: 'button',
            tooltip: 'Thêm NPL',
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi_NPL'
        }]
    }]
});

