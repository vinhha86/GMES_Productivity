Ext.define('GSmartApp.view.stockout.StockoutOrderPickup_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockoutOrderPickup_Controller',
	init: function() {
        var me = this.getView();
		var viewmodel = this.getViewModel();
		// var OrgProviderStore = viewmodel.getStore('OrgProviderStore');
		// OrgProviderStore.loadStore(3, true);

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockoutorderdate_from').setValue(new Date(priorDate));

        var Stockout_order_Store = viewmodel.getStore('Stockout_order_Store');
        Stockout_order_Store.getSorters().add('stockout_order_code');

        this.onloadPage();
	},
	control: {
		'#StockoutOrderPickup_Main': {
            beforedestroy: 'onDestroy'
        },
        '#StockoutOrderPickup_List': {
            itemclick: 'onStockoutOrderClick'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        }
	},
    onDestroy:function(){
        var store = Ext.getCmp('StockoutOrderPickup_List').getStore();
        store.clearFilter();
    },
    onCloseButton:function(){
        var store = Ext.getCmp('StockoutOrderPickup_List').getStore();
        store.clearFilter();
        this.fireEvent('Thoat');
    },
    onSelectButton: function(){
        var m = Ext.getCmp('StockoutOrderPickup_D');
        var me = this;
        var viewModel = this.getViewModel();
        var stockout_order = viewModel.get('stockout_order');
        
        var select = m.getSelectionModel().getSelection();
        if(select.length > 0){
            me.fireEvent('StockoutOrderPickupSelect', stockout_order, select);
        }
    },
	onloadPage: function () {
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');

        var stockout_order_code = viewModel.get('stockout_order_code');
        var stockoutorderdate_from = me.down('#stockoutorderdate_from').getValue();
		var stockoutorderdate_to = me.down('#stockoutorderdate_to').getValue();
        var orgid_from_link = me.down('#orgid_from_link').getValue();

        
        if (stockout_order_code == null) {
            stockout_order_code = "";
        }

		if (orgid_from_link == null) {
            orgid_from_link = 0;
		}
		
		if (status == null) {
            status = 0;
        }

        Stockout_order_Store.loadStore_byPage_async(
            stockoutorderdate_from, stockoutorderdate_to, 1, 1000);

            Stockout_order_Store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (!success) {
                    this.fireEvent('logout');
                } else {
                    var filterField = m.lookupReference('stockout_orderFilter');
                    filterField.setValue(stockout_order_code);
                    m.onStockout_orderFilterKeyup();
                    m.onOrgFromFilter();
                    m.onOrgToFilter();
                }
            }
        });
    },
    onSearch: function () {
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');

        var stockout_order_code = viewModel.get('stockout_order_code');
        var stockoutorderdate_from = me.down('#stockoutorderdate_from').getValue();
		var stockoutorderdate_to = me.down('#stockoutorderdate_to').getValue();
        var orgid_from_link = me.down('#orgid_from_link').getValue();

        
        if (stockout_order_code == null) {
            stockout_order_code = "";
        }

		if (orgid_from_link == null) {
            orgid_from_link = 0;
		}
		
		if (status == null) {
            status = 0;
        }

        Stockout_order_Store.loadStore_byPage_async(
            stockoutorderdate_from, stockoutorderdate_to, 1, 1000);

            Stockout_order_Store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (!success) {
                    this.fireEvent('logout');
                } 
                else {
                    console.log(records);
                    // var filterField = m.lookupReference('stockout_orderFilter');
                    // filterField.setValue(stockout_order_code);
                    // m.onStockout_orderFilterKeyup();
                }
            }
        });
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSumInteger: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onStockout_orderFilterKeyup:function(){
        var store = Ext.getCmp('StockoutOrderPickup_List').getStore();
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('stockout_orderFilter'),
            filters = store.getFilters();

        // console.log(filterField);

        if (filterField.value) {
            this.stockout_orderFilter = filters.add({
                id: 'stockout_orderFilter',
                property: 'stockout_order_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockout_orderFilter) {
            filters.remove(this.stockout_orderFilter);
            this.stockout_orderFilter = null;
        }
    },
    onOrgFromFilter: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var orgid_from_link = viewModel.get('orgid_from_link');

        var store = Ext.getCmp('StockoutOrderPickup_List').getStore();
        var filters = store.getFilters();

        if(orgid_from_link!=null){
            m.orgFromFilter = filters.add({
                id: 'orgFromFilter',
                property: 'orgid_from_link',
                value: orgid_from_link,
                exactMatch: true
            });
        }
    },
    onOrgToFilter: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var orgid_to_link = viewModel.get('orgid_to_link');

        var store = Ext.getCmp('StockoutOrderPickup_List').getStore();
        var filters = store.getFilters();

        if(orgid_to_link!=null){
            m.orgToFilter = filters.add({
                id: 'orgToFilter',
                property: 'orgid_to_link',
                value: orgid_to_link,
                exactMatch: true
            });
        }
    },
    
    onStockoutOrderClick: function(view, record, item, index, e, eOpts){
        // console.log(record);
        var viewModel = this.getViewModel();
        var stockout_order = record.data;
        var stockout_order_d = record.get('stockout_order_d');

        viewModel.set('stockout_order', stockout_order);
    }
})