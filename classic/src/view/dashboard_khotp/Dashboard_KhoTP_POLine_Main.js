Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Dashboard_KhoTP_POLine_Main',
    id:'Dashboard_KhoTP_POLine_Main',
    layout: 'border',
    controller: 'Dashboard_KhoTP_POLine_Controller',
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'Dashboard_KhoTP_POLine_List'
        },
        {
            region: 'east',
            margin: 1,
            width: 400,
            xtype: 'Dashboard_KhoTP_POLine_D'
        },
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})