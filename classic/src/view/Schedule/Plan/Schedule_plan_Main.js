Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'Schedule_plan_Main',
    id: 'Schedule_plan_Main',
    layout: 'border',
    controller: 'Schedule_plan_Main_Controller',
    viewModel : {
        type: 'Schedule_plan_ViewModel'
    },
    items: [
        {
            xtype: 'FilterBar',
            region: 'north',
            height: 45,
            margin: 1
        },
        {
            xtype: 'Schedule_plan_View',
            region: 'center'
        },
        {
            // xtype: 'Schedule_plan_GuestView',
            // width: '50%',
            // region: 'east',
            // hidden: true  
        },
    ]
})