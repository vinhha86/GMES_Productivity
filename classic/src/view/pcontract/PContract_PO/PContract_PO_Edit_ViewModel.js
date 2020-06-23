Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_ViewModel',
    requires: ['GSmartApp.store.unit.UnitStore', 
    'GSmartApp.store.pcontract.PContract_PO_Price_Store',
    'GSmartApp.store.product.ProductStore',
    'GSmartApp.store.POrderFilter'],
    stores:{
        POrderStore: {
            type: 'POrderFilter'
        },
        CurrencyStore: {
            type: 'CurrencyStore'
        },
        PriceStore: {
            type: 'PContract_PO_Price_Store'
        },
        Price_DStore: {
            type: 'PContract_PO_Price_D_Store'
        },        
        ProductStore: {
            type: 'ProductStore'
        },
        SizeSetStore: {
            type: 'SizeSetStore'
        }  
    },
    data: {
        id: null,
        parentId : 0,
        po: null,
        po_price: null,
        product_selected_id_link: null,
        product_selected_typeid_link: null,
        isproductpair: 0,
        productpairid_link: 0,
        pcontractid_link: 0,
        org_droppedid: null,
        org_droppedname: null,
        org_droppedcode: null,
        isSewPriceReadonly: true
    }
})