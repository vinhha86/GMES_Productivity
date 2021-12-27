Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Stockout_order_ViewController.js', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Stockout_order_ViewController.js',
    init: function () {
        
    },
    listen: {

    },
    control: {
        // '#Stockout_P_Stockout_order_View': {
        //     afterrender: 'onAfterrender',
        //     itemclick: 'onItemclick'
        // },
        // // '#btnThoat': {
        // //     click: 'onThoat'
        // // },
        // // '#btnSelect': {
        // //     click: 'onSelect'
        // // },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn một đơn hàng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        this.fireEvent("ThemDonHang", select);
        // this.onThoat();
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.getSorters().removeAll();
        Stockout_order_Store.getSorters().add({
            property: 'buyercode',
            direction: 'ASC'
        },{
            property: 'buyername',
            direction: 'ASC'
        });
    },
    onItemclick: function(thisView, record, item, index, e, eOpts){
        // console.log(record);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var mainView = me.up('window').down('#Stockout_P_Stockout_order_Main_View');
        if(mainView) mainView.setLoading(true);
        var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
        Stockout_order_d_store.loadStore(record.get('id'));
    },

    onFilterValueKhoangKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldKhoang'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldKhoang = filters.add({
                id: 'ValueFilterFieldKhoang',
                property: 'spaceString',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldKhoang) {
            filters.remove(this.ValueFilterFieldKhoang);
            this.ValueFilterFieldKhoang = null;
        }
    },
    onFilterValueLotKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldLot'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldLot = filters.add({
                id: 'ValueFilterFieldLot',
                property: 'lotnumber',
                value: filterField.value,
                anyMatch: true,
                // exactMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldLot) {
            filters.remove(this.ValueFilterFieldLot);
            this.ValueFilterFieldLot = null;
        }
    },
    onFilterValueMaSPKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldMaSP'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaSP = filters.add({
                id: 'ValueFilterFieldMaSP',
                property: 'stockinProductString',
                value: filterField.value,
                anyMatch: true,
                // exactMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaSP) {
            filters.remove(this.ValueFilterFieldMaSP);
            this.ValueFilterFieldMaSP = null;
        }
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    },
    renderCount: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
})