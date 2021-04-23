Ext.define('GSmartApp.view.Schedule.Plan.Schedule_Plan_Porder_MainView', {
    extend: 'Ext.panel.Panel',
    xtype: 'Schedule_Plan_Porder_MainView',
    id: 'Schedule_Plan_Porder_MainView',
    layout: 'card',
    items: [
        {
            xtype: 'Schedule_plan_Main'
        },
        {
            xtype: 'ProcessShippingMainView'
        }
    ]
})