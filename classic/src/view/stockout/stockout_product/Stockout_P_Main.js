Ext.define('GSmartApp.view.stockout.Stockout_P_Main', {
    extend: 'Ext.container.Container',
    xtype: 'stockout_p_main',
    controller: 'Stockout_P_Controller',
    viewModel: {
        type: 'Stockout_P_EditModel'
    },
    requires: [
        'Ext.layout.container.Border'
    ],    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'stockout_p_list',
            margin: 1,
            region: 'center'
        }
    ],
    listeners: {
        activate: 'onActivate'
    }      
});
