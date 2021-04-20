Ext.define('GSmartApp.view.stockin.Stockin_M_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_M_Main',
    id:'Stockin_M_Main',
    controller: 'Stockin_M_Main_Controller',
    viewModel: {
        type: 'Stockin_M_ViewModel'
    },
    layout: 'border',
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'Stockin_M_List'
        },
        {
            region: 'south',
            margin: 1,
            height: '50%',
            xtype: 'Stockin_M_Main_D'
        },
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})