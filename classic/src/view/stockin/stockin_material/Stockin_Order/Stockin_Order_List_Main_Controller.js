Ext.define('GSmartApp.view.stockin.Stockin_Order_List_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_Order_List_Main_Controller',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        
		var UnitStore = viewmodel.getStore('UnitStore');
		if (null!=UnitStore) UnitStore.loadStore();

        var stockintype = viewmodel.getStore('StockinTypeStore');
        stockintype.loadStore();
        
        var listidtype = "13";
        // var listidtype = "4,8,9,11,12";
        var orgtostore = viewmodel.getStore('OrgToStore');
        orgtostore.loadStore_allchildren_byorg(listidtype);

        var fromStore = viewmodel.getStore('OrgFromStore');
        fromStore.loadStore_byRoot(listidtype);

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
                Reload_StockinOrderList: 'onSearch'
            }
        }
    },    
    control: {
        '#btnTimKiem': {
            click: 'onSearch'
        },
        '#Stockin_Order_List': {
            select: 'onStockin_Order_Select',
            itemdblclick: 'onCapNhatdbl',
        },        
    },
    onStockin_Order_Select: function (e, selected, eOpts) {
        var viewmodel = this.getViewModel();
        var Stockin_Order_D_Store = viewmodel.getStore('Stockin_Order_D_Store');
        Stockin_Order_D_Store.setData(selected.data.stockin_d);
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
        } else {
            this.redirectTo("stockin_m_main/" + id + "/edit");
        }
    },
    onSearch: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockin_Order_Store');

        // var limit = me.down('#limitpage').getValue();
        // var orgid_from_link = me.down('#OrgFromStore').getValue();
        var stockindate_from = me.down('#stockindate_from').getValue();
        var stockindate_to = me.down('#stockindate_to').getValue();
        // var stockintypeid_link = me.down('#stockintypeid_link').getValue();
        var status = [];
        status[0]=-1;

        // var page = store.currentPage;

        // if (limit == null) {
        //     limit = 25;
        // }

        // if (page == null) {
        //     page = 1;
        // }
        // store.loadStore(orgid_from_link, stockindate_from, stockindate_to, stockintypeid_link, status, limit, page);
        store.loadStore_Material(null, stockindate_from, stockindate_to, null, status, null, null, null);
    },
    onStockin_Order_Code_FilterKeyup:function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockin_Order_Store');
            // Access the field using its "reference" property name.
        var filterField = this.lookupReference('stockin_order_code_filter');
        var filters = store.getFilters();

        if (filterField.value) {
            this.stockin_order_code_filter = filters.add({
                id: 'stockin_order_code_filter',
                property: 'stockincode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockin_order_code_filter) {
            filters.remove(this.stockin_order_code_filter);
            this.stockin_order_code_filter = null;
        }
    },
    onStockin_Order_Invoice_FilterKeyup:function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockin_Order_Store');
            // Access the field using its "reference" property name.
        var filterField = this.lookupReference('stockin_order_invoice_filter');
        var filters = store.getFilters();

        if (filterField.value) {
            this.stockin_order_invoice_filter = filters.add({
                id: 'invoice_numberFilter',
                property: 'invoice_number',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockin_order_invoice_filter) {
            filters.remove(this.stockin_order_invoice_filter);
            this.stockin_order_invoice_filter = null;
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
})