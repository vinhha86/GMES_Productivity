Ext.define('GSmartApp.view.stockin.Stockin_M_AddSpaceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_M_AddSpaceViewModel',
    requires: [
        
    ],
    stores: {
        
    },
    data: {
        // fake store
        day: [],
        hang: [],
        tang: [],
        dayStore: [],
        hangStore: [],
        tangStore: [],

        // info
        row: null,
        space: null,
        floor: null,
    },
    formulas: {
    }
})