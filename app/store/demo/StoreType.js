Ext.define('GSmartApp.store.demo.StoreType', {
    extend: 'Ext.data.Store',
    alias: 'store.StoreType',
    storeId: 'StoreType',
    fields: [
        { name: 'id' },
        { name: 'name', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'en_name', type: 'bool' },
        { name: 'en_code', type: 'bool' },
        { name: 'en_lot', type: 'bool' },
        { name: 'en_exp', type: 'bool' },
        { name: 'en_qty', type: 'bool' }
    ],
    sorters: {
        direction: 'ASC',
        property: 'name'
    }
});
