Ext.define('GSmartApp.view.pcontract.FOBPricePODetail', {
    extend: 'Ext.grid.Panel',
    xtype: 'FOBPricePODetail',
    id: 'FOBPricePODetail',
    viewModel: {
        type: 'FOBPricePODetailViewModel'
    },
    controller: 'FOBPricePODetailController',
    reference: 'FOBPricePODetail',
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 2
    //     }
    // },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{FOBPricePODetailStore}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<b>{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    }],
    columns: [
    // {
    //     text: 'STT',
    //     width: 40,
    //     xtype: 'rownumberer',
    //     align: 'center'
    // }, 
    {
        text: 'Dải cỡ',
        dataIndex: 'sizesetname',
        flex: 1
    },
    {
        text: 'Tên',
        dataIndex: 'fobprice_name',
        flex: 1
    },
    {
        text: 'Giá',
        dataIndex: 'price',
        flex: 1
    },
    {
        text: 'Đơn vị',
        dataIndex: 'currencyName',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            return value;
        }
    },
    ],

    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-backward',
            formBind: false
        },{
            flex:1,
            border: false
        }]
    }]
});

