Ext.define('GSmartApp.view.stock.Stock', {
    extend: 'Ext.form.Panel',
    xtype: 'Stock',
    id:'stock',
    viewModel:{
        type:'StockViewModel'
    },
    layout: 'border',
    height: 500,
    items: [
        {
            region: 'west',
            width: '30%',
            title: 'Danh sách khoang',
            xtype: 'StockMenu',
            border: true,
            margin: 1
        
        },
        {
            region: 'east',
            width: '70%',
            title: 'Danh sách NPL',
            xtype: 'StockMaterialList',  
            border: true,
            margin: 1,
        },
    ]
})