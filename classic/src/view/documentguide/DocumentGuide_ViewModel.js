Ext.define('GSmartApp.view.documentguide.DocumentGuide_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DocumentGuide_ViewModel',
    requires: ['GSmartApp.store.documentguide.DocumentGuideStore'],
    stores: {
        DocumentGuideStore : {
            type: 'DocumentGuideStore'
        }
    }
})