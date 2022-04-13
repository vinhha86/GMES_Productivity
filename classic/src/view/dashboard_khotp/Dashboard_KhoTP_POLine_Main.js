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
            margin: '0 1 0 1',
            xtype: 'Dashboard_KhoTP_POLine_List'
        },
        {
            region: 'east',
            margin: '0 1 0 1',
            width: 600,
            layout: 'border',
            items:[
                {
                    region: 'center',
                    border: true,
                    xtype: 'Dashboard_KhoTP_POLine_D'
                },
                {
                    region: 'south',
                    border: true,
                    height: '30%',
                    xtype: 'Dashboard_KhoTP_POLine_Orgs'
                }
            ],
            bind: {
                hidden: '{isDashboard_KhoTP_POLine_D_Hidden}'
            }
        }
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})