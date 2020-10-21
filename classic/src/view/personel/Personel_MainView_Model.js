Ext.define('GSmartApp.view.personel.Personel_MainView_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Personel_MainView_Model',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore', 'GSmartApp.store.personnel.Personnel_Store'],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        Personnel_Store: {
            type: 'Personnel_Store'
        }
    },
    data: {
        isviewall : false, // bind checkbox xem tat ca
        isdisabled: false
    }
})