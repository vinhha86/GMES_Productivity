Ext.define('GSmartApp.view.personel.Personnel_ListOrg_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_ListOrg_ViewController',
    init: function () {
        this.onload();
    },
    control: {
        '#Personnel_ListOrg_View': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        
    },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('OrgStore');
        storeMenu.loadStore();

        storeMenu.getSorters().add('orgtypeid_link');
        storeMenu.getSorters().add('is_manufacturer');
        storeMenu.getSorters().add('id');
    }
})