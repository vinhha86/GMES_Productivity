Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_View', {
    extend: 'Ext.panel.Panel',
    xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_View',
    itemId: 'POrder_Grant_Plan_StockoutOrder_Edit_View',
    reference: 'POrder_Grant_Plan_StockoutOrder_Edit_View',
    controller: 'POrder_Grant_Plan_StockoutOrder_Edit_ViewController',
    viewModel: {
        type: 'POrder_Grant_Plan_StockoutOrder_Edit_ViewModel'
    },
    layout: 'border',
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_D'
        },
        {
            region: 'south',
            // border: true,
            margin: 1,
            height: '50%',
            layout: 'border',
            // border: false,
            items: [
                {
                    region: 'center',
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1',
                    items: [
                        {
                            // region: 'west',
                            xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Warehouse',
                            flex: 1,
                            height: '100%',
                            border: true,
                        },
                        {
                            xtype: 'container',
                            width: 40,
                            height: '100%',
                            layout: 'center',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'btnAdd',
                                            tooltip: 'Thêm cây vải',
                                            iconCls: 'x-fa fa-arrow-right',
                                            weight: 30,
                                            // handler: 'onPorder_AddSKU'
                                        },
                                        { height: 10 },
                                        {
                                            xtype: 'button',
                                            itemId: 'btnRemove',
                                            tooltip: 'Bỏ cây vải',
                                            iconCls: 'x-fa fa-arrow-left',
                                            weight: 30,
                                            // handler: 'onPorder_AddSKU'
                                        }
                                    ]
                                }
                            ],
                        },
                        {
                            xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl',
                            flex: 1,
                            height: '100%',
                            border: true
                        },
                    ]
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
                    margin: 3,
                    xtype:'button',
                    text:  'Tạo lệnh cấp vải',
                    iconCls: 'x-fa fa-check',
                    itemId: 'btnCreate'
                },
                {
                    margin: 3,
                    xtype:'button',
                    text:  'Test',
                    iconCls: 'x-fa fa-plus',
                    itemId: 'btnTest',
                    hidden: false,
                },
            ]
        }
    ],
})