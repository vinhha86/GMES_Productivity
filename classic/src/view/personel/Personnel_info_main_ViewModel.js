Ext.define('GSmartApp.view.personel.Personnel_info_main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Personnel_info_main_ViewModel',
    requires: ['GSmartApp.store.gender.GenderStore', 'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.personnel.PersonnelType_Store', 'GSmartApp.store.personnel.PersonnelStatus_Store',
        'GSmartApp.store.personnel.personnel_his_store'],
    stores: {
        GenderStore: {
            type: 'GenderStore'
        },
        OrgManagerStore: {
            type: 'ListOrgStore'
        },
        OrgStore: {
            type: 'ListOrgStore'
        },
        OrgCountryStore: {
            type: 'ListOrgStore'
        },
        OrgProvinceStore: {
            type: 'ListOrgStore'
        },
        OrgDistrictStore: {
            type: 'ListOrgStore'
        },
        OrgCommuneStore: {
            type: 'ListOrgStore'
        },
        PersonnelTypeStore: {
            type: 'PersonnelType_Store'
        },
        PersonnelStatus_Store: {
            type: 'PersonnelStatus_Store'
        },
        PersonnelHis_Store: {
            type: 'personnel_his_store'
        }
    },
    data: {
        personnel: {
            id: null,
            status: 1
        },
        qrcode: config.getQrcode_personel_url()
    }
})