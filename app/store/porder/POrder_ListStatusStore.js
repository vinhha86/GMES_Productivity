Ext.define('GSmartApp.store.porder.POrder_ListStatusStore', {
    extend: 'Ext.data.Store',
    storeId: 'POrder_ListStatusStore',
    alias: 'store.POrder_ListStatusStore',
    fields: [
        {name: 'statusNum', type: 'int'},
        {name: 'statusString', type: 'string'}
	],
	data:[
		{statusNum:-1,	statusString:'Chưa chốt PO'},
		{statusNum:0,	statusString:'Chưa phân chuyền'},
        {statusNum:1,	statusString:'Đã phân chuyền'},
        {statusNum:2,	statusString:'Chuẩn bị SX'},
		{statusNum:3,	statusString:'Công đoạn phụ'},
        {statusNum:4,	statusString:'Đang sản xuất'},
        {statusNum:5,	statusString:'Sản xuất xong'},
		{statusNum:6,	statusString:'Nhập kho xong'}
	]

});
