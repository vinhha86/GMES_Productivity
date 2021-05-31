Ext.define('GSmartApp.view.RFID.demoRFID.encode.encode_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.encode_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var storeType = viewmodel.getStore('StoreType');
        storeType.loadStore();
    },
    control: {

    }
})