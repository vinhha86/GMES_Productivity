Ext.define('GSmartApp.view.cut_plan.warehouse.Cutplan_WareHouse_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Cutplan_WareHouse_ViewController',
    init: function () {
        var grid = this.getView();
        grid.setLoading('Đang tải dữ liệu');

        var viewmodel = this.getViewModel();
        var storecutplan_warehouse = viewmodel.getStore('WarehouseCutplanStore');
        var cutplanrowid_link = viewmodel.get('cutplanrowid_link');

        storecutplan_warehouse.loadby_cutplan(cutplanrowid_link, function (records, operation, success) {
            grid.setLoading(false);
        })
    },
    control: {
        '#btnAdd_material': {
            click: 'onAddMaterial'
        }
    },
    onAddMaterial: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('width_npl', '50%');
        var warehouse_grid = Ext.getCmp('WareHouse_View');
        warehouse_grid.setLoading("Đang tải dữ liệu");
        var material_skuid_link = viewmodel.get('material_skuid_link');

        var warehouseStore = viewmodel.getStore('WarehouseStore');
        warehouseStore.loadbyorg(material_skuid_link, function (records, operation, success) {
            warehouse_grid.setLoading(false);
        })
    },
    viewImg: function (grid, metadata, rowIndex) {
        var viewmodel = this.getViewModel();
        var me = this.getView();
        var data = grid.getStore().getAt(rowIndex);
        var id = data.get('material_product_id_link');
        var name = data.get('material_product_code');
        me.getSelectionModel().select(data);

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/product/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var form = Ext.create('Ext.window.Window', {
                            height: 400,
                            width: 380,
                            closable: true,
                            resizable: false,
                            modal: true,
                            border: false,
                            title: 'Ảnh NPL ' + name,
                            closeAction: 'destroy',
                            bodyStyle: 'background-color: transparent',
                            layout: {
                                type: 'fit', // fit screen for window
                                padding: 5
                            },
                            items: [{
                                xtype: 'PContractImageView',
                                IdProduct: id,
                                viewModel: {
                                    data: {
                                        img: response.img,
                                        productid_link: id
                                    }
                                }
                            }]
                        });
                        form.show();

                        form.down('#PContractImageView').on('Reload', function () {
                            var store = viewmodel.getStore('PContractProductStore');
                            store.load();
                        })
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin ảnh thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onBeforeDropMaterial: function (node, context, overModel, dropPosition, dropHandlers, eOpts) {
        var viewmodel = this.getViewModel();

        dropHandlers.wait = true;

        var params = new Object();
        params.id = context.records[0].get('id');
        params.cutplanrowid_link = viewmodel.get('cutplanrowid_link');

        GSmartApp.Ajax.postJitin('/api/v1/warehouse/lockmaterial_cutplan', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        dropHandlers.processDrop();
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: "Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại sau",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function () {
                            dropHandlers.cancelDrop();
                        }
                    });
                }
            })
    },
    onUnlock: function (grid, rowIndex, colIndex) {
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);



        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn bỏ giữ cây vải?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = rec.get('id');

                    GSmartApp.Ajax.postJitin('/api/v1/warehouse/unlock_material', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    grid.getStore().remove(rec);

                                    var WarehouseStore = viewmodel.getStore('WarehouseStore');
                                    WarehouseStore.insert(0, rec);
                                }
                            } else {
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: "Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại sau",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }
            }
        });
    }
})