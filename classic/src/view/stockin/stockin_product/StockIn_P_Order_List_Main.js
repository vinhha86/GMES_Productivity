Ext.define('GSmartApp.view.stockin.StockIn_P_Order_List_Main', {
    extend: 'Ext.container.Container',
    xtype: 'StockIn_P_Order_List_Main',
    itemnId:'StockIn_P_Order_List_Main',
    layout: 'border',
    controller: 'StockIn_P_Order_List_Main_Controller',
    // viewModel: {
    //     type: 'Stockin_M_ViewModel'
    // },
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'StockIn_P_Order_List'
        },
        // {
        //     region: 'south',
        //     margin: 1,
        //     height: '50%',
        //     xtype: 'Stockin_Order_List_D'
        // },
    ],
})