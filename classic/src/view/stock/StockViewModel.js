Ext.define('GSmartApp.view.stock.StockViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.StockViewModel',
    requires: [ 
        'GSmartApp.store.stock.StockTreeStore',
    ],
    stores: {
        StockTreeStore: {
            type: 'StockTreeStore'
        },
        // ListPhanXuongStore: {
        //     type: 'ListOrgStore'
        // },
        ListKhoRowStore: {
            type: 'ListOrgStore'
        },
        ListKhoSpaceStore: {
            type: 'ListOrgStore'
        },
        WarehouseStore: {
            type: 'WarehouseStore'
        },
    },
    data: {
        // id: 0,
        // parentid_link: null,
        // titleName: '',
        // currentRec:null,
        // phanxuong_orgid_link: null,
        //
        //

        record: null,
        isEdit: false,

        rowObj: {
            orgid_link: null,
            code: null,
        },
        
        spaceObj: {
            orgid_link: null,
            spaceepc: null,
            spaceepc_old: null,
            spacename: null,
            spacename_old: null,
            floorid: null,
            floorid_old: null,
            rowid_link: null,
            isCreateNew: false,
        },
        //
        // isRowViewHidden: true,
        // isSpaceViewHidden: true,
        // isFloorViewHidden: true,
        // isBtnLuuFloorDisabled: false,
        isTxtFieldSpaceNameDisable: false,
    },
    formulas: {

    }
})