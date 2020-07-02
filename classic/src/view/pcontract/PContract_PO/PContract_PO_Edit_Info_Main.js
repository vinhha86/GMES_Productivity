Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_Info_Main',
    id: 'PContract_PO_Edit_Info_Main',
    layout: 'border',
    controller: 'PContract_PO_Edit_Info_Main_Controller',
    // requires: ['Ext.ux.TreePicker'],
    viewModel: {
        type: 'PContract_PO_Edit_Info_Main_ViewModel'
    },
    items: [
        {
            region: 'center',
            xtype: 'PContract_PO_Edit_Info',
            border: true,
            margin: 1,
        },
    ],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            flex:1
        },{
            xtype:'button',
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