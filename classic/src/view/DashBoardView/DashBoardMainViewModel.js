Ext.define('GSmartApp.view.DashBoardView.DashBoardMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DashBoardMainViewModel',
    requires: [
        'GSmartApp.store.BarChartOutputAmountStore'
    ],
    stores: {
        BarChartOutputAmountStore: {
            type: 'BarChartOutputAmountStore'
        }
    },
    data: {
    }
})