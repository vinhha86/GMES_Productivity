Ext.define('GSmartApp.view.currency.CurrencyGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CurrencyGridViewController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#CurrencyGridView': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewmodel = this.getViewModel();
        viewmodel.set('currentRec', record.data);
        viewmodel.set('id', record.data.id);
        viewmodel.set('name', record.data.name);
    },
    onloadPage: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('CurrencyStore');
        store.loadStore();
    }
})