Ext.define('GSmartApp.view.balance.PContractProduct_PoLineViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProduct_PoLineViewController',
    init: function () {
        
    },
    control: {
        '#PContractProduct_PoLineView': {
            afterrender: 'onAfterrender'
        },
        // '#btnLuu': {
        //     click: 'onLuu'
        // }
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var PContract_PO = viewModel.getStore('PContract_PO');
        PContract_PO.getSorters().removeAll();
        PContract_PO.getSorters().add({
            property: 'shipdate',
            direction: 'ASC'
        },{
            property: 'po_buyer',
            direction: 'ASC'
        });

        PContract_PO.setGroupField('shipmonth');
    }
})