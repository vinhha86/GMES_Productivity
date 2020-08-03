Ext.define('GSmartApp.view.devicegroup.DeviceGroupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DeviceGroupViewModel',
    requires: ['GSmartApp.store.DeviceGroupStore'],
	stores: {
        DeviceGroupStore: {
            type: 'devicegroupstore'
        }
    },
    data: {
        currentRec: null,
        oldValue: null,
        newValue: null
    }
})