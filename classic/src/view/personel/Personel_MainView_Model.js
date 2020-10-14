Ext.define('GSmartApp.view.personel.Personel_MainView_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Personel_MainView_Model',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        }
    }
})