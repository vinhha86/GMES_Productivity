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
        orgtypeid_link: null,
        orgid_link: null,
        isConfirm: null, // old, ko dung
        isToday: true,
        isEditable: null,

        // confirm hidden, disabled,
        isBtnConfirmHidden: true,
        isBtnConfirmHiddenDisabled: true,
        isBtnUnconfirmHidden: true,
        isBtnUnconfirmHiddenDisabled: true,

        numberShift: null,
        sumCa1: 0,
        sumCa2: 0,
        sumCa3: 0,
        sumCa4: 0,
        sumCa5: 0,

        // cho phep danh dau check o cac cot hay khong
        isCa1Confirm: true,
        isCa2Confirm: true,
        isCa3Confirm: true,
        isCa4Confirm: true,
        isCa5Confirm: true,

        // filter
        personnelCodeFilterValue: null,
        personnelRegCodeFilterValue: null,
        personnelFullnameFilterValue: null,
    }
})