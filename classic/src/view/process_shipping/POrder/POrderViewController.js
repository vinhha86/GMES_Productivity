Ext.define('GSmartApp.view.process_shipping.POrder.POrderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderViewController',
    init: function () {

    },
    control: {
        '#btnAddPOrder': {
            click: 'onAddPorder'
        },
        'POrderView': {
            itemclick: 'onSelectPOrder'
        }
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onSelectPOrder: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('porderid_link', record.get('id'));
        viewmodel.set('productid_link', record.get('productid_link'));
    },
    onAddPorder: function () {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('pcontract_poid_link') == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn PO Line giao hàng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            var form = Ext.create('Ext.window.Window', {
                closable: false,
                resizable: false,
                modal: true,
                border: false,
                title: 'Danh sách lệnh sản xuất của chào giá',
                closeAction: 'destroy',
                height: 600,
                width: 900,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'POrder_Offer_view',
                    viewModel: {
                        data: {
                            pcontract_poid_link: viewmodel.get('pcontract_poid_link')
                        }
                    }
                }]
            });
            form.show();

            form.down('#POrder_Offer_view').getController().on('Thoat', function () {
                form.close();
            });

            form.down('#POrder_Offer_view').on('Chon', function (data) {
                var store = viewmodel.getStore('POrder_ListStore');
                store.load();
                form.close();
            });
        }
    }
})