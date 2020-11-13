Ext.define('GSmartApp.view.timesheetshifttype.TimesheetShiftTypeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimesheetShiftTypeViewModel',
    requires: [
        'GSmartApp.store.timesheetshifttype.TimesheetShiftTypeStore',
    ],
    stores: {
        TimesheetShiftTypeStore: {
            type: 'TimesheetShiftTypeStore'
        },
    },
    data:{
        // id: null,
        // name: null,
        // timefrom: null,
        // timeto: null,
        // checkboxfrom: -1,
        // checkboxto: -1
    }
})