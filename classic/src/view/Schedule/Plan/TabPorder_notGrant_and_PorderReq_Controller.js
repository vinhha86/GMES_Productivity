Ext.define('GSmartApp.view.Schedule.Plan.TabPorder_notGrant_and_PorderReq_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TabPorder_notGrant_and_PorderReq_Controller',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        var store_req = viewmodel.getStore('Porder_Req_Store');
        store.getSorters().add('productiondate');
        store_req.getSorters().add('po_Productiondate');
    },
    onSearchTap: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        var golive_from = viewmodel.get('schedule.startDate');
        var golive_to = viewmodel.get('schedule.endDate');
        store.loadFree_bygolivedate(golive_from, golive_to);
    },
    onSearchPorderReq: function () {
        var viewmodel = this.getViewModel();
        var store_req = viewmodel.getStore('Porder_Req_Store');
        store_req.load_byOrg();
    },
    onPOrderFilterKeyup: function () {
        var grid = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('porderFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.porderFilter = filters.add({
                id: 'porderFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter) {
            filters.remove(this.porderFilter);
            this.porderFilter = null;
        }
    },
    onUnGrantedPoBuyerFilterKeyup: function () {
        var grid = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('unGrantedPoBuyerFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.poBuyerFilterUnGranted = filters.add({
                id: 'ungrantedPoBuyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.poBuyerFilterUnGranted) {
            filters.remove(this.poBuyerFilterUnGranted);
            this.poBuyerFilterUnGranted = null;
        }
    },
    onUnGrantedBuyerCodeFilterKeyup: function () {
        var grid = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('unGrantedBuyerCodeFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.codeFilterUnGranted = filters.add({
                id: 'ungrantedBuyerCodeFilter',
                property: 'buyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilterUnGranted) {
            filters.remove(this.codeFilterUnGranted);
            this.codeFilterUnGranted = null;
        }
    },
    onCodeFilterKeyup: function () {
        var grid = Ext.getCmp('Porder_Req');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('codeFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'product_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onPoBuyerFilterKeyup: function () {
        var grid = Ext.getCmp('Porder_Req');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('poBuyerFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.pobuyerFilter = filters.add({
                id: 'pobuyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.pobuyerFilter) {
            filters.remove(this.pobuyerFilter);
            this.pobuyerFilter = null;
        }
    },
    onHiddenList: function () {
        var filter = Ext.getCmp('FilterBar').getController();
        filter.onGrantToOrgTap();
    },
    onHiddenListReq: function () {
        var filter = Ext.getCmp('FilterBar').getController();
        filter.onGrantToOrgTap();
    }
})