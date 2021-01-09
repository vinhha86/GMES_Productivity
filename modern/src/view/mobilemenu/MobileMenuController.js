Ext.define('GSmartApp.view.mobilemenu.MobileMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MobileMenuController',
    init: function() {
        var viewModel = this.getViewModel();
        var MobileMenu = viewModel.getStore('MobileMenu');
        MobileMenu.getSorters().add('index');
        MobileMenu.loadStore();

    },
    control: {
        '#MobileMenuDataview': {
            itemtap: 'onItemTap'
        },
    },
    
    onItemTap: function( dataview, index, target, record, e, eOpts ) {
        console.log(record);
        // this.redirectTo("lsporderprocessing");
        // this.redirectTo("handover_cut_toline");
        var viewId = record.get('id');
        if(viewId != null){
            this.redirectTo(viewId);
        }
    }
});
