Ext.define('GSmartApp.view.salary.Salary_DefHour_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_DefHour_Controller',
    init: function () {
        var viewmodel = this.getViewModel();
        var SalTypeLevel_DefHourStore = viewmodel.getStore('SalTypeLevel_DefHourStore');
        SalTypeLevel_DefHourStore.loadStore(1,0);
    },
    control: {
        '#btnLuu_SalDefHour': {
            click: 'onSaveSal_DefHour'
        }
    },
    onPivotGroupExpand: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    },

    onPivotGroupCollapse: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" collapsed on ' : 'All groups collapsed on ') + type);
    },
    onAddSalType: function(){

    },
    onAddSalLabor: function(){

    },
    onSalTypeLevel_Edit:function(editor, context, eOpts ){
        console.log(context);
    },
    onSaveSal_DefHour: function(){
        var viewmodel = this.getViewModel();
        var SalTypeLevel_DefHourStore = viewmodel.getStore('SalTypeLevel_DefHourStore');
        console.log(SalTypeLevel_DefHourStore);
    }
})