Ext.define('GSmartApp.view.RFID.demoRFID.encode.encode_detail_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.encode_detail_ViewCotroller',
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