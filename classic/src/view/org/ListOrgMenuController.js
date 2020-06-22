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
        var viewModel = this.getViewModel();
        viewModel.set('currentRec', record.data);
        viewModel.set('id', record.data.id);
        viewModel.set('name', record.data.name);
        viewModel.set('parentid_link',record.data.parentid_link);
        viewModel.set('fieldState', true);
        // console.log(record.data);
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('MenuStore');
        storeMenu.loadStore();
        var storeColor = viewModel.getStore('ColorStore');
        storeColor.loadStore();
    }
})