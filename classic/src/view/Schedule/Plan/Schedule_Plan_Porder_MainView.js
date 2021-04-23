Ext.define('GSmartApp.view.Schedule.Plan.Schedule_Plan_Porder_MainView', {
    extend: 'Ext.tab.Panel',
    xtype: 'Schedule_Plan_Porder_MainView',
    id: 'Schedule_Plan_Porder_MainView',
    // layout: 'card',
    items: [
        {
            xtype: 'Schedule_plan_Main',
            title: 'Kế hoạch sản xuất'
        },
        {
            xtype: 'ProcessShippingMainView',
            title: 'Tiến độ giao hàng'
        }
    ]
})