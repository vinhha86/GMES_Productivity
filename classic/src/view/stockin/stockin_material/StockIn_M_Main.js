Ext.define('GSmartApp.view.stockin.Stockin_M_Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'Stockin_M_Main',
    id:'Stockin_M_Main',
    viewModel: {
        type: 'Stockin_M_ViewModel'
    },
    items: [
        {
            title: 'Phiếu nhập kho',
            xtype: 'Stockin_M_List_Main',
            margin: 1,
            // region: 'center'
        },
        {
            title: 'Yêu cầu nhập kho',
            xtype: 'Stockin_Order_List_Main',
            margin: 1,
        }, 
    ], 
})