Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_order_warehouse_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_warehouse_ViewController',
    init: function () {
        
    },
    control: {
        '#btnHideWarehouse': {
            click: 'onHide'
        }
    },
    onHide: function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('width_npl', '100%');
    }
})