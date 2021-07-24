Ext.define('GSmartApp.store.DeviceInvStore', {
    extend: 'GSmartApp.store.DeviceStore',
    alias: 'store.DeviceInvStore',
    load_device_active: function (org_governid_link,search,) {
        var params = new Object();
        params.search=search;
        params.org_governid_link=org_governid_link;
        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_Jitin() + '/api/v1/device/device_getactivate',
            paramsAsJson: true,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            extraParams: params,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load();
    }
});
