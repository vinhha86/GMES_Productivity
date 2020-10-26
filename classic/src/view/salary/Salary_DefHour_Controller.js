Ext.define('GSmartApp.view.salary.Salary_DefHour_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_DefHour_Controller',
    init: function () {
        var viewmodel = this.getViewModel();
        var SalTypeLevelStore = viewmodel.getStore('SalTypeLevelStore');
        SalTypeLevelStore.loadStore(1,0);
    },
    // control: {
    //     '#Salary_ListOrg_View': {
    //         itemclick: 'onloadDetail'
    //     }
    // }
    onPivotGroupExpand: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    },

    onPivotGroupCollapse: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" collapsed on ' : 'All groups collapsed on ') + type);
    },
    onAddSalType: function(){

    }
})