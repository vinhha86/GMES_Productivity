Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_Detail_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Detail_ViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.stockout_order.Stockout_order_type_Store',
        'GSmartApp.store.stockout_order.Stockout_order_d_store',
        'GSmartApp.store.UserListStore'
    ],
    stores: {
        Stockout_order_type_Store: {
            type: 'Stockout_order_type_Store'
        },
        OrgFromStore: {
            type: 'ListOrgStore'
        },
        OrgToStore: {
            type: 'ListOrgStore'
        },
        UserStore: {
            type: 'userliststore'
        },
        Order_ListStore: {
            type: ''
        },
        Stockout_order_d_Store: {
            type: 'Stockout_order_d_store'
        }
    },
    data: {
        order: {
            id: null
        },
        porderid_link: 0
    }
})