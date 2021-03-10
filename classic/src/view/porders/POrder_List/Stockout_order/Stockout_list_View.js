Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Stockout_list_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_list_View',
    id: 'Stockout_list_View',
    controller: 'Stockout_list_ViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{Stockout_order_Store}'
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 50,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Chi tiết'
                },
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Xóa'
                }          
            ]
        },           
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        }, 
        {
            text: 'Số phiếu',
            dataIndex: 'stockout_order_code',
            flex: 1
        },   
        {
            text: 'Loại phiếu',
            dataIndex: 'typename',
            width: 140,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },       
        {
            text: 'Nơi xuất',
            dataIndex: 'org_from_name',
            width: 150,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },     
        {
            text: 'Nơi nhận',
            dataIndex: 'org_to_name',
            width: 150,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, 
        {
            text: 'Người tạo phiếu',
            dataIndex: 'usercreate_name',
            width: 150,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, 
        {
            text: 'Ngày lập',
            dataIndex: 'timecreate',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            // flex: 1,
            width: 120,
        }, {
            text: 'Trạng thái',
            dataIndex: 'statusName',
            width: 120,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }
    ],
    dockedItems:[{
        dock:'top',
        layout: 'hbox',
        items:[{
            xtype: 'button',
            margin: 5,
            tooltip: 'Thêm YCX nguyên liệu',
            iconCls: 'x-fa fa-cart-plus',
            itemId: 'btnThemMoi_Stockout_order_NL'
        },{
            xtype: 'button',
            margin: 5,
            tooltip: 'Thêm YCX phụ liệu',
            iconCls: 'x-fa fa-archive',
            itemId: 'btnThemMoi_Stockout_order_PL'
        }]
    }]
});

