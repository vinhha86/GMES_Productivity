Ext.define('GSmartApp.view.invoice.invoice_npl_search.invoice_npllist', {
    extend: 'Ext.grid.Panel',
    xtype: 'invoice_npllist',
    id: 'invoice_npllist',
    reference: 'invoice_npllist',
    // controller: 'HandoverDetailPorderSearchController',
    viewModel:{
        // type:'HandoverDetailPorderSearchViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    bind:{
        store:'{SkuStore}'
    },
    scrollable: true,
    border: true,
    width: '100%',
    height: '100%',
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },
        { header: 'Mã NPL', dataIndex: 'code', flex: 1},
        { header: 'Nguyên phụ liệu', dataIndex: 'producttype_name', flex: 1},
        { header: 'Màu NPL', dataIndex: 'mauSanPham', flex: 1},
        { header: 'Cỡ khổ', dataIndex: 'coSanPham', width: 70},
    ],
});

