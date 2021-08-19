Ext.define('GSmartApp.view.stock.stock_material.StockMaterialList_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'StockMaterialList_Main',
    itemId: 'StockMaterialList_Main',
    reference: 'StockMaterialList_Main',
    controller: 'StockMaterialList_MainController',
    viewModel: {
        type: 'StockMaterialListViewModel',
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items:[
        {
            margin: 1,
            flex: 1,
            xtype: 'StockMaterialList',
        },
        {
            layout: 'hbox',
            // flex: 1,
            items:[
                {
                    xtype:'button',
                    iconCls: 'x-fa fa-random',
                    itemId:'btnChuyenKhoang',
                    text: 'Chuyển khoang',
                    ui: 'action',
                    margin: 1,
                },    
            ]
        },
    ]
});