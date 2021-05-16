Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_create_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inv_create_ViewCotroller',
    init: function () {

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    }
})