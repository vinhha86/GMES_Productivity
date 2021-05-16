Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_viewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inv_viewController',
    init: function () {

    },
    control: {
        '#btnAddInv': {
            click: 'onAddInv'
        }
    },
    onAddInv: function () {
        var form = Ext.create('Ext.window.Window', {
            height: 250,
            width: 400,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới kho',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'inv_create_View',
                viewModel: {
                    data: {
                        inv: {
                            id: null
                        }
                    }
                }
            }]
        });

        form.show();

        form.down('#inv_create_View').getController().on('Thoat', function () {
            form.close();
        })
    }
})