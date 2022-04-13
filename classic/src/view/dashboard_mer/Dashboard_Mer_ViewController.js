Ext.define('GSmartApp.view.DashboardMer.Dashboard_Mer_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Dashboard_Mer_ViewController',
    init: function () {

    },
    control: {
        '#dashboard_mer': {
            afterrender: 'onAfterrender'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        },
        // searh fields
        '#contract_code': {
            keypress: 'onPressEnterSearch',
        },
        '#product_code': {
            keypress: 'onPressEnterSearch'
        },
        '#po_code': {
            keypress: 'onPressEnterSearch',
        },
        '#buyer': {
            keypress: 'onPressEnterSearch'
        },
        '#vendor': {
            keypress: 'onPressEnterSearch',
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var EndBuyerStore = viewModel.getStore('EndBuyerStore');
        EndBuyerStore.loadStore(12);
        EndBuyerStore.getSorters().add({
            property: 'name',
            direction: 'ASC'
        });
        var VendorStore = viewModel.getStore('VendorStore');
        VendorStore.loadStore(11);
        VendorStore.getSorters().add({
            property: 'name',
            direction: 'ASC'
        });
        m.onSearch();
    },
    onSearch:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var dashboard_mer = Ext.getCmp('dashboard_mer');

        // load biểu đồ theo dõi mã hàng sắp cần giao
        var objSearch = viewModel.get('objSearch');
        var ProductShipDateChartStore = viewModel.getStore('ProductShipDateChartStore');
        ProductShipDateChartStore.loadStore(objSearch);
        m.fireEvent('dashboard_search');
    },
    onPressEnterSearch: function (textfield, e, eOpts) {
		var m = this;
		if (e.getKey() == e.ENTER) {
			m.onSearch();
		}
	},

});