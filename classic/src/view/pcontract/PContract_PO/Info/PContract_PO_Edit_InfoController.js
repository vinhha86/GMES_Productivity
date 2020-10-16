Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_InfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_InfoController',
    onShipDateChange: function(newValue, oldValue, eOpts ){
        this.recalProductionDays();
    },
    onMatDateChange: function(newValue, oldValue, eOpts ){
        this.recalProductionDate();
    },
    onProductionDateChange: function(newValue, oldValue, eOpts ){
        this.recalProductionDays();
    },
    recalProductionDate: function(){
        var me = this;
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
        me.onProductivityChange();
    },
    recalProductionDays: function(){
        var me = this;
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
        me.onProductivityChange();
    },
    onPOBuyerChange: function() {
        var viewmodel = this.getViewModel();
        var po_vendor = viewmodel.get('po.po_vendor') == null ? "" : viewmodel.get('po.po_vendor');
        if (po_vendor == "" ){
            viewmodel.set('po.po_vendor', viewmodel.get('po.po_buyer'));
        }
    },
    onProductivityChange: function(){
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        var po_productivity = viewmodel.get('pcontract_po_productivity');

        var po_quantity = po_data.po_quantity == null ? 0 : parseFloat(po_data.po_quantity.toString().replace(/,/gi,''));
        var productivity = po_productivity.plan_productivity == null ? 0 : parseFloat(po_productivity.plan_productivity.toString().replace(/,/gi,''));
        var productiondays = po_data.productiondays;

        if(productiondays <= 0 || productivity == 0){
            viewmodel.set('pcontract_po_productivity.plan_linerequired', 0);
        }
        else {
            var plan_linerequired = Math.round(((po_quantity/productiondays)/productivity) * 10) / 10;
            viewmodel.set('pcontract_po_productivity.plan_linerequired', plan_linerequired);
        }

        //Cap nhat lai trong po
        var productid_link = viewmodel.get('product_selected_id_link');
        var data = new Object();

        for(var i=0; i<po_data.pcontract_po_productivity.length; i++){
            if(po_data.pcontract_po_productivity[i].productid_link == productid_link){
                data = po_data.pcontract_po_productivity[i];
                data.plan_linerequired = viewmodel.get('pcontract_po_productivity.plan_linerequired');
                data.plan_productivity = productivity;

                break;
            }
        }

        if(data.productid_link == null){
            data.productid_link = productid_link;
            data.plan_productivity = productivity;
            data.plan_linerequired = viewmodel.get('pcontract_po_productivity.plan_linerequired');

            po_data.pcontract_po_productivity.push(data);
        }
    },
    onPOQuantityChange: function(){
        var me = this;
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
                price_root.quantity = po_data.po_quantity == null ? 0 : parseFloat(po_data.po_quantity.toString().replace(/,/gi,''));
            }      
            priceStore.clearFilter();       
            priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));  
        }
         
        var porderReqStore = viewmodel.getStore('porderReqStore');
        if(porderReqStore!=null){
            porderReqStore.setGroupField("");
            var po_quantity = po_data.po_quantity == null ? 0 : parseFloat(po_data.po_quantity.toString().replace(/,/gi,''));
            porderReqStore.each(function (record) {
                var amount_inset = record.get('amount_inset') == 0 ? 1 : record.get('amount_inset');

                var amount_req = po_quantity * amount_inset;
                var info = record.get('product_code') + " (" +Ext.util.Format.number(amount_req, '0,000')+")";
                record.set('productinfo', info);
            });
            porderReqStore.setGroupField('productinfo');
        }
        me.onProductivityChange();
    },
    onSewTarget_PercentChange: function(){
        
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        po_data.exchangerate = parseFloat(po_data.exchangerate.toString().replace(/,/gi,''));
        
        var po_price_data = viewmodel.get('po_price');
        if (null != po_data && null != po_price_data)
        if (null != po_price_data.price_cmp && null != po_data.exchangerate && null != po_data.sewtarget_percent){
            po_price_data.price_sewingtarget = Math.round((po_price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100);
            viewmodel.set('po_price',po_price_data);

            //Update gia tri Sew target tai tat ca cac san pham
            var priceStore = viewmodel.getStore('PriceStore');
            priceStore.clearFilter(); 
            for(var k =0; k<priceStore.data.length; k++){
                var price_data = priceStore.data.items[k].data;
                price_data.price_sewingtarget = Math.round((price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100);
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