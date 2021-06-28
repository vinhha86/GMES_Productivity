Ext.define('GSmartApp.view.RFID.demoRFID.encode.ViewQrcodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewQrcodeController',
    init: function () {
        var viewmodel = this.getViewModel();

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    }
})