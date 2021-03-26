Ext.define('GSmartApp.view.pcontract.PContractListPOViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractListPOViewController',
    isActivate: false,
    control: {
        'PContractListPOView': {
            itemdblclick: 'onPOSelect'
        },
        '#btnEditAllLine': {
            click: 'onEditLine'
        }
    },
    onPOSelect: function (grid, record, item, index, e, eOpts) {
        if (null != record) {
            var pcontractid_link = record.get('pcontractid_link');
            var poid_link = record.get('id');
            var productid_link = record.get('productid_link');

            this.redirectTo('lspcontract/' + pcontractid_link + "/edit_" + poid_link + "_" + productid_link);
        }
    },
    onEditLine: function () {
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách Line giao hàng',
            closeAction: 'destroy',
            height: 400,
            width: 700,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'All_line_Edit_View',
                viewModel: {
                    data: {
                        pcontractid_link: viewmodel.get('pcontractid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#All_line_Edit_View').on('Reload', function () {
            var storePO = viewmodel.getStore('PContractPOList');
            storePO.load();
        })
    }
})