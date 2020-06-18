Ext.define('GSmartApp.view.org.ListOrgMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListOrgMenuController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#ListOrgMenu': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewmodel = this.getViewModel();
        viewmodel.set('currentRec', record.data);
        viewmodel.set('id', record.data.id);
        viewmodel.set('name', record.data.name);
        viewmodel.set('fieldState', true);
        // console.log(record.data);
    },
    onloadPage: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var storeMenu = viewmodel.getStore('MenuStore');
        storeMenu.loadStore();
        // var storeOrgType = viewmodel.getStore('OrgTypeStore');
        // storeOrgType.loadAllOrgType();
        var storeColor = viewmodel.getStore('ColorStore');
        storeColor.loadStore();

        // disable checkbox
        var viewMain = Ext.getCmp('ListOrgMenu');
        console.log('under here');
        console.log(viewMain);
    }
})