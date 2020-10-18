Ext.define('GSmartApp.view.handovercuttoprint.HandoverCutToPrintConfirmViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutToPrintConfirmViewModel',
    requires: [
    ],
    stores: {
    },
    data: {
        username: '',
        password: '',
        handoverid_link: null,
        isIn: false, // nhan
        isOut: false // giao
    }
})