Ext.define('GSmartApp.view.stockout.Stockout_M_Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'Stockout_M_Main',
    controller: 'Stockout_M_Controller',
    viewModel: {
        type: 'Stockout_M_EditModel'
    },
    // requires: [
    //     'Ext.layout.container.Border'
    // ],    
    // layout: {
    //     type: 'border'
    // },
    
    items: [
        {
            title: 'Lệnh xuất kho',
            xtype: 'Stockout_M_List',
            margin: 1,
            // region: 'center'
        },
        {
            title: 'Yêu cầu xuất kho',
            xtype: 'Stockout_Order',
            margin: 1,
        }, 
    ],
    listeners: {
        activate: 'onActivate'
    }      
});
