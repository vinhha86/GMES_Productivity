Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Schedule_plan_ViewModel',
    data: {
        schedule: {
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 1),
            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()+6, 1),
            listid: '13,14'
        }
    }
})