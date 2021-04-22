Ext.define('GSmartApp.view.process_shipping.SizeBreakdown.POrderSKUViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderSKUViewController',
    init: function () {

    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    }
})