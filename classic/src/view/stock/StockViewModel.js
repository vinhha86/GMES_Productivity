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
        ListKhoRowStore: {
            type: 'ListOrgStore'
        },
        ListKhoSpaceStore: {
            type: 'ListOrgStore'
        },
    },
    data: {
        id: 0,
        parentid_link: null,
        titleName: '',
        currentRec:null,
        //
        //
        rowObj: {
            orgid_link: null,
            code: null,
        },
        //
        spaceObj: {
            orgid_link: null,
            spaceepc: null,
            spaceepc_old: null,
            spacename: null,
            rowid_link: null,
            floorid: null,
            isCreateNew: true,
        },
        //
        isRowViewHidden: true,
        isSpaceViewHidden: true,
    },
    formulas: {

    }
})