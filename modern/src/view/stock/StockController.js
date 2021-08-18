Ext.define('GSmartApp.view.stock.StockController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockController',
    init: function () {
        this.onloadPage();
    },
    control: {
        // '#btnSearch': {
        //     click: 'onloadPage'
        // },
        // '#btnResetTree': {
        //     click: 'onResetTree'
        // },
        // '#txtMaHang': {
        //     specialkey: 'onSpecialkey'
        // },
        // '#txtDonHang': {
        //     specialkey: 'onSpecialkey'
        // },
        '#btnBack':{
            tap: 'onBackPage'
        },
    },
    listen: {
        store: {
            'StockTreeStore': {
                'loadStore_Done': 'onloadStore_Done'
            }
        }
    },
    onBackPage: function(){
        // console.log('onBackPage');   
        this.redirectTo("mobilemenu");
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

        // me.setMasked({
        //     xtype: 'loadmask',
        //     message: 'Đang tải'
        // });
        var StockTreeStore = viewModel.getStore('StockTreeStore');
        StockTreeStore.loadStore(maHangId, donHang);
        // StockTreeStore.loadStore_async(maHangId, donHang);
        // StockTreeStore.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
        //         me.setMasked(false);
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		} else {
        //             var session = GSmartApp.util.State.get('session');
        //             if(session.orgid_link != 1 && session.orgid_link != null){
        //                 viewModel.set('porderSearchObj.donvi', session.orgid_link);
        //                 viewModel.set('iscombo_DonVi_editable', false);
        //             }
		// 		}
		// 	}
        // });
        StockTreeStore.getSorters().add({
            property: 'khoangKhongXacDinh',
            direction: 'ASC'
        },{
            property: 'name',
            direction: 'ASC'
        });

        var WarehouseStore = viewModel.get('WarehouseStore');
        WarehouseStore.getSorters().removeAll();
        WarehouseStore.getSorters().add({
            property: 'contractcode',
            direction: 'ASC'
        },{
            property: 'skucode',
            direction: 'ASC'
        },{
            property: 'colorname',
            direction: 'ASC'
        });
        // store.clearFilter();
        WarehouseStore.removeAll();
    },
    onResetTree: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();

        // viewModel.set('searchObj.maHang', null);
        viewModel.set('searchObj.maHangId', null);
        viewModel.set('searchObj.donHang', null);
        var WarehouseStore = viewModel.get('WarehouseStore');
        WarehouseStore.clearFilter();
        WarehouseStore.removeAll();

        this.onloadPage();
    },
    onloadStore_Done: function () {
        console.log('onloadStore_Done');
        this.getView().setMasked(false);
    },
    // filter cho danh sach npl (theo 2 txt field maHang va donHang)
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