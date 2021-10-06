Ext.define('GSmartApp.view.process_shipping.POLine.CreateManyPorderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CreateManyPorderViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
        },
        OrgGrantStore: {
            type: 'ListOrgStore'
        }
    },
    data: {

    }
})