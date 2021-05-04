Ext.define('GSmartApp.view.pcontract.PCotnract_Bom_PO_VIewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PCotnract_Bom_PO_VIewController',
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    init: function () {
    },
    onThoat: function () {
        me.fireEvent('Thoat');
    }
})