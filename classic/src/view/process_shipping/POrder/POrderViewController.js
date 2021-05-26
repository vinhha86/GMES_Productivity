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
        },
        '#btnMoRong': {
            click: 'onMoRong'
        },
        '#btnThuGon': {
            click: 'onThuGon'
        }
    },
    onMoRong: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('heightPOLine', 0);
        viewmodel.set('IsOpen', !viewmodel.get('IsOpen'));
    },
    onThuGon: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('heightPOLine', '50%');
        viewmodel.set('IsOpen', !viewmodel.get('IsOpen'));
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onOrderCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POrder_ListStore');
        var filterField = this.lookupReference('ordercodeFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ordercodeFilterField = filters.add({
                id: 'ordercodeFilterField',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ordercodeFilterField) {
            filters.remove(this.ordercodeFilterField);
            this.ordercodeFilterField = null;
        }
    },
    onSelectPOrder: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        var porderid_link = record.get('id');
        var productid_link = record.get('productid_link');
        var pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        viewmodel.set('porderid_link', porderid_link);
        viewmodel.set('productid_link', productid_link);
        viewmodel.set('productid_link', productid_link);
        viewmodel.set('pcontractid_link', record.get('pcontractid_link'));
        viewmodel.set('IdGrant', 0);

        //load sku cua lenh san xuat
        var storesku = viewmodel.getStore('porderSKUStore');
        storesku.loadByPorder_And_PO(porderid_link, pcontract_poid_link);

        //load ds to da phan chuyen
        var storeGrant = viewmodel.getStore('POrder_ListGrantStore');
        storeGrant.loadStore(porderid_link);

        //load can doi 
        var SKUBalanceStore_Mat = viewmodel.getStore('SKUBalanceStore_Mat');
        SKUBalanceStore_Mat.setGroupField('mat_sku_product_typename');
        SKUBalanceStore_Mat.loadBalancePOrder(porderid_link);
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