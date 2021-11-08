Ext.define('GSmartApp.store.BaoCaoBaoAn.BaoAnStore', {
    extend: 'Ext.data.Store',
    storeId: 'BaoAnStore',
    alias: 'store.BaoAnStore',
    fields: [
        'org_name',
        {
            name: 'ca1', type: 'int'
        },
        {
            name: 'ca2', type: 'int'
        },
        {
            name: 'ca3', type: 'int'
        },
        {
            name: 'ca4', type: 'int'
        }
    ],
    sorters: [
        {
            property: 'p_sku_code',
            direction: 'ASC'
        }
    ],
    loadStore: function (orgid_link, date) {
        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;

        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl() + '/api/v1/timesheetlunch/tonghopbaoan',
            paramsAsJson: true,
            extraParams: params,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });

        this.load();
    }
});
