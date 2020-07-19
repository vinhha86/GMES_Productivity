Ext.define('GSmartApp.view.porders.POrder_List.POrder_ProductSKUViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_ProductSKUViewController',
    isActivate: false,
    init: function () {
    },
    control: {
        // '#POrder_ProductSKUView': {
        //     activate: 'onActivate',
        //     // itemdblclick: 'onitemdblclick',
        //     itemclick: 'onItemClick',
        //     celldblclick: 'onCellDblclick',
        // }
    },
    loadInfo: function (id) {
        let me = this.getView();
        let t = this;

        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('porderSKUStore');
        store.loadByPorderID(id);
        console.log(id);
    },
})