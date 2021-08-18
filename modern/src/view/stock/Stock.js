Ext.define('GSmartApp.view.stock.Stock', {
    extend: 'Ext.Container',
    xtype: 'Stock',
    id: 'stock',
    reference: 'Stock',
    viewModel: {
        type: 'StockViewModel'
    },
    controller: 'StockController',
    height: '100%',
    layout: 'fit',
    width: '100%',
    items:[
        {
            xtype: 'panel',
            height: '100%',
            layout: 'vbox',
            items: [
                // {
                //     layout: 'hbox',
                //     defaults: {
                //         margin: 5
                //     },
                //     items: [
                //         {
                //             xtype: 'datefield',
                //             reference: 'toDate',
                //             itemId: 'toDate',
                //             label: 'đến:',
                //             // labelWidth: 'auto',
                //             labelWidth: 60,
                //             value: new Date(),
                //             dateFormat : 'd/m/y',
                //             flex: 1,
                //             enableKeyEvents: true,
                //             listeners: {
                //                 change : 'loadData'
                //             }
                //         }
                //     ]
                // },
                // {
                //     layout: 'hbox',
                //     defaults: {
                //         margin: 5
                //     },
                //     items: [
                //         {
                //             xtype: 'datefield',
                //             reference: 'fromDate',
                //             itemId: 'fromDate',
                //             label: 'Nhập từ:',
                //             // labelWidth: 'auto',
                //             labelWidth: 70,
                //             value: new Date(),
                //             // value: new Date(2020, 1, 1),
                //             dateFormat : 'd/m/y',
                //             flex: 1,
                //             enableKeyEvents: true,
                //             listeners: {
                //                 change : 'loadData'
                //             }
                //         },
                //     ]
                // },
                {
                    margin: 1,
                    flex: 1,
                    xtype: 'StockMenu',
                },
            ],
            tbar: [
                {
                    xtype:'button',
                    iconCls: 'x-fa fa-arrow-left',
                    itemId:'btnBack',
                    ui: 'action',
                },
                '->'
                ,
            ]            
        }
    ]
});
