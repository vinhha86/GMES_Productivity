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
            // xtype: 'PlanPoderView',
            xtype: 'PContract_porder_gantt',
            id: 'panel_plan',
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
            // xtype: 'PlanPoderView',
            xtype: 'Porder_gantt_guess',
            id: 'panel_guessview',
            margin: 1,
            width: 500,
            region: 'east',
            hidden: true  
        },    
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                tooltip: 'Phân lệnh vào tổ chuyền',
                text: 'Phân chuyền',
                iconCls: 'x-fa fa-sliders',
                weight: 30,
                handler: 'onGrantToOrgTap',
            },
            {
                xtype: 'button',
                tooltip: 'Khung nhìn khách',
                text: 'Khung nhìn khách',
                iconCls: 'x-fa fa-sliders',
                weight: 30,
                handler: 'onGuessView',
            },
            // '->'
            // ,
            // {
            //     xtype: 'button',
            //     tooltip: 'Phóng to',
            //     // text: 'Zoom in',
            //     iconCls: 'x-fa fa-search-plus',
            //     weight: 30,
            //     handler: 'onZoomIn',
            // },
            // {
            //     xtype: 'button',
            //     tooltip: 'Thu nhỏ',
            //     // text: 'Zoom out',
            //     iconCls: 'x-fa fa-search-minus',
            //     weight: 30,
            //     handler: 'onZoomOut',
            // }
        ]
    }],
    // listeners: {
    //     afterlayout : 'refreshRollup'
    // }       
})