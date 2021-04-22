Ext.define('GSmartApp.view.process_shipping.SizeBreakdown.POLineSKU_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POLineSKU_ViewController',
    init: function () {

    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    }
})