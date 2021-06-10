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
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        enableTextSelection: true,
        rowLines: true
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
            width: 180,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'Màu',
            dataIndex: 'colorname',
            // flex: 1,
            width: 150,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'Dài (m)',
            dataIndex: 'width_met',
            flex: 1,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null || isNaN(value)){
                    return '';
                }
                // return value * 100;
                // metaData.tdAttr = 'data-qtip="' + value + '"';
                return Ext.util.Format.number(value, '0.00');
            },
        },
        {
            text: 'Dài (y)',
            dataIndex: 'width_yds',
            flex: 1,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null || isNaN(value)){
                    return '';
                }
                // return value * 100;
                return Ext.util.Format.number(value, '0.00');
            },
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
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'Số cây',
            dataIndex: 'packageid',
            flex: 1,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'Đơn hàng',
            dataIndex: 'contractcode',
            flex: 1,
            align: 'center',
            renderer: function(value, meta, record,){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
]
});

