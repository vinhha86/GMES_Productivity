Ext.define('GSmartApp.store.stockin.StockinGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StockinGroupStore',
	fields: [
		'id', 'name'
	],
    data: [{
        id: 1, name: 'Nhập bằng RFID'
    },{
        id: 2, name: 'Nhập bằng tay'
    }]
});
