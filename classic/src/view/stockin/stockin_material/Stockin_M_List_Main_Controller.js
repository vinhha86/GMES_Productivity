Ext.define('GSmartApp.view.stockin.Stockin_M_List_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_List_Main_Controller',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

		var UnitStore = viewmodel.getStore('UnitStore');
		if (null!=UnitStore) UnitStore.loadStore();

        var stockintype = viewmodel.getStore('StockinTypeStore');
        if (null!=stockintype) stockintype.loadStore();
        
        var listidtype = "13";
        // var listidtype = "4,8,9,11,12";
        var orgtostore = viewmodel.getStore('OrgToStore');
        if (null!=orgtostore) orgtostore.loadStore_allchildren_byorg(listidtype);

        var fromStore = viewmodel.getStore('OrgFromStore');
        if (null!=fromStore) fromStore.loadStore_byRoot(listidtype);

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockindate_from').setValue(new Date(priorDate));

        // this.onSearch();
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            },
            'Stockin_M_Main_Controller': {
                Reload_StockinList: 'onSearch'
            }
        }
    },    
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
        '#Stockin_M_List': {
            select: 'onStockinSelect',
            itemdblclick: 'onCapNhatdbl',
        },        
    },
    onStockinSelect: function (e, selected, eOpts) {
        var viewmodel = this.getViewModel();
        var StockinD_Store = viewmodel.getStore('StockinD_Store');
        StockinD_Store.setData(selected.data.stockin_d);
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('StockinStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },
    onSearch: function () {
        // console.log('Searching');
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('StockinStore');

        // var limit = me.down('#limitpage').getValue();
        var orgid_from_link = me.down('#OrgFromStore').getValue();
        var stockindate_from = me.down('#stockindate_from').getValue();
        var stockindate_to = me.down('#stockindate_to').getValue();
        var stockintypeid_link = me.down('#stockintypeid_link').getValue();
        var status = [0,1,2];

        // var page = store.currentPage;

        // if (limit == null) {
        //     limit = 25;
        // }

        // if (page == null) {
        //     page = 1;
        // }
        // store.loadStore(orgid_from_link, stockindate_from, stockindate_to, stockintypeid_link, status, limit, page);
        store.loadStore_Material(orgid_from_link, stockindate_from, stockindate_to, stockintypeid_link, status, null, null, null);
    },
    onThemMoi: function(){
        this.redirectTo('stockin_m_main/create');
    },
    onNhapMuaMoi: function(){
        var viewmodel = this.getViewModel();
        if (viewmodel.get('isAdd_Pcontract_Stockin')){
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Phiếu nhập kho',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .99,
                width: Ext.getBody().getViewSize().width * .95,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockin_M_Edit',
                    viewModel: {
                        type: 'Stockin_M_ViewModel',
                        data: {
                            isNewStockin: true,
                            isAdd_Pcontract_Stockin: true,
                            pcontractid_link: viewmodel.get('pcontractid_link'),
                            stockintypeid_link: 1,
                        }
                    }
                }]
            });            
            form.show();

            // bắt event load lại store, LuuPhieuNhapThanhCong
            form.down('#Stockin_M_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                var StockinStore = viewmodel.getStore('StockinStore');
                StockinStore.load();
                var StockinD_Store = viewmodel.getStore('StockinD_Store');
                StockinD_Store.removeAll();
            });
        } else {
            this.redirectTo('stockin_m_main/1/create');
        }        
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        var viewmodel = this.getViewModel();
        var id = record.data.id;
        if (viewmodel.get('isAdd_Pcontract_Stockin')){
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Phiếu nhập kho',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .99,
                width: Ext.getBody().getViewSize().width * .95,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockin_M_Edit',
                    viewModel: {
                        type: 'Stockin_M_ViewModel',
                        data: {
                            isNewStockin: false,
                            isAdd_Pcontract_Stockin: true,
                            stockinid_link: id,
                            pcontractid_link: viewmodel.get('pcontractid_link'),                
                        }
                    }
                }]
            });            
            form.show();

             // bắt event load lại store, LuuPhieuNhapThanhCong
             form.down('#Stockin_M_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                var StockinStore = viewmodel.getStore('StockinStore');
                StockinStore.load();
                var StockinD_Store = viewmodel.getStore('StockinD_Store');
                StockinD_Store.removeAll();
            });
        } else {
            this.redirectTo("stockin_m_main/" + id + "/edit");
        }
    },
    onEdit: function(grid, rowIndex){
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        if (viewmodel.get('isAdd_Pcontract_Stockin')){
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Phiếu nhập kho',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .99,
                width: Ext.getBody().getViewSize().width * .95,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockin_M_Edit',
                    viewModel: {
                        type: 'Stockin_M_ViewModel',
                        data: {
                            isAdd_Pcontract_Stockin: true,
                            stockinid_link: id,
                            pcontractid_link: viewmodel.get('pcontractid_link'),                   
                        }
                    }
                }]
            });            
            form.show();
        } else {
            this.redirectTo("stockin_m_main/" + id + "/edit");
        }
    },
    onDelete: function(grid, rowIndex){
        var me = this.getView();
        
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('stockincode');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa phiếu nhập "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa");
                    var params = new Object();
                    params.id = id;
                    GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_deleteid', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            me.setLoading(false);
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                grid.getStore().remove(rec);
                            }
                        }
                })
                }
            }
        });
    },

    onStockincodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('stockincodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.stockincodeFilter = filters.add({
                id: 'stockincodeFilter',
                property: 'stockincode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockincodeFilter) {
            filters.remove(this.stockincodeFilter);
            this.stockincodeFilter = null;
        }
    },
    onInvoice_numberFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('invoice_numberFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.invoice_numberFilter = filters.add({
                id: 'invoice_numberFilter',
                property: 'invoice_number',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.invoice_numberFilter) {
            filters.remove(this.invoice_numberFilter);
            this.invoice_numberFilter = null;
        }
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var UnitStore = viewModel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
    },
    onPContract_Stockin: function (pcontractid) {
        console.log(pcontractid);
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontractid_link', pcontractid);
        var status = [-1,0,1,2];
        var store = viewmodel.getStore('StockinStore');
        store.loadStore_Material(null, null, null, null, status, pcontractid, null, null);
    },
})