Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_List_GrantSKUView',
    id: 'POrder_List_GrantSKUView',
    IdPOrder: 0,
    // viewModel: {
    //     type: 'SizesetViewModel'
    // },
    controller: 'POrder_List_GrantSKUViewController',
    reference: 'POrder_List_GrantSKUView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    bind: {
        store: '{POrder_ListGrantSKUStore}'
    },
    title: 'Chi tiết màu, cỡ',
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
        text: 'Tên',
        dataIndex: 'skuname',
        flex: 1,
    },  {
        text: 'Màu',
        dataIndex: 'mauSanPham',
        flex: 1,
    }, {
        text: 'Cỡ',
        dataIndex: 'coSanPham',
        flex: 1
    }, {
        text: 'Số lượng',
        dataIndex: 'grantamount',
        summaryType: 'sum',
        flex: 1,
        align: 'end'
    }]
});

