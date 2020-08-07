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
        console.log(record.data);
        viewModel.set('currentRec', record.data);
        viewModel.set('id', record.data.id);
        viewModel.set('titleName', record.data.name);
        viewModel.set('parentid_link',record.data.parentid_link);
        //
        viewModel.set('code', record.data.code);
        viewModel.set('name', record.data.name);
        viewModel.set('city', record.data.city);
        viewModel.set('address', record.data.address);
        viewModel.set('contactperson', record.data.contactperson);
        viewModel.set('email', record.data.email);
        viewModel.set('phone', record.data.phone);
        viewModel.set('linecost', record.data.linecost);
        viewModel.set('orgtypeid_link', record.data.orgtypeid_link);
        viewModel.set('colorid_link', record.data.colorid_link);
        viewModel.set('status', record.data.status);
        //
        viewModel.set('fieldState', true);
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('MenuStore');
        storeMenu.loadStore();
        var storeColor = viewModel.getStore('ColorStore');
        storeColor.loadStore();
        var storeOrgType = viewModel.getStore('OrgTypeStore');
        storeOrgType.loadAllOrgType();
    }
})