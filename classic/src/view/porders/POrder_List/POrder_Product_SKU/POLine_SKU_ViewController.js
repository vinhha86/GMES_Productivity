Ext.define('GSmartApp.view.porders.POrder_List.POrder_Product_SKU.POLine_SKU_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POLine_SKU_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
    },
    control: {
        
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    }
})