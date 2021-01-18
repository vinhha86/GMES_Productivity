Ext.define('GSmartApp.view.cut_plan.CutPlan_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'CutPlan_MainView',
    id: 'CutPlan_MainView',
    layout: 'border',
    controller: 'CutPlan_MainView_Controller',
    viewModel: {
        type: 'CutPlan_Main_ViewModel'
    },
    items: [
        {
            region: 'north',
            xtype: 'POrder_InfoView',
            id: 'POrder_InfoView_cutplan',
            border: true,
            margin: 1
        },
        {
            region: 'center',
            xtype: 'CutPlan_Detail_MainView',
            border: true,
            margin: 1
        },
    ],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        },{
            xtype:'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        }]
    }]
})