Ext.define('GSmartApp.view.stock.Stock', {
    extend: 'Ext.form.Panel',
    xtype: 'Stock',
    id:'stock',
    viewModel:{
        type:'StockViewModel'
    },
    layout: 'border',
    height: 500,
    items: [{
        region: 'west',
        width: '50%',
        title: 'Danh sách khoang',
        xtype: 'StockMenu',
        border: true,
        margin: 1
    
    },{
        region: 'east',
        width: '50%',
        title: 'Thông tin dãy',
        xtype: 'StockRow',
        border: true,
        margin: 1,
        bind: {
            hidden: '{isRowViewHidden}'
        }
    },{
        region: 'east',
        width: '50%',
        title: 'Thông tin hàng, tầng',
        xtype: 'StockDetail',
        border: true,
        margin: 1,
        bind: {
            hidden: '{isSpaceViewHidden}'
        }
    }]

})