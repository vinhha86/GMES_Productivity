Ext.define('GSmartApp.view.porders.POrder_List.POrder_Tab_Info', {
    extend: 'Ext.panel.Panel',
    xtype: 'POrder_Tab_Info',
    id: 'POrder_Tab_Info',
    layout: 'border',
    items: [{
        region: 'north',
        height: 120,
        border: false,
        xtype: 'POrder_InfoView'
    },{
        region: 'center',
        layout: 'border',
        // border: false,
        items: [{
            region: 'west',
            layout: 'border',
            width: 150,
            margin: 1,
            items: [{
                region: 'center',
                xtype: 'POrder_List_PContractPOView',
                title: 'Danh sách PO',
                width: '100%',
                border: true
            }]
        },{
            region: 'center',
            layout: 'border',
            margin: 1,
            items: [{
                region: 'west',
                xtype: 'POrder_ProductSKUView',
                title: 'Chi tiết lệnh',
                width: '100%',
                border: true
            },{
                region: 'east',
                xtype: 'POrder_List_GrantSKUView',
                id: 'POrder_List_GrantSKUViewTabInfo',
                reference: 'POrder_List_GrantSKUViewTabInfo',
                bind: {
                    store: '{POrder_ListGrantSKUStoreForWindow}',
                    title: '{grantSKUViewTabInfoTitle}'
                },
                width: '47%',
                border: true,
                hidden: true
            },{
                region: 'center',
                xtype: 'panel',
                id: 'POrder_List_TabInfo_Arrow',
                reference: 'POrder_List_TabInfo_Arrow',
                layout: 'center',
                hidden: true,
                items:[
                    {
                        xtype: 'container',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'button',
                                id: 'btnAddToGrantSku',
                                tooltip: 'Thêm vào tổ chuyền',
                                iconCls: 'x-fa fa-arrow-right',
                                weight: 30,
                                // handler: 'onPorder_AddSKU'
                            },
                            {height: 10},
                            {
                                xtype: 'button',
                                id: 'btnRemoveFromGrantSku',
                                tooltip: 'Xoá khỏi tổ chuyền',
                                iconCls: 'x-fa fa-arrow-left',
                                weight: 30,
                                // handler: 'onPorder_AddSKU'
                            }
                        ]
                    }
                ]
            }]
        }]
    }]
})