Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_InfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_InfoController',
    onShipDateChange: function(newValue, oldValue, eOpts ){
        this.recalProductionDate();
    },
    onMatDateChange: function(newValue, oldValue, eOpts ){
        this.recalProductionDate();
    },   
    recalProductionDate: function(){
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        var dt = Ext.Date.subtract(new Date(po_data.matdate), Ext.Date.DAY, -7);
        viewmodel.set('po.productiondate',dt);
        console.log(dt); // returns 'Tue Oct 24 2006 00:00:00'

        var days = Ext.Date.diff(new Date(po_data.productiondate), new Date(po_data.shipdate), 'd');
        console.log(days);
        viewmodel.set('po.productiondays',days);
    },
    onPOBuyerChange: function() {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('po.po_vendor').length == 0){
            viewmodel.set('po.po_vendor', viewmodel.get('po.po_buyer'));
        }
    }
})