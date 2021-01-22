Ext.define('GSmartApp.view.stockin.StockIn_M_Main', {
    extend: 'Ext.container.Container',
    xtype: 'StockIn_M_Main',
    id:'StockIn_M_Main',
    // controller: 'Stockin_P_List_ViewController',
    viewModel: {
        type: 'Stockin_M_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'center',
        xtype: 'StockIn_M_List'
    }],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})