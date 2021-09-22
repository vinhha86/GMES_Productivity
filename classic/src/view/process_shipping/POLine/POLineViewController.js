Ext.define('GSmartApp.view.process_shipping.POLine.POLineViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POLineViewController',
    init: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var current = new Date();
        viewmodel.set('shipdate_to', new Date(current.getFullYear(), current.getMonth() + 3, current.getDate()));
        viewmodel.set('shipdate_from', new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));

        me.onReload();
    },
    control: {
        '#shipdate_to': {
            collapse: 'onReload'
        },
        '#shipdate_from': {
            collapse: 'onReload'
        },
        '#hideView': {
            click: 'onHideView'
        },
        '#POLineView': {
            itemclick: 'onSelect',
            celldblclick: 'onPOLineViewCellDblClick',
        },
        '#checkisMap': {
            change: 'onisMapChange'
        }
    },
    onisMapChange: function (chk, newValue, oldValue, eOpts) {
        if (oldValue == null) return;
        var me = this;
        var viewmodel = this.getViewModel();
        viewmodel.set('ismap', newValue);
        me.onReload();
    },
    onMenuShow: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var hiddenMap = record.get('ismap') == null ? false : record.get('ismap');

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Map lệnh sản xuất',
                    itemId: 'btnmapLSX',
                    separator: true,
                    hidden: hiddenMap,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-link brownIcon',
                    handler: function () {
                        me.onMapPorder(record);
                    },
                },
                {
                    text: 'Hủy Map lệnh sản xuất',
                    itemId: 'btnCancelmapLSX',
                    separator: true,
                    hidden: !hiddenMap,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-undo brownIcon',
                    handler: function () {
                        Ext.Msg.confirm('Thông báo', 'Bạn có thực sự muốn hủy map với lệnh sản xuất',
                            function (choice) {
                                if (choice === 'yes') {
                                    me.CancelMap(record);
                                }
                            });
                    }
                }, {
                    text: 'Yêu cầu xuất kho thành phẩm',
                    itemId: 'btnYCXKThanhPham',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-plus brownIcon',
                    handler: function () {
                        me.onCreateStockoutP(record);
                    },
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    CancelMap: function (rec) {
        var grid = this.getView();
        var me = this;
        grid.setLoading('Đang xử lý');
        var params = new Object();
        params.pcontract_poid_link = rec.get('id');
        GSmartApp.Ajax.post('/api/v1/porderpoline/delete_porder', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Thành công!',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });

                        var store = grid.getStore();
                        store.load({
                            callback: function () {
                                grid.getSelectionModel().select(rec, true, true);
                                me.onSelect(null, rec);
                            }
                        });
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Có lỗi trong quá trình xử lý dữ liệu!',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Có lỗi trong quá trình xử lý dữ liệu!',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    onShowPorderList: function (store, pcontract_poid_link, rec) {
        var viewmodel = this.getViewModel();
        var me = this;
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
                        store: store,
                        pcontract_poid_link: pcontract_poid_link,
                        shipdate: rec.get('shipdate')
                    }
                }
            }]
        });
        form.show();

        form.down('#POrder_Offer_view').getController().on('Thoat', function () {
            form.close();
        });
        var record = viewmodel.get('poline_selection');

        form.down('#POrder_Offer_view').on('Chon', function () {
            var store = viewmodel.getStore('POLineStore');
            store.load();
            me.onSelect(null, rec);
            form.close();
        });
    },
    onMapPorder: function (rec) {
        var grid = this.getView();
        var me = this;
        grid.setLoading('Đang tải dữ liệu');
        var params = new Object();
        params.pcontract_poid_link = rec.get('id');
        GSmartApp.Ajax.post('/api/v1/porder/getby_po_line', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if (response.data.length > 0) {
                            me.onShowPorderList(response.data, rec.get('id'), rec);
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Bạn có muốn sinh lệnh cho line giao hàng thực tế!',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                buttonText: {
                                    yes: 'Có',
                                    no: 'Không'
                                },
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        me.ShowCreatePorder(rec);
                                    }
                                }
                            });
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Có lỗi trong quá trình xử lý dữ liệu!',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Có lỗi trong quá trình xử lý dữ liệu!',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    ShowCreatePorder: function (rec) {
        var viewmodel = this.getViewModel();
        var me = this;
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tạo lệnh sản xuất',
            closeAction: 'destroy',
            height: 300,
            width: 600,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'CreatePorderView',
                viewModel: {
                    data: {
                        enddate: rec.get('shipdate'),
                        productname: rec.get('productbuyercode'),
                        quantity: rec.get('po_quantity'),
                        pcontract_poid_link: rec.get('id')
                    }
                }
            }]
        });
        form.show();

        form.down('#CreatePorderView').on('Create', function (data) {
            if (data != null)
                me.fireEvent('AddPlan', data);
            var store = viewmodel.getStore('POLineStore');
            store.load();
            form.close();
        })
    },
    onCreateStockoutP: function (rec) {
        // var viewmodel = this.getViewModel();
        // var grid = this.getView();
        // var me = this;

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu xuất kho',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'stockout_p_edit',
                viewModel: {
                    type: 'Stockout_P_EditModel',
                    data: {
                        isWindow: true,
                        stockouttypeid_link: 21,
                        po: rec,
                    }
                }
            }]
        });
        form.show();

        form.down('#stockout_p_edit').getController().on('Thoat', function () {
            form.close();
        });
        form.down('#stockout_p_edit').getController().on('Luu', function () {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Lập phiếu thành công',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            // form.close();
        });
    },
    onReload: function () {
        var viewmodel = this.getViewModel();
        var ismap = viewmodel.get('ismap');
        var store = viewmodel.getStore('POLineStore');
        store.setGroupField('productbuyercode');
        store.getby_shipping(viewmodel.get('shipdate_from'), viewmodel.get('shipdate_to'), ismap);
    },
    onHideView: function () {
        var grid = this.getView();
        var main = grid.up('#ProcessShippingMainView').up('#Schedule_Plan_Porder_MainView').getLayout();
        main.setActiveItem(0);
    },
    onSelect: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        var storeSKU = viewmodel.getStore('POLineSKU_Store');
        var pcontractid_link = record.get('pcontractid_link');
        var pcontractpoid_link = record.get('id');
        viewmodel.set('pcontract_poid_link', pcontractpoid_link);
        viewmodel.set('porderid_link', 0);

        //remove het grid porder-sku
        var store_porder_sku = viewmodel.getStore('porderSKUStore');
        store_porder_sku.removeAll();

        //remove bang can doi
        var storeCanDoi = viewmodel.getStore('SKUBalanceStore_Mat');
        storeCanDoi.removeAll();

        storeSKU.loadStoreByPO(pcontractid_link, pcontractpoid_link);

        var storePOrder = viewmodel.getStore('POrder_ListStore');
        storePOrder.POrderPOLine_loadby_po(pcontractpoid_link);
    },
    onFilterMaSPKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POLineStore');
        var filterField = this.lookupReference('filterMaSP'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filterMaSP = filters.add({
                id: 'filterMaSP',
                property: 'productbuyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterMaSP) {
            filters.remove(this.filterMaSP);
            this.filterMaSP = null;
        }
    },
    onFilterPOKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POLineStore');
        var filterField = this.lookupReference('filterPO'),
            filters = store.getFilters();

        if (filterField.value) {
            this.filterPO = filters.add({
                id: 'filterPO',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterPO) {
            filters.remove(this.filterPO);
            this.filterPO = null;
        }
    },
    onPOLineViewCellDblClick: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        // console.log(record);
        var viewmodel = this.getViewModel();
        var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue = record.get(clickedDataIndex);
        if (
            clickedDataIndex == 'amountinputsum' ||
            clickedDataIndex == 'amountoutputsum' ||
            clickedDataIndex == 'amountpackstockedsum' ||
            clickedDataIndex == 'amountstockedsum' ||
            clickedDataIndex == 'amountgiaohang'
        ) {
            var form = Ext.create('Ext.window.Window', {
                height: 550,
                width: 900,
                closable: true,
                title: 'Tiến độ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',

                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'POLineChart',
                    viewModel: {
                        type: 'POLineChart_ViewModel',
                        data: {
                            dataIndex: clickedDataIndex,
                            po: record,
                        }
                    }
                }]
            });
            form.show();
        }
    }
})