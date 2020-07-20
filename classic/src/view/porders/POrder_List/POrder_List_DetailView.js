Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'POrder_List_DetailView',
    id: 'POrder_List_DetailView',
    controller: 'POrder_List_DetailViewController',
    viewModel: {
        type: 'POrder_List_DetailViewModel'
    },
    IdPOrder: 0,
    layout: 'border',
    height: 500,
    items: [
    {
        region: 'center',
        border: true,
        margin: 1,
        xtype: 'tabpanel',
        itemId:'tabmain',
        items: [{
            title: 'Thông tin lệnh',
            layout: 'border',
            items: [{
                region: 'north',
                height: 120,
                border: false,
                xtype: 'POrder_InfoView',
                margin: 1
            },{
                region: 'center',
                border: false,
                xtype: 'POrder_ProductSKUView',
                margin: 1
            }]
        }, {
            title: 'Phân chuyền',
            layout: 'border',
            flex: 1,
            items: [{
                region: 'west',
                width: '50%',
                border: false,
                xtype: 'POrder_List_GrantView',
                margin: 1
            },{
                region: 'center',
                width: '50%',
                border: false,
                xtype: 'POrder_List_GrantSKUView',
                margin: 1
            }]
        }]
    }],
    dockedItems: [{
        layout: 'hbox',
        reference: 'dockBottomBar',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Quay lại',
            margin: 1,
            itemId: 'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        }, {
            flex: 1,
            border: false
        // },
        // {
        //     xtype: 'button',
        //     text: 'Lưu',
        //     margin: 1,
        //     itemId: 'btnLuu',
        //     iconCls: 'x-fa fa-save',
        //     formBind: true
        }]
    }]
})