Ext.define('GSmartApp.view.pprocess.POrderProcessingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrderProcessingViewModel',
    stores: {
        POrderProcessingStore: {
            type: 'porderprocessing'
        },
        FactoryStore: {
            type: 'ListOrgStore'
        },
        ProductionLineStore: {
            type: 'ListOrgStore'
        },
    },

    data: {
        
    }
})