Ext.define('GSmartApp.view.RFID.demoRFID.inv.Demo_rfid_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Demo_rfid_ViewModel',
    requires: ['GSmartApp.store.demo.inv_store', 'GSmartApp.store.demo.inv_detail_store',
        'GSmartApp.store.demo.StoreType'],
    stores: {
        inv_store: {
            type: 'inv_store'
        },
        inv_detail_store: {
            type: 'inv_detail_store'
        },
        //2
        StoreType: {
            type: 'StoreType'
        }
    },
    data: {

    }
});
