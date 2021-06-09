Ext.define('GSmartApp.view.stock.stock_material_list.StockMaterialList', {
    extend: 'Ext.grid.Panel',
    xtype: 'StockMaterialList',
    itemId: 'StockMaterialList',
    reference: 'StockMaterialList',
    controller: 'StockMaterialListController',
    selModel: {
        selType: 'rowmodel',
        mode: 'SINGLE'
    },
    bind: {
        store: '{WarehouseStore}'
    },
    columns: [
        // {
        //     text: 'STT',
        //     width: 50,
        //     xtype: 'rownumberer',
        //     align: 'center'
        // },
        {
            text: 'Mã hàng',
            dataIndex: 'skucode',
            // flex: 1,
            width: 200,
            align: 'center'
        },
        {
            text: 'Màu',
            dataIndex: 'colorname',
            // flex: 1,
            width: 200,
            align: 'center'
        },
        {
            text: 'Khổ cỡ(cm)',
            dataIndex: 'width_met',
            flex: 1,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                return value * 100;
            },
        },
        {
            text: 'Số lot',
            dataIndex: 'lotnumber',
            flex: 1,
            align: 'center'
        },
        {
            text: 'Số cây',
            dataIndex: 'packageid',
            flex: 1,
            align: 'center'
        },
        {
            text: 'Đơn hàng',
            dataIndex: 'contractcode',
            flex: 1,
            align: 'center'
        },
]
});

