Ext.define('GSmartApp.view.process_shipping.POrder.POrder_Offer_viewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Offer_viewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListStore');
        var pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        store.loadbyOffer(pcontract_poid_link);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    }
})