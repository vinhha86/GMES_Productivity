Ext.define('GSmartApp.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',
    id: 'app-main',
    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="resources/images/icons/i8-factory.png">G-MES</div>',
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                '->',
                /*{
                    xtype: 'segmentedbutton',
                    margin: '0 16 0 0',

                    platformConfig: {
                        ie9m: {
                            hidden: true
                        }
                    },

                    items: [{
                        iconCls: 'x-fa fa-desktop',
                        pressed: true
                    }, {
                        iconCls: 'x-fa fa-tablet',
                        handler: 'onSwitchToModern',
                        tooltip: 'Switch to modern toolkit'
                    }]
                },*/
                // {
                //     iconCls:'x-fa fa-search',
                //     ui: 'header',
                //     href: '#searchresults',
                //     hrefTarget: '_self',
                //     tooltip: 'See latest search'
                // },
                // {
                //     iconCls:'x-fa fa-envelope',
                //     ui: 'header',
                //     tooltip: 'Check your email',
				// 	handler: 'onTest'
                // },
                // {
                //     iconCls:'x-fa fa-th-large',
                //     ui: 'header',
                //     tooltip: 'See your profile',
				// 	handler: 'onTest1'
                // },
                {
                    iconCls:'x-fa fa fa-window-maximize',
                    //cls       : 'icon-fullscreen',
                    ui: 'header',
                    tooltip: 'FullScreen',
                    handler: 'onFullScreen'
                },
                {
                    iconCls:'x-fa fa fa-power-off',
                    ui: 'header',
                    tooltip: 'Logout',
                    handler: 'onLogout'
                },
                {
                    xtype: 'tbtext',
                    reference: 'tbname',
                    itemId: 'tbname',
                    text: 'Goff Smith',
                    cls: 'top-user-name'
                },
                {
                    xtype: 'image',
                    itemId: 'tbavatar',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt:'current user image',
                    src: 'resources/images/user-profile/2.png'
                }
            ]
        },
        {
            reference: 'mainContainerWrap',
            layout: 'border',
            border: false,
            height: Ext.Element.getViewportHeight() - 64,
            animatePolicy: {
                x: true,
                width: true
            },
            items: [
                {
                    region: 'west',
                    split: true,
                    reference: 'westContainer',
                    scrollable: 'y',
                    width: 250,
                    items: [{
                        xtype: 'treelist',
                        height: '100%',
                        reference: 'navigationTreeList',
                        itemId: 'navigationTreeList',
                        ui: 'navigation',
                        store: 'NavigationTree',
                        expanderFirst: false,
                        expanderOnly: false,
                        // listeners: {
                        //     selectionchange: 'onNavigationTreeSelectionChange'
                        // }
                    }]
                },
                {
                    xtype: 'container',
                    region: 'center',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
