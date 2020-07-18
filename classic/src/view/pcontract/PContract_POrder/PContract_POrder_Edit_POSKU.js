Ext.define('GSmartApp.view.pcontract.PContract_POrder_Edit_POSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_Edit_POSKU',
    id: 'PContract_POrder_Edit_POSKU',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    }, 
    bind:{
        store:'{POSKUStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skuCode', flex: 1},
        { header: 'Màu', dataIndex: 'mauSanPham', width: 70},
        { header: 'Cỡ', dataIndex: 'coSanPham', width: 70},  
        { header: 'Số lượng', dataIndex: 'pquantity_total', width: 80, summaryType: 'sum', align: 'end'}
    ]  
});

