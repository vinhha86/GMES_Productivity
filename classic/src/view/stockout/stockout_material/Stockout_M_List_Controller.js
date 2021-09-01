Ext.define('GSmartApp.view.stockout.Stockout_M_List_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_List_Controller',
    init: function () {
        // this.callParent(arguments);
        var me = this.getView();
        var StockoutType = this.getViewModel().getStore('StockoutTypeStore');
        if(null!=StockoutType) StockoutType.loadStore(null, 10);

        var listidtype = "4,8,9,11,12";
        var fromStore = this.getViewModel().getStore('OrgFromStore');
        if(null!=fromStore) fromStore.loadStore_allchildren_byorg(listidtype);

        var orgtostore = this.getViewModel().getStore('OrgToStore');
        if(null!=orgtostore) orgtostore.loadStore_byRoot(listidtype);

        var today = new Date();
        var priorDate = new Date().setDate(today.getDate() - 30);
        me.down('#stockoutdate_from').setValue(new Date(priorDate));

        this.onSearch();

        // var store_stockout = this.getViewModel().getStore('Stockout');
        // if (store_stockout) {
        //     var page = store_stockout.currentPage;
        //     if (page == null) {
        //         page = 1;
        //     }
        //      store_stockout.loadByDate(0,'', new Date(),new Date(), page, 25, 0 ,0);
        // }
    },
    onActivate: function () {
        this.onSearch();
    },
    listen: {
        controller: {
            '*': {
                urlBack: 'onSearch',
            },
            'Stockout_M_Main_Controller': {
                Reload_StockoutList: 'onSearch'
            }
        }
    },
    control: {
        '#btnThemMoi': {
            click: 'onStockoutNew'
        },
        '#Stockout_M_List': {
            itemdblclick: 'onCapNhat',
            select: 'onStockoutSelect'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
    },
    onXuatTo: function () {
        this.redirectTo('stockout_m/11/create');
    },
    onXuatCat: function () {
        this.redirectTo('stockout_m/1/create');
    },
    onXuatDieuChuyenNoiBo: function () {
        this.redirectTo('stockout_m/2/create');
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('Stockout');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },
    onSearch: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockout');

        // var limit = me.down('#limitpage').getValue();
        var stockouttypeid = me.down('#stockouttypeid').getValue();
        var stockoutdate_from = me.down('#stockoutdate_from').getValue();
        var stockoutdate_to = me.down('#stockoutdate_to').getValue();
        // var OrgToStore = me.down('#OrgToStore').getValue();
        // var OrgFromStore = me.down('#OrgFromStore').getValue();
        var stockoutcode = '';
        var orgid_from_link = null;
        var orgid_to_link = null;
        var stockouttypefrom = 1;
        var stockouttypeto = 10;
        var statuses = [-2,-1, 0, 1, 2];
        var mat_skuid_link = viewmodel.get('mat_skuid_link');

        store.loadByDate_Material(stockouttypeid, stockoutcode, stockoutdate_from, stockoutdate_to, null, null,
            orgid_from_link, orgid_to_link, stockouttypefrom, stockouttypeto, statuses, mat_skuid_link);

        var StockoutD_Store = viewmodel.getStore('StockoutD_Store');
        if(null!=StockoutD_Store) StockoutD_Store.removeAll();
    },
    onStockoutSelect: function (e, selected, eOpts) {
        // console.log(selected);
        var viewmodel = this.getViewModel();
        var StockoutD_Store = viewmodel.getStore('StockoutD_Store');
        StockoutD_Store.removeAll();
        // StockoutD_Store.setData(selected.data.stockout_d);
        StockoutD_Store.loadByStockoutID(selected.data.id);
    },
    renderCell: function (value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    onStockoutEdit: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("stockout_m/" + id + "/edit");
    },
    onCapNhat: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("stockout_m/" + id + "/edit");
    },
    onStockoutItemDelete: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('stockoutcode');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa phiếu xuất ' + name + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.id = id;
                    params.status = 1;

                    GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_deleteid', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            me.setLoading(false);
                            if (success) {
                                if (response.respcode == 200) {
                                    Ext.MessageBox.show({
                                        title: "Thông báo",
                                        msg: "Xóa thành công",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                    grid.getStore().remove(rec);
                                }else{
                                    Ext.MessageBox.show({
                                        title: "Thông báo",
                                        msg: "Xóa thất bại: " + response.message,
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                            }else{
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Xóa thất bại: " + response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onStockoutNew: function () {
        this.redirectTo("stockout_m/create");
    },

    // filter
    onStockoutcodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('stockoutcodeFilter'),
            store = this.getViewModel().getStore('Stockout'),
            filters = store.getFilters();

        if (filterField.value) {
            this.stockoutcodeFilter = filters.add({
                id: 'stockoutcodeFilter',
                property: 'stockoutcode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockoutcodeFilter) {
            filters.remove(this.stockoutcodeFilter);
            this.stockoutcodeFilter = null;
        }
    },
    onStockout_order_codeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('stockout_order_codeFilter'),
            store = this.getViewModel().getStore('Stockout'),
            filters = store.getFilters();

        if (filterField.value) {
            this.stockout_order_codeFilter = filters.add({
                id: 'stockout_order_codeFilter',
                property: 'stockout_order_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockout_order_codeFilter) {
            filters.remove(this.stockout_order_codeFilter);
            this.stockout_order_codeFilter = null;
        }
    },
    onStatusFilterKeyup:function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('statusComboValue');
        var store = viewModel.getStore('Stockout');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.statusFilter = filters.add({
                id: 'statusFilter',
                property: 'status',
                value: filterValue,
                exactMatch: true,
                // anyMatch: true,
                // caseSensitive: false
            });
        }
        else if (this.statusFilter) {
            filters.remove(this.statusFilter);
            this.statusFilter = null;
        }
        // console.log('here');
        // console.log(filterValue);
    },
    onStockoutTypeFilterKeyup:function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('stockoutTypeComboValue');
        var store = viewModel.getStore('Stockout');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.stockoutTypeFilter = filters.add({
                id: 'stockoutTypeFilter',
                property: 'stockouttypeid_link',
                value: filterValue,
                exactMatch: true,
                // anyMatch: true,
                // caseSensitive: false
            });
        }
        else if (this.stockoutTypeFilter) {
            filters.remove(this.stockoutTypeFilter);
            this.stockoutTypeFilter = null;
        }
    },
    onOrgFromFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('orgFromFilterValue');
        var store = viewModel.getStore('Stockout');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.orgFromFilter = filters.add({
                id: 'orgFromFilter',
                property: 'orgfrom_name',
                value: filterValue,
                // exactMatch: true,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.orgFromFilter) {
            filters.remove(this.orgFromFilter);
            this.orgFromFilter = null;
        }
    },
    onOrgToFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('orgToFilterValue');
        var store = viewModel.getStore('Stockout');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.orgToFilter = filters.add({
                id: 'orgToFilter',
                property: 'orgto_name',
                value: filterValue,
                // exactMatch: true,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.orgToFilter) {
            filters.remove(this.orgToFilter);
            this.orgToFilter = null;
        }
    },
    onUsercreateFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('UsercreateFilterValue');
        var store = viewModel.getStore('Stockout');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.UsercreateFilter = filters.add({
                id: 'UsercreateFilter',
                property: 'usercreate_name',
                value: filterValue,
                // exactMatch: true,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.UsercreateFilter) {
            filters.remove(this.UsercreateFilter);
            this.UsercreateFilter = null;
        }
    },

    onStatusComboValueTriggerClick: function(){
        var viewmodel = this.getViewModel();
        var statusComboValue = viewmodel.get('statusComboValue');
        viewmodel.set('statusComboValue', null);
        this.onStatusFilterKeyup();
        // console.log(statusComboValue);
    },
    onStockoutTypeComboValueTriggerClick: function(){
        var viewmodel = this.getViewModel();
        var stockoutTypeComboValue = viewmodel.get('stockoutTypeComboValue');
        viewmodel.set('stockoutTypeComboValue', null);
        this.onStockoutTypeFilterKeyup();
        // console.log(stockinTypeComboValue);
    },
});
