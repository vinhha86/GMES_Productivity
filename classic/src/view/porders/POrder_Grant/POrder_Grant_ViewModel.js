Ext.define('GSmartApp.view.porders.POrder_Grant_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_Grant_ViewModel',
    requires: [
            'GSmartApp.store.org.ListOrgStore',
            'GSmartApp.store.PayerStore'
        ],
    stores: {
        porderStore: {
            type: 'POrderFilter'
        },
        porderSKUStore: {
            type: 'porderSKUStore'
        } ,
        grantedSKUStore: {
            type: 'porderSKUStore'
        }              
    },
    data:{
        porder: null,
        granttoorgid_link: null,
        granttoorg_name: ''
    }
})