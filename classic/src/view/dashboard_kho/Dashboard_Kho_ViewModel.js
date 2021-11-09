Ext.define('GSmartApp.view.dashboard_kho.Dashboard_Kho_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Dashboard_Kho_ViewModel',
    requires: ['GSmartApp.store.POrder_Grant'],
    stores: {
        KeHoachVaoChuyenStore: {
            type: 'POrder_Grant'
        }
    }
})