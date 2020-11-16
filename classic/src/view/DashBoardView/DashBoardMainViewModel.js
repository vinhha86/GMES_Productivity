Ext.define('GSmartApp.view.DashBoardView.DashBoardMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DashBoardMainViewModel',
    requires: [
        'GSmartApp.store.BarChartOutputAmountStore',
        'GSmartApp.store.LineChartPackStockedAmountStore',
        'GSmartApp.store.BarChartNotInProductionStore'
    ],
    stores: {
        BarChartOutputAmountStore: {
            type: 'BarChartOutputAmountStore'
        },
        LineChartPackStockedAmountStore: {
            type: 'LineChartPackStockedAmountStore'
        },
        BarChartNotInProductionStore: {
            type: 'BarChartNotInProductionStore'
        },
    },
    data: {
    }
})