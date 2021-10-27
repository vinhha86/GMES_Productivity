Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_Main_View', {
    extend: 'Ext.panel.Panel',
    xtype: 'POrder_Grant_SKU_Plan_Main_View',
    itemId: 'POrder_Grant_SKU_Plan_Main_View',
    reference: 'POrder_Grant_SKU_Plan_Main_View',
    controller: 'POrder_Grant_SKU_Plan_Main_View_Controller',
    viewModel: {
        type: 'POrder_Grant_SKU_Plan_ViewModel'
    },
    layout: 'border',
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'POrder_Grant_SKU_Plan_View'
        },
        {
            region: 'south',
            border: true,
            margin: 1,
            height: '50%',
            xtype: 'POrder_Grant_SKU_Plan_Material_View'
        },
    ],
    dockedItems: [
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 1,
                    xtype:'button',
                    text:  'Thoát',
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoat'
                },
                {
                    margin: 1,
                    xtype:'button',
                    text:  'Cân đối',
                    iconCls: 'x-fa fa-refresh',
                    itemId: 'btnCanDoi'
                }
            ]
        }
    ],
})