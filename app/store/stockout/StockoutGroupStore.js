Ext.define('GSmartApp.store.stockout.StockoutGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StockoutGroupStore',
	fields: [
		'id', 'name'
	],
    data: [{
        id: 1, name: 'Xuất bằng RFID'
    },{
        id: 2, name: 'Xuất bằng tay'
    }]
});
