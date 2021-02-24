Ext.define('GSmartApp.view.cut_plan.warehouse.Cutplan_Warehouse_MainView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Cutplan_Warehouse_MainView_Controller',
    init: function () {
        
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onThoat: function(){
        this.fireEvent("Thoat");
    }
})