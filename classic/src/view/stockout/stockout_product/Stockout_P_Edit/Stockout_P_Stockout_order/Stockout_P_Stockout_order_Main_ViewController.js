Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Stockout_order_Main_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Stockout_order_Main_ViewController',
    init: function () {
        
    },
    listen: {
        store: {
            'Stockout_order_Store': {
                'Stockout_order_Store_load_Done': 'onStockout_order_Store_load_Done'
            },
            'Stockout_order_d_store': {
                'Stockout_order_d_store_load_Done': 'onStockout_order_d_store_load_Done'
            },
        }
    },
    control: {
        // '#Stockout_P_Stockout_order_Main_View': {
        //     afterrender: 'onAfterrender',
        // },
        // '#btnThoat': {
        //     click: 'onThoat'
        // },
        // '#btnSelect': {
        //     click: 'onSelect',
        // },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },

    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var productSearchString = viewModel.get('productSearchString') == null ? null : viewModel.get('productSearchString').trim();
        if(productSearchString == null || productSearchString == ''){
            return;
        }

        me.setLoading(true);
        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.loadStore_forStockinProductSearch(productSearchString);
    },

    onStockout_order_Store_load_Done: function(){
        this.setLoadingFalse();
    },
    onStockout_order_d_store_load_Done: function(){
        this.setLoadingFalse();
    },
    setLoadingFalse: function(){
        var me = this.getView();
        me.setLoading(false);
    },

    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var select = me.down('#Stockin_P_Edit_Product_SKU_View').getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn cần chọn ít nhất một sản phẩm",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        this.fireEvent("ThemSanPham", select);
    },

})