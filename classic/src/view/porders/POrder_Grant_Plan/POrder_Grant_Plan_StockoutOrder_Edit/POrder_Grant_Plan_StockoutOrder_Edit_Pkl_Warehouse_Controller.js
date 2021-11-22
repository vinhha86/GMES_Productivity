Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Warehouse_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Warehouse_Controller',
    init: function () {
        
    },
    control: {
        '#POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Warehouse': {
            afterrender: 'onAfterrender',
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.setGroupField('spaceString');
        WarehouseStore.getSorters().add({
            property: 'spaceString',
            direction: 'ASC'
        },{
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    },
})