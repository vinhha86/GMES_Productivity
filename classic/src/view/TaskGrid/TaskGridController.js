Ext.define('GSmartApp.view.TaskGrid.TaskGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskGridController',
    control: {
        // '#btnAddTask': {
        //     click: 'onAddTask'
        // },
        '#btnRefresh' : {
            click: 'onRefresh'
        },
        '#cmbtype' : {
            select: 'onSelectType'
        }
    },
    init: function(){
        var viewmodel = this.getViewModel();
        var TaskBoard_Store = viewmodel.getStore('TaskBoard_Store');
        TaskBoard_Store.loadStore();
        var typeStore = viewmodel.getStore('TaskTypeStore');
        typeStore.loadStore();
    },
    onRefresh: function(){
        var viewmodel = this.getViewModel();
        var TaskBoard_Store = viewmodel.getStore('TaskBoard_Store');
        TaskBoard_Store.load();
    },
    onSelectType: function(combo, record){
        var viewmodel = this.getViewModel();
        var tasktypeid_link = record.get('id');
        var TaskBoard_Store = viewmodel.getStore('TaskBoard_Store');
        // TaskBoard_Store.clearFilter();
        filters = TaskBoard_Store.getFilters();
        if (tasktypeid_link > -10) {
            this.tasktypeFilter = filters.add({
                id: 'tasktypeFilter',
                property: 'tasktypeid_link',
                value: tasktypeid_link,
                operator: '='
            });
        }
        else if (this.tasktypeFilter) {
            filters.remove(this.tasktypeFilter);
            this.tasktypeFilter = null;
        }
    },
    onNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('nameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    onDescriptionFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('descriptionFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.descriptionFilter = filters.add({
                id: 'descriptionFilter',
                property: 'description',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.descriptionFilter) {
            filters.remove(this.descriptionFilter);
            this.descriptionFilter = null;
        }
    },
    onUserInChargeNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('userInChargeNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.userInChargeNameFilter = filters.add({
                id: 'userInChargeNameFilter',
                property: 'UserInChargeName',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.userInChargeNameFilter) {
            filters.remove(this.userInChargeNameFilter);
            this.userInChargeNameFilter = null;
        }
    }
})