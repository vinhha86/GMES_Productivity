Ext.define('GSmartApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        },
        global: {
            navigationback: 'onNavigationBack'
        }
    },

    routes: {
        ':node': 'onRouteChange',
        ':node/:id(/:args)?':'onRouteDataChange'
    },

    config: {
        showNavigation: true
    },

    collapsedCls: 'main-nav-collapsed',

    // comment here
    // init: function (view) {
    //     var me = this,
    //         refs = me.getReferences();
    //     //console.log(view);
    //     me.callParent([ view ]);

    //     me.nav = refs.navigation;
    //     me.navigationTree = refs.navigationTree;

    //     if(''==window.location.hash) {
    //         this.redirectTo('lsporderprocessing');
    //         // this.redirectTo('mobilemenu');
    //     } else {
    //         var hash = window.location.hash.substring(1);
    //         console.log(' hash view: ', hash);
    //         var listhast = hash.split('/');
    //         if(listhast.length> 1)
    //         this.onRouteDataChange(listhast[0],listhast[1],listhast[2]);
    //         else
    //         this.onRouteChange(hash);
    //     }
    // },

    beforeRender: function() {
        //var tbname = this.lookup('tbname');
        //tbname.text = config.getFname();
        //console.log('beforeRender - location hash: ', window.location.hash);
        var hash = window.location.hash.substring(1);
        console.log(' hash view: ', hash);
        this.setCurrentView(hash);
    },
    onNavigationItemClick: function () {
        // The phone profile's controller uses this event to slide out the navigation
        // tree. We don't need to do anything but must be present since we always have
        // the listener on the view...
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },

    // // comment here
    // onRouteChange:function(id){
    //     console.log('onRouteChange:' + id);
    //     var me = this,
    //     refs = me.getReferences();
    //     backbutton = refs.backbutton;
    //     backbutton.setHidden(true);
    //     this.setCurrentView(id);
    // },
    // // comment here
	// onRouteDataChange(hashTag,id,args){
	// 	args = Ext.Array.clean((args || '').split('/'));
	// 	hashTag = (hashTag || '').toLowerCase();
	// 	var session= GSmartApp.util.State.get('session');
	// 	if(!session){
	// 		 this.redirectTo("login");
	// 	}
    //     var me = this,
    //         refs = me.getReferences(),
    //         mainCard = refs.mainCardPanel,
    //         mainLayout = mainCard.getLayout(),
    //         navigationList = refs.navigationTreeList,
    //         store = navigationList.getStore(),
    //         node = store.findNode('routeId', hashTag) || store.findNode('viewType', hashTag);

    //     var xtype_edit = (node && node.get('xtype_edit')) || 'page404';

    //     backbutton = refs.backbutton;
    //     backbutton.setHidden(false);

    //     // if (mainLayout.getActiveItem() && mainLayout.getActiveItem().xtype == xtype_edit){
    //     //     mainLayout.getActiveItem().destroy();
    //     // }

    //     if (mainCard.getActiveItem()){
    //         mainCard.getActiveItem().destroy();
    //     }
    //     if (args == 'edit'){
    //         item = mainCard.add({
    //             xtype: xtype_edit,
    //             routeId: xtype_edit
    //         });
    //         mainCard.setActiveItem(item);
    //         me.fireEvent('loaddata', id,node);
    //     } else {
    //         item = mainCard.add({
    //             xtype: xtype_edit,
    //             routeId: xtype_edit
    //         });
    //         mainCard.setActiveItem(item);
    //         me.fireEvent('newdata', node);
    //     }
	// },

    onSwitchToClassic: function () {
        Ext.Msg.confirm('Switch to Classic', 'Are you sure you want to switch toolkits?',
                        this.onSwitchToClassicConfirmed, this);
    },

    onSwitchToClassicConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = location.search;

            // Strip "?modern" or "&modern" with optionally more "&foo" tokens following
            // and ensure we don't start with "?".
            s = s.replace(/(^\?|&)modern($|&)/, '').replace(/^\?/, '');

            // Add "?classic&" before the remaining tokens and strip & if there are none.
            location.search = ('?classic&' + s).replace(/&$/, '');
        }
    },

    onToggleNavigationSize: function () {
        this.setShowNavigation(!this.getShowNavigation());
    },

    // // comment here
    // setCurrentView: function (hashTag) {
    //     console.log('setCurrentView:' + hashTag);
    //     hashTag = (hashTag || '').toLowerCase();

    //     if(''==hashTag){
    //         hashTag = 'dashboard';
    //     }

    //     var me = this,
    //         refs = me.getReferences(),
    //         mainCard = refs.mainCardPanel,
    //         navigationTree = refs.navigationTreeList,
    //         store = navigationTree.getStore(),
    //         node = store.findNode('routeId', hashTag) ||
    //                store.findNode('viewType', hashTag),
    //         item = mainCard.child('component[routeId=' + hashTag + ']');

    //     console.log(store);
    //     console.log(node);
    //     console.log(item);

    //     if (!item) {
    //         item = mainCard.add({
    //             xtype: node.get('viewType'),
    //             routeId: hashTag
    //         });
    //     }

    //     mainCard.setActiveItem(item);

    //     navigationTree.setSelection(node);

    //     //if (newView.isFocusable(true)) {
    //     //    newView.focus();
    //     //}
    // },

    updateShowNavigation: function (showNavigation, oldValue) {
        // Ignore the first update since our initial state is managed specially. This
        // logic depends on view state that must be fully setup before we can toggle
        // things.
        //
        if (oldValue !== undefined) {
            var me = this,
                cls = me.collapsedCls,
                refs = me.getReferences(),
                logo = refs.logo,
                navigation = me.nav,
                navigationTree = refs.navigationTree,
                rootEl = navigationTree.rootItem.el;

            navigation.toggleCls(cls);
            logo.toggleCls(cls);

            if (showNavigation) {
                // Restore the text and other decorations before we expand so that they
                // will be revealed properly. The forced width is still in force from
                // the collapse so the items won't wrap.
                navigationTree.setMicro(false);
            } else {
                // Ensure the right-side decorations (they get munged by the animation)
                // get clipped by propping up the width of the tree's root item while we
                // are collapsed.
                rootEl.setWidth(rootEl.getWidth());
            }

            logo.element.on({
                transitionend: function () {
                    if (showNavigation) {
                        // after expanding, we should remove the forced width
                        rootEl.setWidth('');
                    } else {
                        navigationTree.setMicro(true);
                    }
                },
                single: true
            });
        }
    },

    toolbarButtonClick: function(btn){
        var href = btn.config.href;
        this.redirectTo(href);
    },
    closeSession: function(){
        config.setToken(null);
        GSmartApp.util.State.set('session', null);

        if (Ext.os.deviceType === 'Phone' || Ext.os.deviceType === 'Tablet') {
            //Ext.getCmp('app-main').destroy();
            //Ext.create('GSmartApp.view.login.Login', { fullscreen: true });
            this.redirectTo('');
            window.location.reload();
        } else {
            this.getView().destroy();
            Ext.create({
                xtype: 'xlogin'
            });
        }
    },
    onLogout:function(){
        var self = this;
        GSmartApp.model.Session.logout()
            .then(function(session) {
                self.closeSession();
            })
            .catch(function(errors) {
                console.log('Error on user logout', errors);
                self.closeSession();
            });
    },
    onNavigationBack: function() {
        console.log('navigation back');
        Ext.util.History.back();
    },
    
    //// new menu

    init: function (view) {
        var me = this,
            refs = me.getReferences();
        //console.log(view);
        me.callParent([ view ]);

        me.nav = refs.navigation;
        me.navigationTree = refs.navigationTree;

        var mainCardPanel = refs.mainCardPanel;
        mainCardPanel.push({
            xtype: 'MobileMenu',
            routeId: 'mobilemenu'
        });

        if(''==window.location.hash) {
            // this.redirectTo('lsporderprocessing');
            // this.redirectTo('mobilemenu');
        } else {
            var hash = window.location.hash.substring(1);
            console.log(' hash view: ', hash);
            var listhast = hash.split('/');
            if(listhast.length> 1)
            this.onRouteDataChange(listhast[0],listhast[1],listhast[2]);
            else
            this.onRouteChange(hash);
        }
    },
    
    onRouteChange:function(id){
        console.log('onRouteChange:' + id);
        var me = this,
        refs = me.getReferences();
        // backbutton = refs.backbutton;
        // backbutton.setHidden(true);
        this.setCurrentView(id);
    },

	onRouteDataChange(hashTag,id,args){
        console.log('onRouteDataChange: ' + hashTag + ' ' + id + ' ' + args);

		args = Ext.Array.clean((args || '').split('/'));
		hashTag = (hashTag || '').toLowerCase();
		var session= GSmartApp.util.State.get('session');
		if(!session){
			 this.redirectTo("login");
		}
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout();

        var activeItem = mainCard.getActiveItem();
        var mobileMenu = mainCard.child('component[routeId=' + 'mobilemenu' + ']');
        var mobileMenuStore = mobileMenu.getViewModel().getStore('MobileMenu');
        var record = mobileMenuStore.findRecord('id', hashTag);
        var xtype_edit = '';
        if(record){
            xtype_edit = record.get('edit');
        }

        if(activeItem){
            mainCard.pop();
        }

        var item = mainCard.child('component[routeId=' + xtype_edit + ']');
        if (!item) {
            item = mainCard.push({
                xtype: xtype_edit,
                // xtype: 'handover_cut_toline_edit',
                routeId: xtype_edit
            });
            me.fireEvent('loaddata', id);
        }
    },
    
    setCurrentView: function (hashTag) {
        console.log('setCurrentView:' + hashTag);
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel;
            item = mainCard.child('component[routeId=' + hashTag + ']');

        
        var activeItem = mainCard.getActiveItem();
        var mobileMenu = mainCard.child('component[routeId=' + 'mobilemenu' + ']');
        var mobileMenuStore = mobileMenu.getViewModel().getStore('MobileMenu');
        var record = mobileMenuStore.findRecord('id', hashTag);
        var xtype = '';
        if(record){
            xtype = record.get('xtype');
        }

        if(hashTag == null || hashTag == ''){
            // neu chuyen ve menu, pop view hien tai
            if(activeItem){
                mainCard.pop();
            }

        }else{
            // neu chuyen sang view khac
            // check xem view hien tai co phai la menu hay khong, neu la menu thi ko pop, con khong thi pop
            if(activeItem){
                if(activeItem.xtype != 'MobileMenu'){
                    mainCard.pop();
                }else{
                }
                if (!item) {
                    item = mainCard.push({
                        xtype: xtype,
                        routeId: hashTag
                    });
                }
            }
        }

        activeItem = mainCard.getActiveItem();
        if(activeItem.xtype == 'MobileMenu'){
            Ext.getCmp('maintoolbar').setHidden(false);
        }else{
            Ext.getCmp('maintoolbar').setHidden(true);
        }
    },
});
