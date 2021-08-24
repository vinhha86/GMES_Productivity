Ext.define('GSmartApp.view.stock.StockController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockController',
    init: function () {
        this.onload();
    },
    control: {
        '#btnBack':{
            tap: 'onBackPage'
        },
        '#Sku_AutoCompleteCbo': {
            beforeQuery: 'Sku_AutoComplete_beforeQuery'
        },
        '#btnResetTree': {
            tap: 'onResetTree'
        },
        '#btnSearch': {
            tap: 'onloadPage'
        },
        // '#btnBackNode': {
        //     tap: 'onbtnBackNode'
        // }
    },
    listen: {
        store: {
            'StockTreeStore': {
                'loadStore_Done': 'onloadStore_Done'
            }
        }
    },
    Sku_AutoComplete_beforeQuery: function(){ 
        var viewModel = this.getViewModel();
        var Sku_AutoComplete = viewModel.getStore('Sku_AutoComplete');
        var typeFrom = 20;
        var typeTo = 30;
        // console.log(Sku_AutoComplete.getProxy());

        var combobox = this.getView().down('#Sku_AutoCompleteCbo');
        // console.log(combobox);
        // console.log(combobox.getQueryParam());
        // console.log(combobox.getInputValue());

        if(combobox.getInputValue() === null || combobox.getInputValue() === ''){
            Sku_AutoComplete.proxy.extraParams = {
                typeFrom: typeFrom,
                typeTo: typeTo,
                code: ''
            }
        }else{
            Sku_AutoComplete.proxy.extraParams = {
                typeFrom: typeFrom,
                typeTo: typeTo,
                code: combobox.getInputValue()
            }
        }
        
    },
    // onbtnBackNode: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();

    //     var StockMenu = Ext.getCmp('StockMenu');
    //     var root = viewModel.get('root');
    //     console.log(root);
    //     if(root != null)StockMenu.goToNode(root.parentNode);
    // },
    onBackPage: function(){
        // console.log('onBackPage');   
        this.redirectTo("mobilemenu");
    },
    onload: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var StockTreeStore = viewModel.getStore('StockTreeStore');
        StockTreeStore.loadStore_async(null, null);
        StockTreeStore.load({
			scope: this,
			callback: function(records, operation, success) {
                // me.setMasked(false);
				if(!success){
                    Ext.toast('Lấy thông tin thất bại', 1000);
					this.fireEvent('logout');
				} else {
                    // console.log('callback success');
                    var StockMenu = Ext.getCmp('StockMenu');
                    var root = viewModel.get('root');
                    // console.log(root);
                    if(root != null)StockMenu.goToNode(root.parentNode);

                    // filter cho window ds cay vai
                    viewModel.set('maHangFilter', maHangId);
                    viewModel.set('donHangFilter', donHang);
				}
			}
        });
        StockTreeStore.getSorters().add({
            property: 'khoangKhongXacDinh',
            direction: 'ASC'
        },{
            property: 'name',
            direction: 'ASC'
        });
    },
    onloadPage: function () {
        var m = this;
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
        StockTreeStore.loadStore_async(maHangId, donHang);
        StockTreeStore.load({
			scope: this,
			callback: function(records, operation, success) {
                // me.setMasked(false);
				if(!success){
                    Ext.toast('Lấy thông tin thất bại', 1000);
					this.fireEvent('logout');
				} else {
                    // console.log('callback success');
                    var StockMenu = Ext.getCmp('StockMenu');
                    var root = viewModel.get('root');
                    // console.log(root);
                    if(root != null)StockMenu.goToNode(root.parentNode);

                    // filter cho window ds cay vai
                    viewModel.set('maHangFilter', maHangId);
                    viewModel.set('donHangFilter', donHang);
				}
			}
        });
        // StockTreeStore.loadStore(maHangId, donHang);
        // StockTreeStore.getSorters().add({
        //     property: 'khoangKhongXacDinh',
        //     direction: 'ASC'
        // },{
        //     property: 'name',
        //     direction: 'ASC'
        // });
    },
    onResetTree: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();

        viewModel.set('searchObj.maHang', null);
        viewModel.set('searchObj.maHangId', null);
        viewModel.set('searchObj.donHang', null);
        var WarehouseStore = viewModel.get('WarehouseStore');
        WarehouseStore.clearFilter();
        WarehouseStore.removeAll();

        viewModel.set('maHangFilter', null);
        viewModel.set('donHangFilter', null);

        this.onloadPage();
    },
    onloadStore_Done: function () {
        // console.log('onloadStore_Done');
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
        // var viewmodel = this.getViewModel();
        // var store = viewmodel.get('WarehouseStore');
        // var filters = store.getFilters();

        // var maHangId = viewmodel.get('searchObj.maHangId');
        // if(isNaN(maHangId)) maHangId = null;

        // if (maHangId) {
        //     this.ValueFilterFieldmaHangId = filters.add({
        //         id: 'ValueFilterFieldmaHangId',
        //         property: 'skuid_link',
        //         value: maHangId,
        //         exactMatch: true,
        //     });
        // }
        // else if (this.ValueFilterFieldmaHangId) {
        //     filters.remove(this.ValueFilterFieldmaHangId);
        //     this.ValueFilterFieldmaHangId = null;
        // }
    }
})