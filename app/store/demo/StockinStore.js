Ext.define('GSmartApp.store.demo.StockinStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StockinStore',
    storeId: 'StockinStore',
    fields: [
        { name: 'id' },
        { name: 'name', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'quantity', type: 'int' }
    ],
    sorters: {
        direction: 'ASC',
        property: 'code'
    },
    loadStore: function () {
        var params = new Object();
        this.setProxy({
            type: 'ajax',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            url: config.getAppBaseUrl_demo() + 'demorfid/getstoretype',
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
