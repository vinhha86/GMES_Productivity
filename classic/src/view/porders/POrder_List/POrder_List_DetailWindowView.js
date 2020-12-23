Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailWindowView', {
    extend: 'Ext.window.Window',
    xtype: 'POrder_List_DetailWindowView',
    id: 'POrder_List_DetailWindowView',
    height: '90%',
    width: '90%',
    closable: false,
    title: 'Thông tin lệnh sản xuất',
    resizable: false,
    modal: true,
    border: false,
    closeAction: 'destroy',
    bodyStyle: 'background-color: transparent',
    layout: 'border',
    viewModel: {
        type: 'POrder_List_DetailViewModel'
    },
    controller: 'POrder_List_DetailWindowViewController',
    IdPOrder: 0,
    IdGrant: 0,
    items: [
        {
            region: 'north',
            height: 40,
            border: false,
            xtype: 'POrder_Grant_InfoView'
        },{
            region: 'center',
            layout: 'border',
            // border: false,
            items: [
                {
                    region: 'west',
                    width: 350,
                    xtype: 'POrder_List_PContractPOView',
                    title: 'PO Line',
                    border: true,
                    bind: {
                        hidden: '{is_poline_hidden}'
                    }
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
                            title: 'Chi tiết màu, cỡ - PO Line',
                            flex: 1,
                            height: '100%',
                            border: true,
                            bind: {
                                hidden: '{is_poline_sku_hidden}'
                            }
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
                            ],
                            bind: {
                                hidden: '{is_addremovesku_hidden}'
                            }
                        },               
                        {
                            xtype: 'POrder_List_GrantSKUView',
                            id: 'POrder_List_GrantSKUViewTabInfo',
                            reference: 'POrder_List_GrantSKUViewTabInfo',
                            bind: {
                                // store: '{POrder_ListGrantSKUStoreForWindow}',
                                title: '{grantSKUViewTabInfoTitle}',
                                hidden: '{is_poline_skugranted_hidden}'
                            },
                            width: '40%',
                            height: '100%',
                            border: true
                        },
                    ]
            }]
        }
        // {
        //     region: 'center',
        //     border: false,
        //     margin: 1,
        //     xtype: 'tabpanel',
        //     itemId:'tabmain',
        //     items: [{
        //         title: 'Thông tin lệnh',
        //         xtype: 'POrder_Tab_Info'
        //     }, {
        //         title: 'Phân chuyền',
        //         xtype: 'POrder_Tab_Grant'
        //     }]
        // }
    ],
    dockedItems: [{
        dock:'bottom',
        layout:'hbox',
        items: [{
            xtype: 'button',
            margin: 3,
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
})