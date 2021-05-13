Ext.define('GSmartApp.view.stockin.Stockin_Order_List_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_Order_List_Main',
    id:'Stockin_Order_List_Main',
    layout: 'border',
    controller: 'Stockin_Order_List_Main_Controller',
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'Stockin_Order_List'
        },
        {
            region: 'south',
            margin: 1,
            height: '50%',
            xtype: 'Stockin_Order_List_D'
        },
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})