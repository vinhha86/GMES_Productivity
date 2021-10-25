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
                // {
                //     region: 'west',
                //     xtype: 'Stockout_Pklist_Stock',
                //     width: '30%',
                //     margin: 1
                // },
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
            dock: 'top',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 3,
                    xtype:'button',
                    text:  'Thêm cây vải mất tem',
                    iconCls: 'x-fa fa-plus',
                    itemId: 'btnThemMatTem',
                    bind: {
                        hidden: '{isBtnSelectHidden}'
                    }
                },
            ]
        },
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
                    text: 'Thêm cây vải',
                    margin: 3,
                    itemId:'btnSelect',
                    iconCls: 'x-fa fa-plus',
                    bind: {
                        hidden: '{isBtnSelectHidden}'
                    }
                },
                {
                    margin: 3,
                    flex: 1,
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    // fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                    labelWidth: 0,
                    bind: {
                        value: 'Tổng số cây vải:'
                    },
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    fieldStyle: "font-weight: bold; color: black;",
                    labelWidth: 0,
                    bind: {
                        value: '{totalcay}' + ' cây'
                    },
                },
                {
                    margin: 3,
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    // fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                    labelWidth: 0,
                    value: 'Tổng độ dài:'
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    fieldStyle: "font-weight: bold; color: black;",
                    labelWidth: 0,
                    bind: {
                        value: '{totaldai}' + ' m'
                    },
                },
                {
                    margin: '3 6 3 6',
                },
            ]
        }
    ],
});
