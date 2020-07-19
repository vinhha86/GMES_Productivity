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
                    region: 'east',
                    title: 'Danh sách cỡ',
                    width:'50%',
                    xtype: 'PContract_POrder_SizeColorPickup_Size',
                    border: true,
                    margin: 1,
                },
                {
                    region: 'center',
                    title: 'Danh sách màu',
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
                    label: 'Chọn hết các SKU còn lại',
                    checked: false
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
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})