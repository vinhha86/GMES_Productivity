Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsenceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheetAbsenceViewModel',
    requires: ['GSmartApp.store.TimeSheetAbsence.TimeSheetAbsenceStore'],
    stores: {
        TimeSheetAbsenceStore: {
            type: 'TimeSheetAbsenceStore'
        },
    },
    data: {
        
    },
})