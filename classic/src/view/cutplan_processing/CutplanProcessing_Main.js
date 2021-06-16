Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Main', {
    extend: 'Ext.container.Container',
    xtype: 'cutplan_processing',
    id:'cutplan_processing',
    reference: 'cutplan_processing',
    layout: 'border',
    controller: 'CutplanProcessing_Main_Controller',
    viewModel: {
        type: 'CutplanProcessing_Main_ViewModel'
    },
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'CutplanProcessing_List'
        },
        {
            region: 'south',
            margin: 1,
            height: '50%',
            xtype: 'CutplanProcessing_List_D'
        },
    ],
})