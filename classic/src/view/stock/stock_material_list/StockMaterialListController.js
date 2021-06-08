Ext.define('GSmartApp.view.stock.stock_material_list.StockMaterialListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockMaterialListController',
    init: function () {
        this.onloadPage();
    },
    control: {
        // '#StockMenu': {
        //     itemclick: 'onloadDetail'
        // },
    },
    onloadPage: function(){
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        },{
            property: 'contractcode',
            direction: 'ASC'
        },{
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    }
})