Ext.define('GSmartApp.view.stockin.StockIn_P_Main', {
    extend: 'Ext.container.Container',
    xtype: 'StockIn_P_Main',
    id:'StockIn_P_Main',
    controller: 'Stockin_P_List_ViewController',
    viewModel: {
        type: 'Stockin_P_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'center',
        xtype: 'StockIn_P_List'
    }],
    listeners: {
        activate: 'onActivate'
    }        
})