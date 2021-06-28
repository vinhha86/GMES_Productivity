Ext.define('GSmartApp.view.RFID.demoRFID.inv.ViewQrcode_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ViewQrcode_ViewModel',
    data: {
        name: '',
        code: '',
        type: ''
    },
    formulas: {
        qrcode_demo: function (get) {
            var code = get('code');
            //var url = 'http://api.labelary.com/v1/printers/8dpmm/labels/2.5x2.5/0/%5Exa%5Efo100,100%5Ebqn,2,10%5Efdqa' + code + '%5Efs%5Exz';
            var url = 'http://api.labelary.com/v1/printers/8dpmm/labels/3x3/0/%5Exa%5Ecfo,60%5Efo100,50%5EFDGPAY.VN%5Efs%5Ecfa,30%5Efo10,420%5Efd' + code + '%5Efs%5Efo100,100%5Ebqn,2,10%5Efdqa,' + code + '%5Efs%5Exz';
            return url;
        }
    }
});
