Ext.define('GSmartApp.view.RFID.demoRFID.inv.Demo_rfid_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Demo_rfid_ViewModel',
    requires: ['GSmartApp.store.demo.inv_store'],
    stores: {
        inv_store: {
            type: 'inv_store'
        }
    },
    data: {

    }
});
