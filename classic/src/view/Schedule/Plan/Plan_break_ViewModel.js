Ext.define('GSmartApp.view.Schedule.Plan.Plan_break_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Plan_break_ViewModel',
    data: {
        plan : {
            quantity: 0,
            parentid_origin: 0,
            resourceid: 0,
            porderid_link: 0,
            producttivity: 0,
            pordergrant_id_link: 0
        },
        quantity: 0
    }
})