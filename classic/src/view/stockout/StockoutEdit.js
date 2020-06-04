Ext.define('GSmartApp.view.stockout.StockoutEdit', {
    extend: 'Ext.container.Container',
    xtype: 'stockoutedit',
    controller: 'stockouttedit_controller',
    viewModel: 'stockoutedit',
    requires: [
        'GSmartApp.view.stockout.StockoutEditController',
        'GSmartApp.store.Stockout_d'
    ],    
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        // {
        //     xtype: 'stockout',
        //     height: 100
        // },
        {
            xtype: 'stockoutdgrid',
            // padding: 5,
            flex: 1
        },
        {
            xtype: 'panel',
            height: 30,
            layout:'hbox',
            margin:5,
            items:[{
                width:100,
                xtype:'button',
                text:  "Quay lại",
                iconCls: 'x-fa fa-backward',
                handler: 'onUrlBack'
            },
            {
                flex:1
            },
            {
                width:200,
                xtype:'button',
                text:  'Cập nhật kế toán',
                iconCls: 'x-fa fa-check',
                handler: 'onPushToIVYERP'
            }
        ]
        }        
    ],
    listeners: {
        activate: 'onActivate'
    }      
});
