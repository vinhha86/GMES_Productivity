Ext.define('GSmartApp.store.porder.POrder_ListStatusStore', {
    extend: 'Ext.data.Store',
    storeId: 'POrder_ListStatusStore',
    alias: 'store.POrder_ListStatusStore',
    fields: [
        {name: 'statusNum', type: 'int'},
        {name: 'statusString', type: 'string'}
	],
	data:[
		{statusNum:-1,	statusString:'Chưa chốt'},
		{statusNum:0,	statusString:'Đã chốt, chưa phân chuyền'},
        {statusNum:1,	statusString:'Đã phân chuyền, chưa yêu cầu sx'},
        {statusNum:2,	statusString:'Yêu cầu sx đề kho và cắt chuẩn bị'},
		{statusNum:3,	statusString:'Đang thực hiện công đoạn phụ (may trc 1 số bước khó) trước khi vào chuyền'},
        {statusNum:4,	statusString:'Đang sản xuất'},
        {statusNum:5,	statusString:'Đã sản xuất xong, chưa nhập kho TP hết'},
		{statusNum:6,	statusString:'Đã hoàn thành mã hàng'}
	]

});
