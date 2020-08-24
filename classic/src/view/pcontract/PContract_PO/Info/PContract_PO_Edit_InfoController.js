Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_InfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_InfoController',
    onShipDateChange: function(field){
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        if(viewmodel.get('po.matdate') == null) return;

        grid.setLoading('Đang tính toán dữ liệu!');

        var params = new Object();
        params.date_material = viewmodel.get('po.matdate');
        params.amount_day = 7;
        params.shipdate = field.getValue();

        GSmartApp.Ajax.post('/api/v1/pcontract_po/get_productiondate', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        viewmodel.set('po.productiondate',response.productiondate);
                        viewmodel.set('po.productiondays',response.duration);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Có lỗi trong quá trình tính dữ liệu! Bạn hãy thử lại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                field.expand();
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Có lỗi trong quá trình tính dữ liệu! Bạn hãy thử lại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function(){
                            field.expand();
                        }
                    });
                }
            })
    },
    onMatDateChange: function(field){
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        if(viewmodel.get('po.shipdate') == null) return;

        grid.setLoading('Đang tính toán dữ liệu!');

        var params = new Object();
        params.date_material = field.getValue();
        params.amount_day = 7;
        params.shipdate = viewmodel.get('po.shipdate');


        GSmartApp.Ajax.post('/api/v1/pcontract_po/get_productiondate', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        viewmodel.set('po.productiondate',response.productiondate);
                        viewmodel.set('po.productiondays',response.duration);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Có lỗi trong quá trình tính dữ liệu! Bạn hãy thử lại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                field.expand();
                            }
                        });
                    }
                }
                else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Có lỗi trong quá trình tính dữ liệu! Bạn hãy thử lại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function(){
                            field.expand();
                        }
                    });
                }
            })

        
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
                if(po_data.po_quantity!=null)
                    price_root.quantity = parseFloat(po_data.po_quantity.toString().replace(/,/gi,''));
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