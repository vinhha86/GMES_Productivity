Ext.define('GSmartApp.view.process_shipping.POrder.POrderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderViewController',
    init: function () {

    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    }
})