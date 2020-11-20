Ext.define('GSmartApp.view.personel.TimeSheetLunch_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheetLunch_MainViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgMenuTreeStore',
        'GSmartApp.store.TimeSheetLunch.TimeSheetLunchStore'
    ],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        TimeSheetLunchStore: {
            type: 'TimeSheetLunchStore'
        }
    },
    data: {
        orgtypeid_link : null,
        orgid_link: null,
        isToday: true
    }
})