Ext.define('GSmartApp.view.stockin.Stockin_M_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_M_Main',
    id:'Stockin_M_Main',
    controller: 'Stockin_M_Main_Controller',
    viewModel: {
        type: 'Stockin_M_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'center',
        xtype: 'Stockin_M_List'
    }],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})