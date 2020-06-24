Ext.define('GSmartApp.view.sizeset.SizesetViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SizesetViewModel',
    requires: ['GSmartApp.store.sizeset.SizesetStore'],
    stores: {
        SizesetStore: {
            type: 'SizesetStore'
        }
    }
})