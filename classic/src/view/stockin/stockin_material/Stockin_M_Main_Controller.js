Ext.define('GSmartApp.view.stockin.Stockin_M_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Main_Controller',
    init: function(){
        var viewModel = this.getViewModel();
		var UnitStore = viewModel.getStore('UnitStore');
		UnitStore.loadStore();
    },
    onPContract_Stockin: function (pcontractid) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontractid_link', pcontractid);

        var store = viewmodel.getStore('StockinStore');
        store.loadStore_Material(null, null, null, null, null, pcontractid, null, null);
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