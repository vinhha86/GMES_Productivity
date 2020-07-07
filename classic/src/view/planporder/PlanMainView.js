Ext.define('GSmartApp.view.planporder.PlanMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'PlanMainView',
    layout: {
        type: 'border'
    },
    controller: 'PlanMain_Controller',
    viewModel: {
        type: 'PlanPoderView_ViewModel'
    },    
    items:[
        {
            xtype: 'Schedule_plan_Main',
            margin: 1,
            region: 'center'
        },
        {
            xtype: 'POrderUnGranted',
            id: 'panel_orderungranted',
            width: 500,
            region: 'east',
            hidden: true  
        },
        {
            xtype: 'Schedule_plan_GuestView',
            margin: 1,
            width: 500,
            region: 'east',
            hidden: true  
        },    
    ]
    // listeners: {
    //     afterlayout : 'refreshRollup'
    // }       
})