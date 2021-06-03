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
        ListKhoStore: {
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
            spacename: null,
            floorid: null,
        },
        //
        isRowViewHidden: true,
        isSpaceViewHidden: true,
    },
    formulas: {
        
    }
})