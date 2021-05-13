Ext.define('GSmartApp.view.stockin.Stockout_M_List_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_List_Main_Controller',
    init: function(){
        var viewModel = this.getViewModel();
		var UnitStore = viewModel.getStore('UnitStore');
		UnitStore.loadStore();
    },
    control: {
        '#Stockout_M_List': {
            select: 'onStockoutSelect'
        },
    },
    onStockoutSelect: function (e, selected, eOpts) {
        // console.log(selected);
        var viewmodel = this.getViewModel();
        var StockoutD_Store = viewmodel.getStore('StockoutD_Store');
        StockoutD_Store.removeAll();
        StockoutD_Store.setData(selected.data.stockout_d);
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