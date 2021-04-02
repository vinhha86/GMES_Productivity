Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_order_pkl_MainView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_pkl_MainView_Controller',
    init: function () {
        
    },
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    }
})