Ext.define('GSmartApp.view.DashBoardView.DashBoardMainView', {
    extend: 'Ext.container.Container',
    xtype: 'DashBoardMainView',
    id:'DashBoardMainView',
    reference: 'DashBoardMainView',
    controller: 'DashBoardMainViewController',
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
        items:[{
            xtype:'BarChartOutputAmount',
            border: true,
            margin: 1,
            height: '100%',
            flex: 2,
        },{
            border: true,
            margin: 1,
            height: '100%',
            flex: 1,
        }]
    },{
        region: 'center',
        border: false,
        height: '50%',
        // title: 'Cennter',
        // xtype: '',
        margin: 1,
        layout: 'hbox',
        items:[{
            border: true,
            margin: 1,
            height: '100%',
            flex: 1,
        },{
            border: true,
            margin: 1,
            height: '100%',
            flex: 1,
        },{
            border: true,
            margin: 1,
            height: '100%',
            flex: 1,
        }]
    }] 
})