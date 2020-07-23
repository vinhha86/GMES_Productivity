Ext.define('GSmartApp.view.porders.POrder_List.POrder_ProductSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_ProductSKUView',
    id: 'POrder_ProductSKUView',
    IdPOrder: 0,
    // viewModel: {
    //     type: 'SizesetViewModel'
    // },
    controller: 'POrder_ProductSKUViewController',
    reference: 'POrder_ProductSKUView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary'
    }],
    bind: {
        store: '{porderSKUStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'SKU',
        dataIndex: 'skucode',
        flex: 1,
    }, {
        text: 'Màu',
        dataIndex: 'mauSanPham',
        flex: 1,
    }, {
        text: 'Cỡ',
        dataIndex: 'coSanPham',
        summaryType: 'count',
        summaryRenderer: function(){
            return '<b>Tổng SL : </b>';
        },
        flex: 1
    }, {
        text: 'Số lượng',
        dataIndex: 'pquantity_total',
        summaryType: 'sum',
        summaryRenderer: function(value){
            return '<b>'+value+'</b>';
        },
        fieldStyle:{
            'text-align':'right',
        },
        flex: 1
    }]
});

