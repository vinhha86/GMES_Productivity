Ext.define('GSmartApp.view.planporder.PlanEdit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PlanEdit_ViewModel',
    requires: ['GSmartApp.store.unit.UnitStore'],
    stores:{
        UnitStore: {
            type: 'UnitStore'
        },
        SKUStore: {
            type: ''
        }
    },
    data: {
        plan: {
            plan_type: 0,
            porderid_link: 0,
            plan_date_start: null,
            plan_date_end: null,
            skucode: '',
            skuid_link : 0,
            unitid_link: 0,
            plan_amount: 0,
            id: null,
            comment: '',
            usercreatedid_link: 0,
            timecreate: ''
        },
        parentId : 0
    }
})