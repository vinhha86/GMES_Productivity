Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_Info_Main',
    id: 'PContract_PO_Edit_Info_Main',
    layout: 'border',
    controller: 'PContract_PO_Edit_Info_Main_Controller',
    // requires: ['Ext.ux.TreePicker'],
    // viewModel: {
    //     type: 'PContract_PO_Edit_Info_Main_ViewModel'
    // },
    items: [
        {
            region: 'center',
            layout: 'border',
            items:[
                {
                    region: 'center',
                    xtype: 'PContract_PO_Edit_Info',
                    border: true,
                    margin: 1,
                },
                {
                    region: 'east',
                    width: 250,
                    xtype: 'PContract_PO_Edit_Porder_Req',
                    border: true,
                    margin: 1,
                }
            ]
        },
        // {
        //     region: 'south',
        //     height: 150,
        //     xtype: 'PContract_PO_Shipping_List',
        //     border: true,
        //     margin: 1,            
        // }
    ],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            flex:1
        },{
            xtype:'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})