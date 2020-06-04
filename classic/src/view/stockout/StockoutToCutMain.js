Ext.define('GSmartApp.view.stockout.StockoutToCutMain', {
    extend: 'Ext.container.Container',
    xtype: 'stockouttocutmain',
    controller: 'stockouttocut',
    requires: [
        'Ext.layout.container.Border'
    ],    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'stockoutlist',
            id: 'panel_stockoutlist',
            margin: 1,
            region: 'center'
        },
        {
            xtype: 'stockouttocutorderwaiting',
            id: 'panel_orderwaiting',
            width: 260,
            region: 'east',
            hidden: true  
        }
    ],
    listeners: {
        activate: 'onActivate'
    }      
});
