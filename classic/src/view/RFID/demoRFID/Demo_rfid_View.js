Ext.define('GSmartApp.view.RFID.Demo_rfid_View', {
    extend: 'Ext.tab.Panel',
    xtype: 'Demo_rfid_View',
    controller: 'Demo_rfid_ViewController',
    viewModel: {
        type: 'Demo_rfid_ViewModel'
    },
    items: [{
        title: '[1] Tạo kho',
        xtype: 'Demo_Create_Inv_View'
    },
    {
        title: '[2] Mã hóa/In nhãn'
    },
    {
        title: '[3] Nhập kho/Xuất kho'
    },
    {
        title: '[4] Kiểm kho'
    },
    {
        title: '[5] Tìm hàng'
    },
    {
        title: '[6] Cửa cảnh báo'
    }    
    ]
})