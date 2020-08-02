Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_PriceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_PriceController',
    init: function(){
        var viewmodel = this.getViewModel();
        var UnitStore = viewmodel.getStore('UnitStore');
        UnitStore.loadStore();
    },
    control: {      
        '#btnThemMoiGia': {
            click: 'onThemMoiGia'
        },
        '#btnPriceCopy': {
            click: 'onPriceCopy'
        },
        '#btnPricePaste': {
            click: 'onPricePaste'
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

        //Neu la gia CMP --> Tinh Sew tager
        if (priceD_data.fobpriceid_link == 1){
            price_data.price_cmp = priceD_data.price;

            //Tinh gia Sweing Target
            price_data.price_sewingtarget = Math.round((price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100);
        } else {
            //Tinh gia theo dinh muc va gia don vi
            if (e.colIdx == 1 || e.colIdx == 3)
                priceD_data.price = Ext.Number.roundToPrecision(priceD_data.quota*priceD_data.unitprice,2);
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

        //Neu khong phai la sizesetAll --> Tinh toan cho SizesetAll cua san pham do
        if (price_data.sizesetid_link != 1){
            this.calPrice_SizesetAll(viewmodel.get('product_selected_id_link'));
        }

        //Tinh SisetAll cho san pham cha
        this.calPrice_PairProduct();
    },

    
    //Cong don cho sizeset ALL theo binh quan gia quyen
    calPrice_SizesetAll: function(productid){
        var viewmodel = this.getViewModel();
        // if (viewmodel.get('isproductpair') == 1){
        var priceStore = viewmodel.getStore('PriceStore');
        filters = priceStore.getFilters();

        filters.add({
            // id: 'porderFilter',
            property: 'productid_link',
            operator: '=',
            value: productid,
            anyMatch: true,
            caseSensitive: false
        });
        filters.add({
            // id: 'porderFilter',
            property: 'sizesetid_link',
            operator: '!=',
            value: 1,
            anyMatch: true,
            caseSensitive: false
        });

        var sum_price_cmp = 0;
        var sum_price_fob = 0;
        var sum_price_sewingtarget = 0;
        var sum_price_sewingcost = 0;
        var sum_totalprice = 0;
        var sum_quantity=0;
        //Tinh binh quan gia quyen gia san pham
        for(var i =0; i<priceStore.data.length; i++){
            var price_sizeset = priceStore.data.items[i].data;
            sum_price_cmp = sum_price_cmp + price_sizeset.price_cmp*price_sizeset.quantity;
            sum_price_fob = sum_price_fob + price_sizeset.price_fob*price_sizeset.quantity;
            sum_price_sewingtarget = Math.round(sum_price_sewingtarget + price_sizeset.price_sewingtarget*price_sizeset.quantity);
            sum_price_sewingcost = sum_price_sewingcost + price_sizeset.price_sewingcost*price_sizeset.quantity;
            sum_totalprice = sum_totalprice + price_sizeset.totalprice*price_sizeset.quantity;
            sum_quantity = sum_quantity + price_sizeset.quantity;
        }

        priceStore.clearFilter();
        filters.add({
            // id: 'porderFilter',
            property: 'productid_link',
            operator: '=',
            value: productid,
            anyMatch: true,
            caseSensitive: false
        });
        filters.add({
            // id: 'porderFilter',
            property: 'sizesetid_link',
            operator: '=',
            value: 1,
            anyMatch: true,
            caseSensitive: false
        });
        if (sum_quantity > 0){
            for(var k =0; k<priceStore.data.length; k++){
                var price_SizesetALL = priceStore.data.items[k].data;
                price_SizesetALL.price_cmp = Ext.Number.roundToPrecision(sum_price_cmp/sum_quantity,2);
                price_SizesetALL.price_fob = Ext.Number.roundToPrecision(sum_price_fob/sum_quantity,2);
                price_SizesetALL.price_sewingtarget = Math.round(sum_price_sewingtarget/sum_quantity);
                price_SizesetALL.price_sewingcost =Math.round(sum_price_sewingcost/sum_quantity);
                price_SizesetALL.totalprice = Ext.Number.roundToPrecision(sum_totalprice/sum_quantity,2);
                // console.log(price_SizesetALL);
            };  
        }

        priceStore.clearFilter();
        priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
       
        // }
    },
    calPrice_PairProduct: function(){
        var viewmodel = this.getViewModel();
        if (viewmodel.get('isproductpair') == 1){
            //Cong don ca SizesetAll tai cac san pham con
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
                value: 1,
                anyMatch: true,
                caseSensitive: false
            });

            var sum_price_cmp = priceStore.sum('price_cmp');
            var sum_price_fob = priceStore.sum('price_fob');
            var sum_price_sewingtarget = priceStore.sum('price_sewingtarget');
            var sum_price_sewingcost = priceStore.sum('price_sewingcost');
            var sum_totalprice = priceStore.sum('totalprice');
            var sum_salaryfund = priceStore.sum('salaryfund');       
            
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
                value: 1,
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
                price_root.salaryfund = sum_salaryfund;
            };  

            priceStore.clearFilter();
            priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
        }
    },
    onCurrencyItemSelected: function (sender, record) {
        var viewmodel = this.getViewModel();
        viewmodel.set('po.exchangerate',record.data.exchangerate);
        this.onExchangeRateChange();
    },
    onExchangeRateChange: function () {
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        var priceStore = viewmodel.getStore('PriceStore');
        for(var k =0; k<priceStore.data.length; k++){
            var price_data = priceStore.data.items[k].data;
            price_data.price_sewingtarget = Math.round((price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100);
        }
        //Tinh toan lai SizesetAll cho tat ca cac san pham
        var productStore = viewmodel.getStore('ProductStore');
        for(var i =0; i<productStore.data.length; i++){
            var product_data = productStore.data.items[i].data;
            this.calPrice_SizesetAll(product_data.id);
        }

        //Tinh SisetAll cho san pham cha
        this.calPrice_PairProduct();

        //Hien lai thong tin tren SumUp cua Siseset dc chon sau khi tinh toan lai
        var price_data = viewmodel.get('po_price');
        price_data.price_sewingtarget = Math.round((price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100);
        viewmodel.set('po_price',price_data);
        console.log(viewmodel.get('po_price'));
    },
    renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewmodel = this.getViewModel();
            var UnitStore = viewmodel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
     },
     onPriceD_Delete: function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var me=this;
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        var Price_DStore = viewmodel.getStore('Price_DStore');
        var price_data = viewSizeset.getView().selection.data;

        Ext.Msg.show({
            title: "Thông báo",
            msg: 'bạn có chắc chắn muốn xóa dòng chi tiết giá?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function(btn){
                if(btn==='yes'){
                    var objDel = grid.getStore().getAt (rowIndex);
                    grid.getStore().remove(objDel);

                    //Xoa dong gia khoi tat ca cac san pham va sizeset
                    me.deletePrice_FOB_AllSizeset(me, objDel.data.fobpriceid_link);

                    //SUM FOB Price
                    Price_DStore.filter('isfob',true);
                    var fobSum = Price_DStore.sum('price');
                    Price_DStore.clearFilter();
                    price_data.price_fob = fobSum;
                    var totalprice = price_data.price_cmp + price_data.price_fob;
                    price_data.totalprice = totalprice;
                    // console.log(totalprice);
                    
                    viewmodel.set('po_price',price_data);                    
                }
            }
        });
     },
     deletePrice_FOB_AllSizeset: function(me, fobpriceid_link){
        var viewmodel = this.getViewModel();
        var priceStore = viewmodel.getStore('PriceStore');
        priceStore.clearFilter();
        priceStore.each(function (rec_price) {
            var arrPrice = []; 
            var arrPrice_d = rec_price.data.pcontract_price_d;
            for(i=0; i<arrPrice_d.length; i++){
                if (arrPrice_d[i].fobpriceid_link != fobpriceid_link)
                    arrPrice.push(arrPrice_d[i]);
            }
            rec_price.data.pcontract_price_d = arrPrice;
            //Tinh toan lai gia cua bo
            me.calPrice_SizesetAll(rec_price.data.productid_link);            
        });  

        //Tinh SisetAll cho san pham cha
        this.calPrice_PairProduct();
        
        priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
     },
     onPriceCopy: function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('po_price_copy', viewmodel.get('po_price'));
     },
     onPricePaste: function(){
        var viewmodel = this.getViewModel();
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        var price_data = viewSizeset.getView().selection.data;
        // console.log(price_data);

        //Tao ban copy voi product va sizeset cua san pham dang chon
        var po_price = viewmodel.get('po_price');
        var po_price_copy = viewmodel.get('po_price_copy');
        po_price.price_cmp = po_price_copy.price_cmp;
        po_price.price_fob = po_price_copy.price_fob;
        po_price.price_sewingtarget = po_price_copy.price_sewingtarget;
        po_price.price_sewingcost = po_price_copy.price_sewingcost;
        po_price.totalprice = po_price_copy.totalprice;
        po_price.salaryfund = po_price_copy.salaryfund;
        po_price.pcontract_price_d = po_price_copy.pcontract_price_d;

        //Copy value vao sizeset cua sp dang chon trong Viewmodel
        // viewmodel.set('po_price', po_price_copy);
        // console.log(viewmodel.get('po_price'));

        //Copy value vao sizeset cua sp dang chon trong Store
        var priceStore = viewmodel.getStore('PriceStore');
        var rec = priceStore.findRecord('id', price_data.id);
        rec.data = viewmodel.get('po_price');

        //Refresh chi tiet gia
        var Price_DStore = viewmodel.getStore('Price_DStore');
        Price_DStore.loadData(viewmodel.get('po_price.pcontract_price_d'));
        
        //Tinh toan lai SizesetAll cho tat ca cac san pham
        var productStore = viewmodel.getStore('ProductStore');
        for(var i =0; i<productStore.data.length; i++){
            var product_data = productStore.data.items[i].data;
            this.calPrice_SizesetAll(product_data.id);
        }

        //Tinh SisetAll cho san pham cha
        this.calPrice_PairProduct();

        //Hien lai thong tin tren SumUp cua Siseset dc chon sau khi tinh toan lai
        var price_data = viewmodel.get('po_price');
        price_data.price_sewingtarget = Math.round((price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100);
        viewmodel.set('po_price',price_data);
     }
})