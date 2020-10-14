Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineConfirmViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutTolineConfirmViewModel',
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