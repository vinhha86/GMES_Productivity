Ext.define('GSmartApp.view.stock.StockViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.StockViewModel',
    requires: [ 
        'GSmartApp.store.stock.StockTreeStore',
        'GSmartApp.store.warehouse.WarehouseStore',
        'GSmartApp.store.Sku_AutoComplete'
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
		Sku_AutoComplete: {
			type :'Sku_AutoComplete'
		},
    },
    data: {
        searchObj: {
            maHang: null,
            maHangId: null,
            donHang: null
        },

        selectedNode: null,
        root: null,

        maHangFilter: null,
        donHangFilter: null,
    },
    formulas: {

    }
})