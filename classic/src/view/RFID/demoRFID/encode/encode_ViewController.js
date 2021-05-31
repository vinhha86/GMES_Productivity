Ext.define('GSmartApp.view.RFID.demoRFID.encode.encode_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.encode_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var storeType = viewmodel.getStore('StoreType');
        storeType.loadStore();
    },
    control: {
        '#btnIn': {
            click: 'onPrint'
        }
    },
    onPrint: function () {
        var form = Ext.create('Ext.window.Window', {
            height: 250,
            width: 600,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'In và mã hóa',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'encode_detail_View',
                viewModel: {
                    data: {
                        type: 1
                    }
                }
            }]
        });

        form.show();
    }
})