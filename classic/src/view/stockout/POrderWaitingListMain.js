Ext.define('GSmartApp.view.stockout.POrderWaitingListMain', {
    extend: 'Ext.container.Container',
    xtype: 'porderwaitinglistmain',
    controller: 'porderwaitinglist',
    requires: [
        'Ext.layout.container.Border'
    ],    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'porderwaitinglist',
            id: 'panel_porderwaitinglist',
            margin: 1,
            region: 'center'
        },
        {
            xtype: 'pordergranted',
            id: 'panel_ordergranted',
            width: 350,
            region: 'east',
            hidden: true  
        }
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }      
});
