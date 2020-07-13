Ext.define('GSmartApp.view.Schedule.Plan.TabPorder_notGrant_and_PorderReq_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TabPorder_notGrant_and_PorderReq_Controller',
    init: function(){
       
       
    },
    onSearchTap: function() {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        var golive_from = viewmodel.get('schedule.startDate');
        var golive_to = viewmodel.get('schedule.endDate');
        store.loadFree_bygolivedate(golive_from,golive_to);
    },
    onPOrderFilterKeyup: function(){
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
    }
})