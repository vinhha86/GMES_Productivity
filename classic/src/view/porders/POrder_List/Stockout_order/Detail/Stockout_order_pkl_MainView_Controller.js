Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_order_pkl_MainView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_pkl_MainView_Controller',
    init: function () {
        var viewmodel = this.getViewModel();
        var store_pkl = viewmodel.getStore('Stockout_order_pkl_Store');
        store_pkl.insert(0, viewmodel.get('stockout_order_pkl'));
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onThoat: function () {
        var viewmodel = this.getViewModel();
        var store_pkl = viewmodel.getStore('Stockout_order_pkl_Store');
        var data = [];
        for (var i = 0; i < store_pkl.data.length; i++) {
            var value = store_pkl.data.items[i].data;
            data.push(value);
        }
        this.fireEvent('Thoat', data);
    }
})