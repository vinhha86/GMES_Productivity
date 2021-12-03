Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Dashboard_KhoTP_POLine_ViewModel',
    stores: {
        POLineStore: {
            type: 'PContractPOStore'
        },
        PContractSKUStore: {
            type: 'PContractSKUStore'
        },
    },
    data: {
        shipdate_to: Ext.Date.add(new Date(), Ext.Date.DAY, 7),
        shipdate_from: Ext.Date.add(new Date(), Ext.Date.DAY, -10),
    },
})