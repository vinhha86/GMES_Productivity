Ext.define('GSmartApp.view.handoverlinetopack.HandoverLineToPackConfirmViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverLineToPackConfirmViewModel',
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