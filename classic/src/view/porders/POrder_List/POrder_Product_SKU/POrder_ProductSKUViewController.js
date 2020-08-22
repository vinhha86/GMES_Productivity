Ext.define('GSmartApp.view.porders.POrder_List.POrder_ProductSKUViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_ProductSKUViewController',
    init: function () {
        // let me = this.getView();
        // this.loadInfo(me.IdPOrder);
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
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,
})