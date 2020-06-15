Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_ViewModel',
    requires: ['GSmartApp.store.unit.UnitStore', 
    'GSmartApp.store.pcontract.PContract_PO_Price_Store',
    'GSmartApp.store.product.ProductStore'],
    stores:{
        OrgGrantedStore: {
            type: 'POrderGrant'
        },
        CurrencyStore: {
            type: 'CurrencyStore'
        },
        PriceStore: {
            type: 'PContract_PO_Price_Store'
        },
        ProductStore: {
            type: 'ProductStore'
        },
        SizeSetStore: {
            type: 'SizeSetStore'
        }        
    },
    data: {
        parentId : 0,
        po: null,
        productid_link: null,
        productpairid_link: 0,
        pcontractid_link: 0,
        plan: {
            id: null        
        }
    }
})