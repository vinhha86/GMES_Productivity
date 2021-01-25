Ext.define('GSmartApp.view.stockout.Stockout_M_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_M_Main',
    controller: 'Stockout_M_Controller',
    viewModel: {
        type: 'Stockout_M_EditModel'
    },
    requires: [
        'Ext.layout.container.Border'
    ],    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'Stockout_M_List',
            margin: 1,
            region: 'center'
        }
    ],
    listeners: {
        activate: 'onActivate'
    }      
});
