Ext.define('GSmartApp.view.stock.StockController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnSearch': {
            click: 'onloadPage'
        },
        '#btnResetTree': {
            click: 'onResetTree'
        },
        '#txtMaHang': {
            specialkey: 'onSpecialkey'
        },
        '#txtDonHang': {
            specialkey: 'onSpecialkey'
        },
    },
    listen: {
        store: {
            'StockTreeStore': {
                'loadStore_Done': 'onloadStore_Done'
            }
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        //
        var searchObj = viewModel.get('searchObj');
        // var maHang = searchObj.maHang == null ? null : searchObj.maHang.trim();
        var maHangId = searchObj.maHangId;
        var donHang = searchObj.donHang == null ? null : searchObj.donHang.trim();
        //
        if(isNaN(maHangId)) maHangId = null;
        //
        me.setLoading("Đang tải dữ liệu");
        var StockTreeStore = viewModel.getStore('StockTreeStore');
        StockTreeStore.loadStore(maHangId, donHang);
        StockTreeStore.getSorters().add({
            property: 'khoangKhongXacDinh',
            direction: 'ASC'
        },{
            property: 'name',
            direction: 'ASC'
        });
    },
    onResetTree: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();

        // viewModel.set('searchObj.maHang', null);
        viewModel.set('searchObj.maHangId', null);
        viewModel.set('searchObj.donHang', null);
        var store = viewModel.get('WarehouseStore');
        store.clearFilter();
        store.removeAll();

        this.onloadPage();
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadStore_Done: function () {
        this.getView().setLoading(false);
    },
    // filter cho danh sach npl (theo 2 txt field maHang va donHang)
    onMaHangFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldMaHang'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaHang = filters.add({
                id: 'ValueFilterFieldMaHang',
                property: 'skucode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaHang) {
            filters.remove(this.ValueFilterFieldMaHang);
            this.ValueFilterFieldMaHang = null;
        }
    },
    onDonHangFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldDonHang'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldDonHang = filters.add({
                id: 'ValueFilterFieldDonHang',
                property: 'contractcode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldDonHang) {
            filters.remove(this.ValueFilterFieldDonHang);
            this.ValueFilterFieldDonHang = null;
        }
    },
    onSelectMaHangId: function(combo, record, eOpts){
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filters = store.getFilters();

        var maHangId = viewmodel.get('searchObj.maHangId');
        if(isNaN(maHangId)) maHangId = null;

        if (maHangId) {
            this.ValueFilterFieldmaHangId = filters.add({
                id: 'ValueFilterFieldmaHangId',
                property: 'skuid_link',
                value: maHangId,
                exactMatch: true,
            });
        }
        else if (this.ValueFilterFieldmaHangId) {
            filters.remove(this.ValueFilterFieldmaHangId);
            this.ValueFilterFieldmaHangId = null;
        }
    }
})