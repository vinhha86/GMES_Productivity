Ext.define('GSmartApp.view.pcontract.PContract_POrder_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_POrder_Main',
    id: 'PContract_POrder_Main',
    controller: 'PContract_POrderController',
    layout: 'border',
    items: [
        {
            region: 'west',
            border: true,
            xtype: 'PContract_POList',
            padding: 1,
            width: '33%',                   
        },
        {
            region: 'center',
            border: true,
            title: 'Lệnh sản xuất',
            xtype: 'PContract_POrder_Porders',
            padding: 1,
            width: '33%',       
        },
        {
            region: 'east',
            border: true,
            title: 'Chi tiết màu cỡ',
            xtype: 'PContract_POrder_PorderSKU',
            padding: 1,
            width: '33%',       
        }
    ]
})