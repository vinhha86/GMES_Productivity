Ext.define('GSmartApp.view.main.Toolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'maintoolbar',

    requires: [
        'Ext.SegmentedButton'
    ],

    items: [
        {
            // This component is moved to the floating nav container by the phone profile
            xtype: 'component',
            reference: 'logo',
            userCls: 'main-logo',
            html: 'Sencha',
            hidden: true
        },
        {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-bars',
            margin: '0 0 0 10',
            listeners: {
                tap: 'onToggleNavigationSize'
            },
            hidden: true
        },
        {
            xtype: 'button',
            reference: 'backbutton',
            ui: 'header',
            iconCls: 'x-fa fa-arrow-left',
            margin: '0 0 0 10',
            handler: function () {
                Ext.fireEvent('navigationback');
            },
            // hidden: true
        },
        '->',
        {
            xtype: 'segmentedbutton',
            margin: '0 16 0 0',
            //defaultUI: 'header',

            platformConfig: {
                phone: {
                    hidden: true
                }
            },

            items: [{
                iconCls: 'x-fa fa-desktop',
                handler: 'onSwitchToClassic'
            }, {
                iconCls: 'x-fa fa-tablet',
                pressed: true
            }]
        },
        {
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-search',
            href: '#searchresults',
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        },
        {
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-envelope',
            href: '#email',
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        },
        /*{
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-question',
            href: '#faq',
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        },*/
        {
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-th-large',
            href: '#dashboard',
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        },
        {
            iconCls:'x-fa fa fa-power-off',
            ui: 'header',
            margin: '0 7 0 0',
            handler: 'onLogout'
        },
        {
            xtype: 'component',
            html: 'Goff Smith',
            margin: '0 12 0 4',
            userCls: 'main-user-name'
        },
        {
            xtype: 'image',
            userCls: 'main-user-image small-image circular',
            alt: 'Current user image',
            src: 'resources/images/user-profile/2.png'
        }
    ]
});
