Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantSKUViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_GrantSKUViewController',
    init: function () {
    },
    control: {
        // '#POrder_List_GrantSKUView': {
        //     activate: 'onActivate',
        //     // itemdblclick: 'onitemdblclick',
        //     itemclick: 'onItemClick',
        //     celldblclick: 'onCellDblclick',
        // }
    },
    // loadInfo: function (id) {
    //     let me = this.getView();
    //     let t = this;

    //     let viewmodel = this.getViewModel();
    //     let store = viewmodel.getStore('POrder_ListGrantStore');
    //     store.loadStore(id);
    // },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,
})