Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Stockout_list_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_list_ViewController',
    init: function () {
    },
    control: {
        '#btnThemMoi_Stockout_order_NL': {
            click: 'onThemMoiNL'
        },
        '#btnThemMoi_Stockout_order_PL': {
            click: 'onThemMoiPL'
        },
        'Stockout_list_View': {
            itemclick: 'onItemClick',
            itemdblclick: 'onEdit'
        }
    },
    onItemClick: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        var storeDetail = viewmodel.getStore('Stockout_order_d_Store');
        storeDetail.GetByStockoutOrder(record.get('id'));
    },
    onEdit: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu yêu cầu xuất phụ liệu cho sản xuất',
            closeAction: 'destroy',
            height: 700,
            width: 1000,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Detail_View',
                viewModel: {
                    data: {
                        order: {
                            id: record.get('id'),
                            stockouttypeid_link: record.get('stockouttypeid_link'),
                            porderid_link: viewmodel.get('porder.id')
                        },
                        porderid_link: viewmodel.get('porder.id')
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockout_Detail_View').getController().on('Thoat', function () {
            form.close();
        });
    },
    onThemMoiPL: function () {
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu yêu cầu xuất phụ liệu cho sản xuất',
            closeAction: 'destroy',
            height: 600,
            width: 900,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Detail_View',
                viewModel: {
                    data: {
                        order: {
                            stockouttypeid_link: 2,
                            id: null,
                            porderid_link: viewmodel.get('porder.id')
                        },
                        porderid_link: viewmodel.get('porder.id')
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockout_Detail_View').getController().on('Thoat', function () {
            var store = viewmodel.getStore('Stockout_order_Store');
            store.load();
            form.close();
        });
    },
    onThemMoiNL: function () {
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu yêu cầu xuất Nguyên liệu cho sản xuất',
            closeAction: 'destroy',
            height: 600,
            width: 900,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Detail_View',
                viewModel: {
                    data: {
                        order: {
                            stockouttypeid_link: 1,
                            id: null,
                            porderid_link: viewmodel.get('porder.id')
                        },
                        porderid_link: viewmodel.get('porder.id')
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockout_Detail_View').getController().on('Thoat', function () {
            form.close();
        });
    }
})