Ext.define('GSmartApp.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',
    requires: [
        'Ext.Button',
        'Ext.list.Tree',
        'Ext.navigation.View'
    ],

    controller: 'main',
    platformConfig: {
        phone: {
            controller: 'phone-main'
        }
    },

    layout: 'hbox',

    items: [
        {
            xtype: 'maintoolbar',
            id: 'maintoolbar',
            docked: 'top',
            userCls: 'main-toolbar shadow'
        },
        {
            xtype: 'container',
            userCls: 'main-nav-container',
            reference: 'navigation',
            scrollable: true,
            hidden: true,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        itemclick: 'onNavigationItemClick',
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
            ]
        },
        {
            xtype: 'navigationview',
            flex: 1,
            reference: 'mainCardPanel',
            userCls: 'main-container',
            navigationBar: false,
            // hidden: true,
        },
    ]
});
