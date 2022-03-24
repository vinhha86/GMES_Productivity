Ext.define('GSmartApp.view.stockin.Stockin_P_Poline_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_P_Poline_MainView',
    itemId: 'Stockin_P_Poline_MainView',
    layout: 'border',
    controller: 'Stockin_P_Poline_MainViewController',
    viewModel: {
        type: 'Stockin_P_Poline_MainViewModel'
    },
    items: [
        {
            region: 'west',
            // xtype: 'Stockout_order_pkl_View',
            border: true,
            margin: 1,
            width: '50%',
        },
        {
            region: 'center',
            // xtype: 'Stockout_order_warehouse_View',
            border: true,
            margin: 1,
            width: '50%',
        },
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})