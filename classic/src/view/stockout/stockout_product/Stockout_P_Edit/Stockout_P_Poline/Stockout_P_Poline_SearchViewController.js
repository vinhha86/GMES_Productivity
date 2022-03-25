Ext.define('GSmartApp.view.stockout.Stockout_P_Poline_SearchViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Poline_SearchViewController',
    init: function () {

    },
    control: {
        '#Stockout_P_Poline_SearchView':{
            afterrender: 'onAfterrender',
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnAdd': {
            click: 'onAdd'
        },
        '#btnSearch': {
            click: 'onSearch'
        },
        '#po_buyer': {
            keypress: 'onPressEnterSearch',
        },
        '#productbuyercode': {
            keypress: 'onPressEnterSearch',
        },
        '#pcontractcode': {
            keypress: 'onPressEnterSearch',
        },
        '#shipdateFrom': {
            keypress: 'onPressEnterSearch',
        },
        '#shipdateTo': {
            keypress: 'onPressEnterSearch',
        },
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

        // set default cac truong date
        var today = new Date();
        var dateFrom = new Date(Date.now() - 0 * 24 * 60 * 60 * 1000);
        var dateTo = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        viewModel.set('objSearch.shipdateFrom', dateFrom);
        viewModel.set('objSearch.shipdateTo', dateTo);

        //
        var PContract_PO = viewModel.getStore('PContract_PO');
        PContract_PO.setGroupField('contractcode');
        PContract_PO.getSorters().add({
            property: 'contractcode',
            direction: 'ASC'
        },{
            property: 'productbuyercode',
            direction: 'ASC'
        },{
            property: 'po_buyer',
            direction: 'ASC'
        },{
            property: 'shipdate',
            direction: 'ASC'
        },{
            property: 'po_quantity',
            direction: 'ASC'
        });
        // this.loadData();
    },
    loadData: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockout = viewModel.get('stockout');
        var stockoutId = viewModel.get('stockoutId');
        var objSearch = viewModel.get('objSearch');
        objSearch.stockoutid_link = stockoutId;

        var PContract_PO = viewModel.getStore('PContract_PO');
        PContract_PO.loadStoreBySearch_POLine_Stockout(objSearch);
    },
    onSearch: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        this.loadData();
    },
    onDelete: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn PO Line để xóa",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {

        }
    },
    onAdd: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn PO Line để thêm vào phiếu",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var listPoId = new Array();
            for(var i=0; i<select.length;i++){
                var pcontract_poid_link = select[i].get('id');
                listPoId.push(pcontract_poid_link);
            }

            m.saveStockoutPoline(listPoId);
        }
    },
    saveStockoutPoline: function(listPoId){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockoutId = viewModel.get('stockoutId');

        var params = new Object();
        params.stockoutid_link = stockoutId;
        params.listPoId = listPoId;

        me.setLoading("Đang lưu dữ liệu");
		GSmartApp.Ajax.post('/api/v1/stockout_poline/stockout_poline_create', Ext.JSON.encode(params),
			function (success, response, options) {
				me.setLoading(false);
				if (success) {
					var response = Ext.decode(response.responseText);
					if (response.respcode == 200) {
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Lưu thành công',
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
                        m.fireEvent('LuuThanhCong');
					}
				} else {
					var response = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						title: "Thông báo",
						msg: 'Lưu thất bại',
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}
			})
    },

    // enter to search
    onPressEnterSearch: function (textfield, e, eOpts) {
		var m = this;
		if (e.getKey() == e.ENTER) {
			// Ext.Msg.alert('Keys','You pressed the Enter key');
			m.onSearch();
		}
	},

    // filter
    onpoBuyerFilterKeyup: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var filterField = this.lookupReference('poBuyerFilter');
        var store = viewModel.getStore('PContract_PO');
        var filters = store.getFilters();

        if (filterField.value) {
            this.poBuyerFilter = filters.add({
                id: 'poBuyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.poBuyerFilter) {
            filters.remove(this.poBuyerFilter);
            this.poBuyerFilter = null;
        }
    },
    onMaSPFilterKeyup: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var filterField = this.lookupReference('MaSPFilter');
        var store = viewModel.getStore('PContract_PO');
        var filters = store.getFilters();

        if (filterField.value) {
            this.MaSPFilter = filters.add({
                id: 'MaSPFilter',
                property: 'productbuyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.MaSPFilter) {
            filters.remove(this.MaSPFilter);
            this.MaSPFilter = null;
        }
    },
    oncontractcodeFilterKeyup: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var filterField = this.lookupReference('contractcodeFilter');
        var store = viewModel.getStore('PContract_PO');
        var filters = store.getFilters();

        if (filterField.value) {
            this.contractcodeFilter = filters.add({
                id: 'contractcodeFilter',
                property: 'contractcode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.contractcodeFilter) {
            filters.remove(this.contractcodeFilter);
            this.contractcodeFilter = null;
        }
    },

    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },

})