Ext.define('GSmartApp.view.DashboardMer.Dashboard_Mer_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Dashboard_Mer_ViewModel',
    requires: [
        // 'GSmartApp.store.DashBoardView.BarChartOutputAmountStore',
        // 'GSmartApp.store.DashBoardView.LineChartPackStockedAmountStore',
        // 'GSmartApp.store.DashBoardView.BarChartNotInProductionStore',
        // 'GSmartApp.store.DashBoardView.PieChartMarketTypeStore',
        // 'GSmartApp.store.DashBoardView.LineChartRegisterCodeCountStore',
        // 'GSmartApp.store.DashBoardView.POrderStatusChartStore',
        // 'GSmartApp.store.pcontract.PContractChartStore',
    ],
    stores: {
        EndBuyerStore: {
            type: 'ListOrgStore'
        },
        VendorStore: {
            type: 'ListOrgStore'
        },
        ProductShipDateChartStore: {
            type: 'ProductShipDateChartStore'
        },
        POrderStatusChartStore: {
            type: 'POrderStatusChartStore'
        },
    },
    data: {
        objSearch: {
            contract_code: null,
            product_code: null,
            po_code: null,
            buyer: null,
            vendor: null,
        }
    },
    formulas: {
        // title: function (data) {
        //     var title = new Object();
        //     title.title = new Object();
        //     if (data('type.type') == 0) {
        //         title.title.text = 'Số lượng sản phẩm chưa có định mức';
        //     }
        //     else if (data('type.type') == 1) {
        //         title.title.text = 'Chào giá chưa có PO Line';
        //     }
        //     else {
        //         title.title.text = 'PO Line chưa Maps';
        //     }
        //     return title;
        // }
    }
})