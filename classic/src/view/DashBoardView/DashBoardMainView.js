Ext.define('GSmartApp.view.DashBoardView.DashBoardMainView', {
    extend: 'Ext.container.Container',
    xtype: 'DashBoardMainView',
    id:'DashBoardMainView',
    reference: 'DashBoardMainView',
    controller: 'DashBoardMainViewController',
    requires: [ 'Ext.chart.*' ],
    viewModel: {
        type: 'DashBoardMainViewModel'
    },
    layout: 'border',
    items: [{
        region: 'north',
        border: false,
        height: '50%',
        // title: 'Top',
        // xtype: '',
        margin: 1,
        layout: 'hbox',
        items:[
            {
                xtype:'POrderStatusChart',
                border: true,
                margin: 1,
                height: '100%',
                flex: 2,
            },
            // {
            //     xtype:'BarChartOutputAmount',
            //     border: true,
            //     margin: 1,
            //     height: '100%',
            //     flex: 2,
            // },
            {
                xtype: 'PieChartMarketType',
                border: true,
                margin: 1,
                height: '100%',
                flex: 1,
            }
        ]
    },{
        region: 'center',
        border: false,
        height: '50%',
        // title: 'Cennter',
        // xtype: '',
        margin: 1,
        layout: 'hbox',
        items:[{
            xtype: 'BarChartNotInProduction',
            border: true,
            margin: 1,
            height: '100%',
            flex: 1,
        },{
            xtype:'LineChartPackStockedAmount',
            border: true,
            margin: 1,
            height: '100%',
            flex: 1,
        },{
            xtype: 'LineChartRegisterCodeCount',
            border: true,
            margin: 1,
            height: '100%',
            flex: 1,
        }]
    }] 
})