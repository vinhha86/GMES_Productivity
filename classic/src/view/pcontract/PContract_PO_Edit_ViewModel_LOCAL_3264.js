Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_ViewModel',
    requires: ['GSmartApp.store.unit.UnitStore', 'GSmartApp.store.pcontract.PContract_PO_Price_Store'],
    stores:{
        OrgGrantedStore: {
            type: 'POrderGrant'
        },
        PriceStore : {
            type: 'PContract_PO_Price_Store'
        }
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
            shipdate : null, //Ngày giao
            matdate: null, //Ngày NPL về
            etm_avr: 0,
            productiondate: null, //Ngày VC
            packingnotice: '',
            usercreatedid_link: 0,
            timecreate: '',
            production_day: 0
        },
        parentId : 0,
        pcontractid_link: 0,
        productid_link: 0
    }
})