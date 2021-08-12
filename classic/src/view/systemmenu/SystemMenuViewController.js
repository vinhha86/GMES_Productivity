Ext.define('GSmartApp.view.systemmenu.SystemMenuViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SystemMenuViewController',
    init: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('MenuStore');
        store.loadStore_byrole(0);
    },
    control: {
    }
})