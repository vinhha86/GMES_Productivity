Ext.define('GSmartApp.view.stockin.Stockin_P_Poline_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_P_Poline_MainViewController',
    init: function () {

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#Stockin_P_Poline_MainView':{
            afterrender: 'onAfterrender',
        }
    },
    listen : {
        // controller : {
        //     'Stockout_order_warehouse_ViewController' : {
        //         'AddMat': 'onAddMat'
        //     },
        // }
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockin = viewModel.get('stockin');
        console.log(stockin);
    }
})