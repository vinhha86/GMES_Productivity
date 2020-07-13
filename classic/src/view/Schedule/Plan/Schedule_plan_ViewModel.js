Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Schedule_plan_ViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore', 'GSmartApp.store.POrderFilter'],
    data: {
        schedule: {
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 1),
            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()+6, 1),
            listid: '13,14',
            PO : '',
            buyer: 0,
            vendor: 0,
            isReqPorder: false,
            isAllgrant: true
        },
        isHidden_KHGH: true,
        isHidden_CMP: true,
        isHidden_Salary: true,
        isHidden_Phanlenh: false,
        isHidden_GuestView: false,
    },
    stores: {
        EndBuyer : {
            type: 'ListOrgStore'
        },
        Vender:{
            type : 'ListOrgStore'
        },
        POrderUnGranted: {
            type: 'POrderFilter'
        }
    }
})