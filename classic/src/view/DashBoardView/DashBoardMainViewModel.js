Ext.define('GSmartApp.view.DashBoardView.DashBoardMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DashBoardMainViewModel',
    requires: [
        'GSmartApp.store.DashBoardView.BarChartOutputAmountStore',
        'GSmartApp.store.DashBoardView.LineChartPackStockedAmountStore',
        'GSmartApp.store.DashBoardView.BarChartNotInProductionStore',
        'GSmartApp.store.DashBoardView.PieChartMarketTypeStore',
        'GSmartApp.store.DashBoardView.LineChartRegisterCodeCountStore',
        'GSmartApp.store.DashBoardView.POrderStatusChartStore',
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
        PieChartMarketTypeStore: {
            type: 'PieChartMarketTypeStore'
        },
        LineChartRegisterCodeCountStore: {
            type: 'LineChartRegisterCodeCountStore'
        },
        POrderStatusChartStore: {
            type: 'POrderStatusChartStore'
        },
    },
    data: {
    }
})