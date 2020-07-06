Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_ViewModel',
    requires: ['GSmartApp.store.unit.UnitStore', 
    'GSmartApp.store.pcontract.PContract_PO_Price_Store',
    'GSmartApp.store.product.ProductStore',
    'GSmartApp.store.POrderFilter', 'GSmartApp.store.org.ListOrgStore'],
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
        },
        UnitStore: {
            type: 'UnitStore'
        }  ,
        EndBuyer : {
            type: 'ListOrgStore'
        },
        Vender:{
            type : 'ListOrgStore'
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
        isSewPriceReadonly: true,

        schedule: {
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 1),
            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()+6, 1),
            listid: '13,14',
            PO : '',
            buyer: 0,
            vendor: 0,
            isReqPorder: false,
            isAllgrant: false
        },
        isHidden_PO: false,
        isHidden_CMP: false,
        isHidden_Salary: false,
        isHidden_GrantOrg: true,
        isHidden_GuessView: true,
        isHidden_PDF: true,
        isHidden_KHGH: false,
        isHidden_Phanlenh: true,
        isHidden_GuestView : true
    }
})