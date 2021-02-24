Ext.define('GSmartApp.view.cut_plan.warehouse.Cutplan_WareHouse_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Cutplan_WareHouse_ViewController',
    init: function () {
        
    },
    control: {
        '#btnAdd_material': {
            click: 'onAddMaterial'
        }
    },
    onAddMaterial: function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('width_npl', '50%');
        var warehouse_grid = Ext.getCmp('WareHouse_View');
        warehouse_grid.setLoading("Đang tải dữ liệu");

        var warehouseStore = viewmodel.getStore('WarehouseStore');
        warehouseStore.loadbyorg(function(records, operation, success){
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

                        form.down('#PContractImageView').on('Reload',function(){
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
    }
})