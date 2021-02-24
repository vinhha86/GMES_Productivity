Ext.define('GSmartApp.view.warehouse.cut_plan.Cutplan_Warehouse_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'Cutplan_Warehouse_MainView',
    id: 'Cutplan_Warehouse_MainView',
    layout: 'border',
    controller: 'Cutplan_Warehouse_MainView_Controller',
    viewModel: {
        type: 'Cutplan_WareHouse_ViewModel'
    },
    items: [
        {
            region: 'west',
            xtype: 'Cutplan_WareHouse_View',
            border: true,
            margin: 1,
            bind: {
                width: '{width_npl}'
            }
        },
        {
            region: 'center',
            xtype: 'WareHouse_View',
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