Ext.define('GSmartApp.view.RFID.demoRFID.inv.ViewQrcode_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ViewQrcode_ViewModel',
    data: {
        name: '',
        code: ''
    },
    formulas: {
        qrcode_demo: function (get) {
            return config.getQrcode_personel_url() + get('code')
        }
    }
});
