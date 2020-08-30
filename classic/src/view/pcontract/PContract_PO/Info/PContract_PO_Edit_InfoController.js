Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_InfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_InfoController',
    onShipDateChange: function(newValue, oldValue, eOpts ){
        this.recalProductionDate();
    },
    onMatDateChange: function(newValue, oldValue, eOpts ){
        this.recalProductionDate();
    },
    onProductionDateChange: function(newValue, oldValue, eOpts ){
        this.recalProductionDays();
    },
    recalProductionDate: function(){
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        var matdate = Ext.Date.parse(po_data.matdate, 'c');
        if (null == matdate) matdate = new Date(po_data.matdate);
        // var dt = Ext.Date.subtract(new Date(po_data.matdate), Ext.Date.DAY, -7);
        // var dt = Ext.Date.subtract(Ext.Date.parse(po_data.matdate, 'c'), Ext.Date.DAY, -7);
        var dt = Ext.Date.subtract(matdate, Ext.Date.DAY, -7);
        viewmodel.set('po.productiondate',dt);
        // console.log(dt); // returns 'Tue Oct 24 2006 00:00:00'
        
        var productiondate = Ext.Date.parse(po_data.productiondate, 'c');
        if (null == productiondate) productiondate = new Date(po_data.productiondate);
        // console.log(productiondate);
        var shipdate = Ext.Date.parse(po_data.shipdate, 'c');
        if (null == shipdate) shipdate = new Date(po_data.shipdate);
        // console.log(shipdate);
        var days = Ext.Date.diff(productiondate, shipdate, 'd');
        // console.log(days);
        viewmodel.set('po.productiondays',days);
    },
    recalProductionDays: function(){
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');

        var productiondate = Ext.Date.parse(po_data.productiondate, 'c');
        if (null == productiondate) productiondate = new Date(po_data.productiondate);
        // console.log(productiondate);
        var shipdate = Ext.Date.parse(po_data.shipdate, 'c');
        if (null == shipdate) shipdate = new Date(po_data.shipdate);
        // console.log(shipdate);

        var days = Ext.Date.diff(productiondate, shipdate, 'd');
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
        if(priceStore!= null) {
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
                price_root.quantity = parseFloat(po_data.po_quantity.replace(/,/gi,''));
            }      
            priceStore.clearFilter();       
            priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));  
        }
              
    },
    onSewTarget_PercentChange: function(){
        
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        
        var po_price_data = viewmodel.get('po_price');
        if (null != po_data && null != po_price_data)
        if (null != po_price_data.price_cmp && null != po_data.exchangerate && null != po_data.sewtarget_percent){
            po_price_data.price_sewingtarget = (po_price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100;
            viewmodel.set('po_price',po_price_data);

            //Update gia tri Sew target tai tat ca cac san pham
            var priceStore = viewmodel.getStore('PriceStore');
            priceStore.clearFilter(); 
            for(var k =0; k<priceStore.data.length; k++){
                var price_data = priceStore.data.items[k].data;
                price_data.price_sewingtarget = (price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100;
            }      
    
            priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
        }
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