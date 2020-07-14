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
        // console.log(dt); // returns 'Tue Oct 24 2006 00:00:00'

        var days = Ext.Date.diff(new Date(po_data.productiondate), new Date(po_data.shipdate), 'd');
        // console.log(days);
        viewmodel.set('po.productiondays',days);
    },
    onPOBuyerChange: function() {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('po.po_vendor').length == 0){
            viewmodel.set('po.po_vendor', viewmodel.get('po.po_buyer'));
        }
    },
    onPOQuantityChange: function(){
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        //Update gia tri SizesetALl tai tat ca cac san pham
        var priceStore = viewmodel.getStore('PriceStore');
        priceStore.clearFilter(); 
        filters = priceStore.getFilters();
        filters.add({
            // id: 'porderFilter',
            property: 'sizesetid_link',
            operator: '=',
            value: 1,
            anyMatch: true,
            caseSensitive: false
        });    
        for(var k =0; k<priceStore.data.length; k++){
            var price_root = priceStore.data.items[k].data;
            price_root.quantity = po_data.po_quantity;
        }      
        priceStore.clearFilter();       
        priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));        
    },
    onIs_Tbd_Change: function(e, newValue, oldValue, eOpts){
        var viewmodel = this.getViewModel();
        if(newValue){
            viewmodel.set('po.po_buyer','TBD');
            viewmodel.set('po.po_vendor','TBD');
            viewmodel.set('isPO_BuyerDisable',true);
            viewmodel.set('isPO_VendorDisable',true);
        } else {
            viewmodel.set('po.po_buyer','');
            viewmodel.set('po.po_vendor','');
            viewmodel.set('isPO_BuyerDisable',false);
            viewmodel.set('isPO_VendorDisable',false);            
        }
    }
})