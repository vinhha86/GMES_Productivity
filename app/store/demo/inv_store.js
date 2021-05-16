Ext.define('GSmartApp.store.demo.inv_store', {
    extend: 'Ext.data.Store',
    alias: 'store.inv_store',
    storeId: 'inv_store',
    fields: [
        { name: 'id' },
        { name: 'codename', type: 'string' },
        { name: 'storename', type: 'string' },
        { name: 'storetype_id', type: 'int' },
        'state',
        'created_on'
    ],
    sorters: {
        direction: 'ASC',
        property: 'codename'
    }
});
