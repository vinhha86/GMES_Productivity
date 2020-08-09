Ext.define('GSmartApp.view.porders.SewingCost.POrder_List.List_WorkingProcess_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.List_WorkingProcess_ViewModel',
    requires: [
        'GSmartApp.store.WorkingProcess_Store',
        'GSmartApp.store.DeviceStore',
        'GSmartApp.store.Labor.LaborStore'
    ],
    stores: {
        WorkingProcess_Store: {
            type: 'WorkingProcess_Store'
        },
        DeviceStore: {
            type: 'DeviceStore'
        },
        LaborStore: {
            type: 'LaborStore'
        }
    },
    data: {
        isDisable_themmoi: false,
        working: {
            name: '',
            devicerequiredid_link: '',
            laborrequiredid_link: '',
            timespent_standard: '',
            techcomment: '',
            productid_link: 0,
            process_type : 1,
            status: 0
        }
    }
})