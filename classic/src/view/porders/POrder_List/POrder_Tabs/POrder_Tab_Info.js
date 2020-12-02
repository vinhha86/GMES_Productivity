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
        items: [
            {
                region: 'west',
                width: 150,
                xtype: 'POrder_List_PContractPOView',
                title: 'PO Line',
                border: true
            },
            {
                region: 'center',
                xtype: 'panel',
                layout: 'hbox',
                margin: '0 0 0 2',
                items: [
                    {
                        // region: 'west',
                        xtype: 'POrder_ProductSKUView',
                        title: 'Chi tiết lệnh',
                        width: '55%',
                        height: '100%',
                        border: true,
                    },
                    {
                        xtype: 'container',
                        width: 40,
                        height: '100%',
                        layout: 'center',
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
                    },               
                    {
                        xtype: 'POrder_List_GrantSKUView',
                        id: 'POrder_List_GrantSKUViewTabInfo',
                        reference: 'POrder_List_GrantSKUViewTabInfo',
                        bind: {
                            store: '{POrder_ListGrantSKUStoreForWindow}',
                            title: '{grantSKUViewTabInfoTitle}'
                        },
                        flex: 1,
                        height: '100%',
                        border: true,
                    },
                ]
        }]
    }]
})