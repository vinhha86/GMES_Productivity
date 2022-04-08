Ext.define('GSmartApp.view.qcorg.ChartsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.column-stacked-100',

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
        // var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        // SKUBalanceStore.removeAll();
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

    onBarTipRender: function(tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field), //1
            manufacturer = item.series.getTitle()[fieldIndex],
            percent = record.get(item.field) / record.data.Tong * 100;

        tooltip.setHtml(record.get('To') + ' ' + manufacturer + ': ' +
            percent.toFixed(1) + '%');
    },
    onSeriesLabelRender: function(text, sprite, config, rendererData, index) {
        
    },

    onAfterRender: function() {
        var me = this,
            chart = this.lookup('chart'),
            axis = chart.getAxis(0),
            store = chart.getStore();

        function onAxisRangeChange() {
            me.onAxisRangeChange(axis);
        }

        store.on({
            datachanged: onAxisRangeChange,
            update: onAxisRangeChange
        });
    },

    onAxisLabelRender: function(axis, label, layoutContext) {
        return layoutContext.renderer(label) + '%';
    },

});