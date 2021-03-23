Ext.define('GSmartApp.view.stockout.Stockout_packinglist', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_packinglist',
    controller: 'Stockout_packinglist_Controller',
    viewModel: {
        type: 'Stockout_packinglist_ViewModel'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            margin: 1,
            flex: 1,
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'Stockout_packinglist_warehouse',
                    width: '45%',
                    margin: 1
                },
                {
                    region: 'west',
                    width: 40,
                    layout: 'vbox',
                    items:[
                        {
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Thêm vào lệnh',
                            iconCls: 'x-fa fa-arrow-right',
                            weight: 30,
                            itemId: 'btnAddToStockout'
                            // handler: 'onPorder_AddSKU'
                        },
                        {height: 10},
                        {
                            xtype: 'button',
                            tooltip: 'Xoá khỏi lệnh',
                            iconCls: 'x-fa fa-arrow-left',
                            itemId: 'btnDeleteFromStockout',
                            weight: 30,
                            // handler: 'onPorder_AddSKU'
                        },
                        {
                            flex: 1
                        }    
                    ]
                },
                {
                    region: 'center',
                    xtype: 'Stockout_packinglist_detail',
                    margin: 1
                }
            ]
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            items:[
            {
                flex:1
            },
            {
                margin: 1,
                xtype:'button',
                text:  'Thoát',
                iconCls: 'x-fa fa-window-close',
                itemId: 'btnThoat'
            }
        ]
        }        
    ] 
});
