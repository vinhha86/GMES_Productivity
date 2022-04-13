Ext.define('GSmartApp.view.DashboardMer.DashboardMer_Balance.DashboardMer_BalanceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DashboardMer_BalanceViewController',
    init: function () {

    },
    control: {
        // '#DashboardMer_BalanceView': {
        //     itemclick: 'onSelectProduct'
        // },
    },
    listen: {
        controller: {
            'Dashboard_Mer_ViewController': {
                'dashboard_search': 'on_dashboard_search'
            },
            'BarChartProductShipDateViewController': {
                'dashboard_selectBarChartProduct': 'on_selectBarChartProduct'
            },
            'Dashboard_KhoTP_POLine_Controller': {
                'dashboard_select_poline': 'on_dashboard_select_poline'
            }
        }
    },
    on_dashboard_search: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        SKUBalanceStore.removeAll();
        me.setDisabled(true);
    },
    on_selectBarChartProduct: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        SKUBalanceStore.removeAll();
        me.setDisabled(true);
    },
    on_dashboard_select_poline: function(record){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        me.setDisabled(false);
        // console.log(record);

        var productid_link = record.get('productid_link');
        var pcontractid_link = record.get('pcontractid_link');
        var pcontract_poid_link = record.get('id');
        var ls_po = '';
        var list_productid = '';
        list_productid += productid_link + ';';
        ls_po += pcontract_poid_link;

        // list_productid: "4047;"
        // ls_po: "16152;16153"
        // materialid_link: null
        // pcontract_poid_link: null
        // pcontractid_link: 44

        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.list_productid = list_productid;
        params.ls_po = ls_po;
        params.materialid_link = null;
        params.pcontract_poid_link = null;

        me.setLoading(true);
        GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bycontract', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        SKUBalanceStore.setData(response.data);
                    }
                }
            })
    },

    onFilterMaNPLKeyup: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.get('SKUBalanceStore');
        var filterField = this.lookupReference('filterMaNPL');
        var filters = store.getFilters();

        if (filterField.value) {
            this.filterMaNPL = filters.add({
                id: 'filterMaSP',
                property: 'mat_sku_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterMaNPL) {
            filters.remove(this.filterMaNPL);
            this.filterMaNPL = null;
        }
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
});
