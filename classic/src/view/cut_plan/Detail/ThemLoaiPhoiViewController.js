Ext.define('GSmartApp.view.cut_plan.Detail.ThemLoaiPhoiViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ThemLoaiPhoiViewController',
    init: function () {
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#CutPlan_NPL_View': {
            itemclick: 'onSelectNPL'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    }

})