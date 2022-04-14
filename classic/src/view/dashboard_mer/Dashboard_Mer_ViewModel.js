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
        // combo search (toolbar)
        EndBuyerStore: {
            type: 'ListOrgStore'
        },
        VendorStore: {
            type: 'ListOrgStore'
        },
        // biểu đồ theo dõi mã hàng (pos1)
        ProductShipDateChartStore: {
            type: 'ProductShipDateChartStore'
        },
        // ds poline (pos2) -> dùng view sẵn có viewModel riêng 
        // Dashboard_KhoTP_POLine_Main -> Dashboard_KhoTP_POLine_ViewModel

        // bảng cân đối npl (pos3)
        SKUBalanceStore: {
            type: 'SKUBalanceStore'
        },

        // ds màu cỡ poline (pos4), ds san pham cua po (combo)
        PContractSKUStore: { // danh sach sku
            type: 'PContractSKUStore'
        },
        PContractProduct_PO_Store: { // combo san pham
            type: 'PContractProductStore'
        },

        // biểu đồ tiến độ sx (pos5)
        DashboardMer_ProgressStore: {
            type: 'DashboardMer_ProgressStore'
        }
    },
    data: {
        objSearch: {
            contract_code: null,
            product_code: null,
            po_code: null,
            buyer: null,
            vendor: null,
        },
        selectedPoline: null,
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