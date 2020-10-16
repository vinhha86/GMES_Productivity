Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Schedule_plan_ViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore', 'GSmartApp.store.POrderFilter',
        'GSmartApp.store.POrder_Req'],
    data: {
        schedule: {
            // startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 1),
            startDate: Ext.Date.add(new Date(), Ext.Date.DAY, -15),
            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()+6, 1),
            listid: '13,14',
            PO : '',
            buyer: 0,
            vendor: 0,
            isReqPorder: true,
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
        },
        Porder_Req_Store: {
            type: 'POrder_Req'
        },
        Porder_Req_Granted_Store: {
            type: 'POrder_Req'
        }
    }
})