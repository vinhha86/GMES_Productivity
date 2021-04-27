Ext.define('GSmartApp.view.process_shipping.POLine.POLineViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POLineViewController',
    init: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var current = new Date();
        viewmodel.set('shipdate_to', new Date(current.getFullYear(), current.getMonth() + 3, current.getDate()));

        me.onReload();
    },
    control: {
        '#shipdate': {
            collapse: 'onReload'
        },
        '#hideView': {
            click: 'onHideView'
        },
        '#POLineView': {
            itemclick: 'onSelect'
        }
    },
    onReload: function () {
        var viewmodel = this.getViewModel();
        var current = new Date();
        var store = viewmodel.getStore('POLineStore');
        store.getby_shipping(current, viewmodel.get('shipdate_to'));
    },
    onHideView: function () {
        var grid = this.getView();
        var main = grid.up('#ProcessShippingMainView').up('#Schedule_Plan_Porder_MainView').getLayout();
        main.setActiveItem(0);
    },
    onSelect: function (grid, record, item, index, e, eOpts) {
        console.log(record);
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POLineSKU_Store');
        var pcontractid_link = record.get('pcontractid_link');
        var pcontractpoid_link = record.get('id');
        console.log(pcontractpoid_link);
        store.loadStoreByPO(pcontractid_link, pcontractpoid_link);
    }
})