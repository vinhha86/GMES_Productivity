Ext.define('GSmartApp.view.pcontract.PContract_POrder_Edit_PorderSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_Edit_PorderSKU',
    id:'PContract_POrder_Edit_PorderSKU',
    
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
        store:'{POrderSKUStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skucode', flex: 1},
        { header: 'Màu', dataIndex: 'mauSanPham', width: 70},
        { header: 'Cỡ', dataIndex: 'coSanPham', width: 70},  
        { header: 'Số lượng', dataIndex: 'pquantity_total', width: 80, summaryType: 'sum', align: 'end'
            // editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: false},
        }
    ]     
});

