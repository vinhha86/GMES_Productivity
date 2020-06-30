Ext.define('GSmartApp.view.porder_gantt.Porder_gantt_guess_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Porder_gantt_guess_ViewModel',
    // requires: ['GSmartApp.store.pcontract.PContract_porder_gantt_store'],
    // stores:{
    //     TaskStore: {
    //         type: 'PContract_porder_gantt_store'
    //     }     
    // },
    data: {
        gantt: {
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 1),
            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()+6, 1),
            listid: '13,14'
        }
    }
})