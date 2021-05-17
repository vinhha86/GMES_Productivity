Ext.define('GSmartApp.view.process_shipping.POLine.POLineViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POLineViewController',
    init: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var current = new Date();
        viewmodel.set('shipdate_to', new Date(current.getFullYear(), current.getMonth() + 3, current.getDate()));
        viewmodel.set('shipdate_from', new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));

        me.onReload();
    },
    control: {
        '#shipdate_to': {
            collapse: 'onReload'
        },
        '#shipdate_from': {
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
        var store = viewmodel.getStore('POLineStore');
        store.getby_shipping(viewmodel.get('shipdate_from'), viewmodel.get('shipdate_to'));
    },
    onHideView: function () {
        var grid = this.getView();
        var main = grid.up('#ProcessShippingMainView').up('#Schedule_Plan_Porder_MainView').getLayout();
        main.setActiveItem(0);
    },
    onSelect: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        var storeSKU = viewmodel.getStore('POLineSKU_Store');
        var pcontractid_link = record.get('pcontractid_link');
        var pcontractpoid_link = record.get('id');
        viewmodel.set('pcontract_poid_link', pcontractpoid_link);
        viewmodel.set('porderid_link', 0);

        storeSKU.loadStoreByPO(pcontractid_link, pcontractpoid_link);

        var storePOrder = viewmodel.getStore('POrder_ListStore');
        storePOrder.POrderPOLine_loadby_po(pcontractpoid_link);
    },
    onFilterMaSPKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POLineStore');
        var filterField = this.lookupReference('filterMaSP'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filterMaSP = filters.add({
                id: 'filterMaSP',
                property: 'productbuyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterMaSP) {
            filters.remove(this.filterMaSP);
            this.filterMaSP = null;
        }
    },
    onFilterPOKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POLineStore');
        var filterField = this.lookupReference('filterPO'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filterPO = filters.add({
                id: 'filterPO',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterPO) {
            filters.remove(this.filterPO);
            this.filterPO = null;
        }
    }
})