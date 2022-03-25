Ext.define('GSmartApp.view.stockout.Stockout_P_Poline_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Poline_MainViewController',
    init: function () {

    },
    control: {
        '#Stockout_P_Poline_MainView':{
            afterrender: 'onAfterrender',
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnDelete': {
            click: 'onDelete'
        },
        '#btnAdd': {
            click: 'onAdd'
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

        this.loadData();
    },
    loadData: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        
        var stockout = viewModel.get('stockout');
        var PContract_PO = viewModel.getStore('PContract_PO');
        PContract_PO.loadStoreByStockout(stockout.id);
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
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn có chắc chắn xoá các PO Line này",
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        var listPoId = new Array();
                        for(var i=0; i<select.length;i++){
                            var pcontract_poid_link = select[i].get('id');
                            listPoId.push(pcontract_poid_link);
                        }
                        m.deleteStockoutPoline(listPoId);
                    }
                }
            });
           
        }
    },
    deleteStockoutPoline: function(listPoId){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var PContract_PO = viewModel.getStore('PContract_PO');
        var stockout = viewModel.get('stockout');
        var stockoutid_link = stockout.id;

        var params = new Object();
        params.stockoutid_link = stockoutid_link;
        params.listPoId = listPoId;

        me.setLoading("Đang lưu dữ liệu");
		GSmartApp.Ajax.post('/api/v1/stockout_poline/stockout_poline_delete', Ext.JSON.encode(params),
			function (success, response, options) {
				me.setLoading(false);
				if (success) {
					var response = Ext.decode(response.responseText);
					if (response.respcode == 200) {
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: 'Xoá thành công',
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
                        PContract_PO.load();
                        m.fireEvent('LuuThanhCong');
					}
				} else {
					var response = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						title: "Thông báo",
						msg: 'Xoá thất bại',
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}
			})
    },

    onAdd: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockout = viewModel.get('stockout');
        var stockoutId = stockout.id;

        var form = Ext.create('Ext.window.Window', {
            height: '90%',
            width: '90%',
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: "Tìm kiếm PO Line",
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_P_Poline_SearchView',
                viewModel: {
                    data: {
                        stockout: stockout,
                        stockoutId: stockoutId
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockout_P_Poline_SearchView').getController().on('Thoat', function () {
            form.close();
        })

        form.down('#Stockout_P_Poline_SearchView').getController().on('LuuThanhCong', function () {
            var PContract_PO = viewModel.getStore('PContract_PO');
            PContract_PO.load();
            form.close();
        })
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