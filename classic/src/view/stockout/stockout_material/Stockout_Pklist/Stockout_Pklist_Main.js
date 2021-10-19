Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'Stockout_Pklist_Main',
    id: 'Stockout_Pklist_Main',
    controller: 'Stockout_Pklist_Main_Controller',
    viewModel:{
        type:'Stockout_Pklist_Main_ViewModel'
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
                    xtype: 'Stockout_Pklist_Stock',
                    width: '30%',
                    margin: 1
                },
                {
                    region: 'center',
                    xtype: 'Stockout_Pklist_Warehouse',
                    margin: 1
                }
            ]
        }, 
    ],
    dockedItems: [
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 3,
                    xtype:'button',
                    text:  'Thoát',
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoat'
                },
                {
                    xtype:'button',
                    text: 'Thêm Packinglist',
                    margin: 3,
                    itemId:'btnSelect',
                    iconCls: 'x-fa fa-plus'
                },
            ]
        }
    ],
});
