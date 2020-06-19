Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_PriceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_PriceController',
    control: {      
        '#btnThemMoiGia': {
            click: 'onThemMoiGia'
        },
    },    
    onThemMoiGia : function(){
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách giá',
            closeAction: 'destroy',
            height: 400,
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_FOB_Price'
            }]
        });
        form.show();

        form.down('#PContract_FOB_Price').getController().on('SelectPrice', function (select) {
            var priceStore = viewmodel.getStore('PriceStore');
            // console.log(priceStore);
            var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
            // var viewPrice = Ext.getCmp('PContract_PO_Edit_Price');
            // var storeDPrice = viewPrice.getView().getStore();
            var Price_DStore = viewmodel.getStore('Price_DStore');

            for(var i=0;i<select.length;i++){
                var data = select[i].data;
                var rec = Price_DStore.findRecord('fobpriceid_link', data.id);
                if(rec == null) {
                    priceStore.clearFilter();
                    for(var k =0; k<priceStore.data.length; k++){
                        var pdata = priceStore.data.items[k].data;
                        var newPriceD = new Object({
                            id: null,
                            fobprice_name : data.name,
                            fobpriceid_link: data.id,
                            price : 0,
                            cost: 0,
                            isfob: data.id != 1?true:false,
                            productid_link: pdata.productid_link
                        })                        
                        pdata.pcontract_price_d.push(newPriceD);
                    };  
                    // console.log(priceStore);
                    priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
                    // console.log(viewSizeset.getView().selection.data.pcontract_price_d);
                    
                    Price_DStore.loadData(viewSizeset.getView().selection.data.pcontract_price_d);

                }
            }
            form.close();
        })
    },
    onPriceDItemEdit: function(editor, e){
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        var Price_DStore = viewmodel.getStore('Price_DStore');
        var priceD_data = e.record.data;
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        var price_data = viewSizeset.getView().selection.data;

        if (priceD_data.fobpriceid_link == 1){
            price_data.price_cmp = priceD_data.price;

            //Tinh gia Sweing Target
            price_data.price_sewingtarget = (price_data.price_cmp*po_data.exchangerate)*price_data.sewfobratio/100;
        }
        
        //SUM FOB Price
        Price_DStore.filter('isfob',true);
        var fobSum = Price_DStore.sum('price');
        Price_DStore.clearFilter();
        price_data.price_fob = fobSum;
        var totalprice = price_data.price_cmp + price_data.price_fob;
        price_data.totalprice = totalprice;
        // console.log(totalprice);
        
        viewmodel.set('po_price',price_data);
        this.calRootPairProductPrice(price_data.sizesetid_link);
    },

    //Cong don cho bo san pham
    calRootPairProductPrice: function(sizesetid_link){
        var viewmodel = this.getViewModel();
        console.log(viewmodel.get('productpairid_link'));
        if (viewmodel.get('isproductpair') == 1){
            var priceStore = viewmodel.getStore('PriceStore');
            filters = priceStore.getFilters();

            filters.add({
                // id: 'porderFilter',
                property: 'productid_link',
                operator: '!=',
                value: viewmodel.get('productpairid_link'),
                anyMatch: true,
                caseSensitive: false
            });
            filters.add({
                // id: 'porderFilter',
                property: 'sizesetid_link',
                operator: '=',
                value: sizesetid_link,
                anyMatch: true,
                caseSensitive: false
            });

            var sum_price_cmp = priceStore.sum('price_cmp');
            var sum_price_fob = priceStore.sum('price_fob');
            var sum_price_sewingtarget = priceStore.sum('price_sewingtarget');
            var sum_price_sewingcost = priceStore.sum('price_sewingcost');
            var sum_totalprice = priceStore.sum('totalprice');
            // console.log(sum_price_cmp);
            // console.log(sum_price_fob);
            // console.log(sum_price_sewingtarget);
            // console.log(sum_price_sewingcost);
            // console.log(sum_totalprice);

            priceStore.clearFilter();
            filters.add({
                // id: 'porderFilter',
                property: 'productid_link',
                operator: '=',
                value: viewmodel.get('productpairid_link'),
                anyMatch: true,
                caseSensitive: false
            });
            filters.add({
                // id: 'porderFilter',
                property: 'sizesetid_link',
                operator: '=',
                value: sizesetid_link,
                anyMatch: true,
                caseSensitive: false
            });
            for(var k =0; k<priceStore.data.length; k++){
                var price_root = priceStore.data.items[k].data;
                price_root.price_cmp = sum_price_cmp;
                price_root.price_fob = sum_price_fob;
                price_root.price_sewingtarget = sum_price_sewingtarget;
                price_root.price_sewingcost = sum_price_sewingcost;
                price_root.totalprice = sum_totalprice;
                console.log(price_root);
            };  
            priceStore.clearFilter();
            priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
        }
    },
    onCurrencyItemSelected: function (sender, record) {
    },
    onExchangeRateChange: function (sender, newValue, oldValue, eOpts) {
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        if (null != viewSizeset.getView().selection){
            var price_data = viewSizeset.getView().selection.data;
            //Tinh gia Sweing Target
            price_data.price_sewingtarget = (price_data.price_cmp*po_data.exchangerate)*price_data.sewfobratio/100;
            viewmodel.set('po_price',price_data);
        }
    },
})