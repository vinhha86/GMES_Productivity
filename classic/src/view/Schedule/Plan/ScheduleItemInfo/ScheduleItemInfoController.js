Ext.define('GSmartApp.view.Schedule.Plan.ScheduleItemInfo.ScheduleItemInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScheduleItemInfoController',
    init: function () {
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        viewModel.set('record', eventRecord.data);
        var record = viewModel.get('record');
    },
    control: {

    },
})