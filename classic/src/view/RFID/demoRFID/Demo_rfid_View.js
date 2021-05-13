Ext.define('GSmartApp.view.pcontract.Demo_rfid_View', {
    extend: 'Ext.tab.Panel',
    xtype: 'Demo_rfid_View',
    controller: 'Demo_rfid_ViewController',
    viewModel: {
        type: 'Demo_rfid_ViewModel'
    },
    items: [{
        title: '1. Mã hóa'
    }]
})