Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_ViewModel',
    requires: ['GSmartApp.store.unit.UnitStore'],
    stores:{
        // UnitStore: {
        //     type: 'UnitStore'
        // },
        // SKUStore: {
        //     type: ''
        // }
    },
    data: {
        plan: {
            id: null,
            orgrootid_link: null,
            pcontractid_link: null,
            code: '',
            po_buyer: '',
            po_vendor: '',
            productid_link: null,
            po_quantity: 0,
            unitid_link: null,
            shipdate : null,
            matdate: null,
            etm_avr: 0,
            productiondate: null,
            packingnotice: '',
            usercreatedid_link: 0,
            timecreate: ''
        },
        parentId : 0
    }
})