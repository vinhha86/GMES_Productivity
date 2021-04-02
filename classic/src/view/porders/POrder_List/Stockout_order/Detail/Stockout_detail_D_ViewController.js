Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_detail_D_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_detail_D_ViewController',
    init: function () {
    },
    control: {
        '#btnThemMoi_NPL': {
            click: 'onThemMoiNPL'
        }
    },
    onShowPKL: function(grid, rowIndex, colIndex, item, e, record){
        console.log(record);
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách cây vải',
            closeAction: 'destroy',
            height: 600,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_order_pkl_MainView',
                viewModel: {
                    data: {
                        material_skuid_link: record.get('material_skuid_link')
                    }
                }
            }]
        });
        form.show();
    },
    onThemMoiNPL: function(){
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var type = viewmodel.get('order.stockouttypeid_link');

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách NPL của lệnh sản xuất',
            closeAction: 'destroy',
            height: 600,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Warehouse_View',
                viewModel: {
                    data: {
                       type_from: type == 1 ? 20: 30,
                       type_to: type == 1 ? 29: 59,
                       porderid_link: viewmodel.get('porderid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#Warehouse_View').getController().on('Thoat', function () {
            form.close();
        });
        form.down('#Warehouse_View').getController().on('Chon', function (data) {
            var store = viewmodel.getStore('Stockout_order_d_Store');

            var check = false;

            for(var i =0; i< data.length; i++){
                check = false;

                for(var j=0; j<store.data.length;j++){
                    if(store.data.items[j].get('material_skuid_link') == data[i].get('materialid_link')){
                        check = true;
                        break;
                    }
                }
                if(!check){
                    var rec = new Object();
                    rec.id = null;
                    rec.material_skuid_link = data[i].get('materialid_link');
                    rec.colorid_link = data[i].get('colorid_link');
                    rec.unitid_link = data[i].get('unitid_link');

                    rec.materialCode = data[i].get('materialCode');
                    rec.materialName = data[i].get('materialName');
                    rec.tenMauNPL = data[i].get('tenMauNPL');
                    rec.coKho = data[i].get('coKho');
                    rec.unitName = data[i].get('unitName');
                    rec.totalyds = 0;

                    store.insert(0, rec);
                }
            }
            form.close();
        });
    }
})