Ext.define('GSmartApp.store.sync.SyncJobStore', {
    extend: 'Ext.data.Store',
    storeId: 'SyncJobStore',
    alias: 'store.SyncJobStore',
    fields: [
        'id',
        'class_namespace',
        'jobname',
        'time_format',
        'src_path',
        'des_path',
        'user_created_name',
        { name: 'date_created', type: 'date', format: 'c' },
        'user_created'
    ],
    loadStore: function () {
        this.setProxy({
            type: 'ajax',
            //url: config.getBack() + 'menuperm',
            url: config.getAppBaseUrl_demo() + 'sync/getlist_syncjob',
            actionMethods: {
                read: 'POST'
            },
            // extraParams: params,
            paramsAsJson: true,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            timeout: 60000,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load();
    }
});