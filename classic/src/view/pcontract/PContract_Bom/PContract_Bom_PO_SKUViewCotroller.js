Ext.define('GSmartApp.view.pcontract.PContract_Bom_PO_SKUViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_PO_SKUViewCotroller',
    control: {

    },
    init: function () {
        var viewmodel = this.getViewModel();
    },
    onEdit: function (editor, context, e) {

    },
    renderSum: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000');
    }
})