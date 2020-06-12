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
        var po_data = viewmodel.get('plan');
        var dt = Ext.Date.subtract(new Date(po_data.matdate), Ext.Date.DAY, -7);
        viewmodel.set('plan.productiondate',dt);
        console.log(dt); // returns 'Tue Oct 24 2006 00:00:00'

        var days = Ext.Date.diff(new Date(po_data.productiondate), new Date(po_data.shipdate), 'd');
        console.log(days);
        viewmodel.set('plan.productiondays',days);
    },
    onPOBuyerChange: function() {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('plan.po_vendor').length == 0){
            viewmodel.set('plan.po_vendor', viewmodel.get('plan.po_buyer'));
        }
    }
})