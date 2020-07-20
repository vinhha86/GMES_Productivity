Ext.define('GSmartApp.view.pcontract.PContract_POrder_SizeColorPickup_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_POrder_SizeColorPickup_Main',
    id: 'PContract_POrder_SizeColorPickup_Main',
    layout: 'border',
    controller: 'PContract_POrder_SizeColorPickup_Controller',
    // requires: ['Ext.ux.TreePicker'],
    viewModel: {
        type: 'PContract_POrder_SizeColorPickup_ViewModel'
    },
    items: [
        {
            region: 'center',
            layout: 'border',
            items:[
                {
                    region: 'west',
                    title: 'Danh sách sản phẩm',
                    width:'50%',
                    xtype: 'PContract_POrder_SizeColorPickup_Product',
                    border: true,
                    margin: 1,
                },
                {
                    region: 'center',
                    title: 'Danh sách cỡ',
                    xtype: 'PContract_POrder_SizeColorPickup_Size',
                    border: true,
                    margin: 1,
                },
                {
                    region: 'east',
                    title: 'Danh sách màu',
                    width:'25%',
                    xtype: 'PContract_POrder_SizeColorPickup_Color',
                    border: true,
                    margin: 1,
                },
            ]
        },
        {
            region: 'north',
            height: 30,
            xtype: 'panel',
            border: true,
            margin: 1,
            items:[
                {
                    xtype: 'checkboxfield',
                    boxLabel: 'Chọn hết các SKU còn lại',
                    flex: 1,
                    checked: false,
                    // listeners: {change:'onCheckStatusChange'}
                },
            ]      
        }
    ],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            flex:1
        },{
            xtype: 'button',
            text: 'Tạo lệnh SX',
            itemId: 'btnGenPOrder',
            iconCls: 'x-fa fa-magic',
            margin: 5
        },{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})