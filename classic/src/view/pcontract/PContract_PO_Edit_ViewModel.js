Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_ViewModel',
    requires: ['GSmartApp.store.unit.UnitStore', 'GSmartApp.store.pcontract.PContract_PO_Price_Store'],
    stores:{
        OrgGrantedStore: {
            type: 'POrderGrant'
        },
        CurrencyStore: {
            type: 'CurrencyStore'
        },
        PriceStore: {
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
            shipdate : null,
            matdate: null,
            etm_avr: 0,
            productiondate: null,
            packingnotice: '',
            usercreatedid_link: 0,
            timecreate: '',
            productiondays: 0
        },
        parentId : 0
    }
})