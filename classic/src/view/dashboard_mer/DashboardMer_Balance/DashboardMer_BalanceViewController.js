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
    on_dashboard_select_poline: function(record){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        me.setDisabled(false);
        // console.log(record);

        // var productid_link = record.get('productid_link');
        // var pcontractid_link = record.get('pcontractid_link');

        // var PContractProduct_PO_Store = viewModel.getStore('PContractProduct_PO_Store');
        // PContractProduct_PO_Store.loadStore_bypairid_Async(productid_link, record.get('po_quantity'), true, pcontractid_link);
        // PContractProduct_PO_Store.load({
        //     scope: this,
        //     callback: function (records, operation, success) {

        //         var firstRecord = PContractProduct_PO_Store.getAt(0);
        //         var cmbSanPham = me.down('#cmbSanPham');
        //         cmbSanPham.select(firstRecord);
        //         // viewModel.set('IdProduct', record.get('id'));
        //         // viewModel.set('Product_pquantity', firstRecord.get('pquantity'));
        //         // console.log(record);
        //         //clear sku list
        //         var PContractSKUStore = viewModel.getStore('PContractSKUStore');
        //         PContractSKUStore.removeAll();
        //         PContractSKUStore.loadStoreByPO_and_Product(firstRecord.get('id'), record.get('id'));
        //     }
        // });
    },

    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
});
