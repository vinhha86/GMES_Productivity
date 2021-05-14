Ext.define('GSmartApp.view.stockin.Stockin_M_List_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_M_List_Main',
    id:'Stockin_M_List_Main',
    reference: 'Stockin_M_List_Main',
    layout: 'border',
    controller: 'Stockin_M_List_Main_Controller',
    viewModel: {
        type: 'Stockin_M_ViewModel'
    },
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
            xtype: 'Stockin_M_List_D'
        },
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})