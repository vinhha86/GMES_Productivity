Ext.define('GSmartApp.view.stock.StockViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.StockViewModel',
    requires: [ 
        'GSmartApp.store.stock.StockTreeStore',
        'GSmartApp.store.warehouse.WarehouseStore'
    ],
    stores: {
        StockTreeStore: {
            type: 'StockTreeStore'
        },
        // ListPhanXuongStore: {
        //     type: 'ListOrgStore'
        // },
        // ListKhoRowStore: {
        //     type: 'ListOrgStore'
        // },
        // ListKhoSpaceStore: {
        //     type: 'ListOrgStore'
        // },
        WarehouseStore: {
            type: 'WarehouseStore'
        },
    },
    data: {
        searchObj: {
            maHang: null,
            maHangId: null,
            donHang: null
        },

        selectedNode: null,
    },
    formulas: {

    }
})