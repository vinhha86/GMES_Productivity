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
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
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
        flex: 1
    }, {
        text: 'Số lượng',
        dataIndex: 'pquantity_total',
        summaryType: 'sum',
        flex: 1,
        align: 'end'
    }]
});

