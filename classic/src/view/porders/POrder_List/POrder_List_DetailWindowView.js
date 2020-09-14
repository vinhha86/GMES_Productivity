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
    layout: {
        type: 'fit', // fit screen for window
        padding: 5
    },
    viewModel: {
        type: 'POrder_List_DetailViewModel'
    },
    controller: 'POrder_List_DetailWindowViewController',
    IdPOrder: 0,
    IdGrant: 0,
    items: [{
        region: 'center',
        border: false,
        margin: 1,
        xtype: 'tabpanel',
        itemId:'tabmain',
        items: [{
            title: 'Thông tin lệnh',
            xtype: 'POrder_Tab_Info'
        }, {
            title: 'Phân chuyền',
            xtype: 'POrder_Tab_Grant'
        }]
    }],
    dockedItems: [{
        dock:'bottom',
        layout:'hbox',
        items: [{
            flex:1
        },{
            xtype: 'button',
            margin: 3,
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
})