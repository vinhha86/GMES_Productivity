Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_GrantViewController',
    init: function () {
    },
    control: {
        '#POrder_List_GrantView': {
            // activate: 'onActivate',
            // itemdblclick: 'onitemdblclick',
            itemclick: 'onItemClick',
            // celldblclick: 'onCellDblclick',
        }
    },
    loadInfo: function (id) {
        let me = this.getView();
        let t = this;

        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('POrder_ListGrantStore');
        store.loadStore(id);
    },
    onItemClick: function(thisView, record, item, index, e, eOpts){
        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('POrder_ListGrantSKUStore');
        store.loadStore(record.data.id);
    }
})