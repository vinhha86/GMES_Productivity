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
        var org_from_id_link = viewmodel.get('org_from_id_link');
        var porderid_link = viewmodel.get('porderid_link');
        var type = viewmodel.get('type.type');

        var warehouseStore = viewmodel.getStore('WarehouseStore');
        warehouseStore.setGroupField('buyername');
        warehouseStore.loadbyorg(material_skuid_link, org_from_id_link, porderid_link, type, function (records, operation, success) {
            warehouse_grid.setLoading(false);
        })
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    renderCount: function(value, summaryData, dataIndex){
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + ' Cây</div>';
    }
})