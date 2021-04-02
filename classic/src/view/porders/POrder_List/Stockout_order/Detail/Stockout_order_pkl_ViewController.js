Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_order_pkl_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_pkl_ViewController',
    init: function () {
        
    },
    control: {
        '#btnAdd_material': {
            click: 'onLockMat'
        }
    },
    onLockMat: function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('width_npl', '50%');

        var warehouse_grid = Ext.getCmp('Stockout_order_warehouse_View');
        warehouse_grid.setLoading("Đang tải dữ liệu");
        var material_skuid_link = viewmodel.get('material_skuid_link');

        var warehouseStore = viewmodel.getStore('WarehouseStore');
        warehouseStore.loadbyorg(material_skuid_link, function (records, operation, success) {
            warehouse_grid.setLoading(false);
        })
    }
})