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
        '#PContract_PO_Edit_Price': {
            // beforecelldblclick: 'onBeforePriceCellDblClick',
            celldblclick: 'onPriceCellDblClick'
        }
    },
    // onBeforePriceCellDblClick: function( thisView, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
    //     // 4: NPL, 2: NCC
    //     if(rowIndex == 0){
    //         return false;
    //     }
    //     if(cellIndex != 3 && cellIndex != 5){
    //         return false;
    //     }
    // },
    onPriceCellDblClick: function(thisView, td, cellIndex, record, tr, rowIndex, e, eOpts ){
        var m = this;
        if(cellIndex == 4){
            // NPL
            m.ThemMoiMaterialIdLink(record);
        }
        if(cellIndex == 2){
            // NCC
            m.ThemMoiProvider(record);
        }
    },
    ThemMoiMaterialIdLink: function(record){
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();

        var form = Ext.create({
            xtype: 'skusearchwindow',
            width: 1200,
            height: 500,       
            reference: 'skusearchwindow',
            closeAction: 'destroy',
            viewModel: {
                data: {
                    sourceview: 'PContract_PO_Edit_Price',
                    searchtype: 5,
                    // pcontractid_link: viewmodel.get('PContract.id'),
                    // productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
                }
            }
        });
        form.show();

        form.getController().on('AddMaterialIdLink', function (rec) {
            
            var materialid_link = rec.get('id');
            var materialCode = rec.get('code');

            record.set('materialid_link', materialid_link);
            record.set('materialCode', materialCode);

            form.close();
        })
    },
    ThemMoiProvider: function(record){
        var viewModel = this.getViewModel();
        var me = this.getView();
        var m = this;

        var record = record;

        var form = Ext.create('Ext.window.Window', {
            height: 500,
            width: 400,
            closable: true,
            title: 'Danh sách Provider',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'PContract_PO_Edit_Price_Provider',
                viewModel: {
                    type: 'PContract_PO_Edit_Price_ProviderViewModel',
                    data: {
                        record: record
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_Edit_Price_Provider').getController().on('AddProvider', function (select) {
            // console.log(select);
            // console.log(record);
            for(var i=0;i < select.length;i++){
                // record.data.productid_link = select[i].data.id;
                // record.data.providerCode = select[i].data.code;
                record.set('providerid_link', select[i].data.id);
                record.set('providerCode', select[i].data.code);
            }
        })
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
    onPriceDItemBeforeEdit: function(editor, e){
        var priceD_data = e.record.data;
        if (priceD_data.fobpriceid_link == 1 && e.field != 'price'){
            return false;
        } else {
            return true
        }
    },
    onPriceDItemEdit: function(editor, e){
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        if (null == po_data.exchangerate) po_data.exchangerate = 0;
        po_data.exchangerate = parseFloat(po_data.exchangerate.toString().replace(/,/gi,''));

        var Price_DStore = viewmodel.getStore('Price_DStore');
        var priceD_data = e.record.data;
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        var price_data = viewSizeset.getView().selection.data;

        //Neu la gia CMP --> Tinh Sew tager
        if (priceD_data.fobpriceid_link == 1){
            price_data.price_cmp = priceD_data.price;

            //Tinh gia Sweing Target
            price_data.price_sewingtarget = Math.round((price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100);
            // price_data.price_sewingtarget = Ext.Number.roundToPrecision((price_data.price_cmp*po_data.exchangerate)*(po_data.sewtarget_percent/100),0);
        } else {
            //Tinh gia theo dinh muc va gia don vi
            if (e.colIdx == 5 || e.colIdx == 7)
                priceD_data.price = Ext.Number.roundToPrecision(priceD_data.quota*priceD_data.unitprice,3);
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

        //Tinh SizesetAll cho san pham cha
        this.calPrice_PairProduct();
    },

    
    //Cong don cho sizeset ALL theo binh quan gia quyen
    calPrice_SizesetAll: function(productid){
        // console.log(productid);
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
                price_SizesetALL.price_cmp = Ext.Number.roundToPrecision(sum_price_cmp/sum_quantity,3);
                price_SizesetALL.price_fob = Ext.Number.roundToPrecision(sum_price_fob/sum_quantity,3);
                price_SizesetALL.price_sewingtarget = Math.round(sum_price_sewingtarget/sum_quantity);
                price_SizesetALL.price_sewingcost =Math.round(sum_price_sewingcost/sum_quantity);
                price_SizesetALL.totalprice = Ext.Number.roundToPrecision(sum_totalprice/sum_quantity,3);
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
            for (i=0;i <priceStore.data.length; i++){
                var curSizeset = priceStore.data.items[i];
                // console.log(curSizeset);

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
                    // value: 1,
                    value: curSizeset.data.sizesetid_link,
                    anyMatch: true,
                    caseSensitive: false
                });
    
                var sum_price_cmp = priceStore.sum('price_cmp');
                var sum_price_fob = priceStore.sum('price_fob');
                var sum_price_sewingtarget = Math.round(priceStore.sum('price_sewingtarget'));
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
                    // value: 1,
                    value: curSizeset.data.sizesetid_link,
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
        }
    },
    onCurrencyItemSelected: function (sender, record) {
        var viewmodel = this.getViewModel();
        
        var exchangerate = record.data.exchangerate;
        // var result = Ext.util.Format.number(exchangerate, '0,000.00');
        var result = Math.round(exchangerate);
        viewmodel.set('po.exchangerate',result);
        this.onExchangeRateChange();
    },
    onExchangeRateChange: function () {
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po');
        po_data.exchangerate = parseFloat(po_data.exchangerate.toString().replace(/,/gi,''));

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
     onMenu_PriceList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            // {
            //     text: 'Thêm chi tiết',
            //     reference: 'addPriceDDetail',
            //     separator: true,
            //     margin: '0',
            //     iconCls: 'x-fa fas fa-plus redIcon',
            //     handler: function() {
            //         var record = this.parentMenu.record;
            //         // console.log(record);
            //         me.addPContractPriceDSKU(record);
            //     }
            // },
            {
                text: 'Xoá chi tiết giá',
                reference: 'deletePriceD',
                separator: true,
                margin: '0 0 0',
                iconCls: 'x-fa fas fa-trash violetIcon',
                handler: function() {
                    // var record = this.parentMenu.record;
                    if(rowIndex != 0){
                        me.onPriceD_Delete(grid, rowIndex, colIndex);
                    }
                }
            }
        ]
        });
          // HERE IS THE MAIN CHANGE
          var position = [e.getX()-10, e.getY()-10];
          e.stopEvent();
          menu_grid.record = record;
          menu_grid.showAt(position);
    },
    addPContractPriceDSKU: function(record){
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();

        var form = Ext.create({
            xtype: 'skusearchwindow',
            width: 1200,
            height: 500,       
            reference: 'skusearchwindow',
            closeAction: 'destroy',
            viewModel: {
                data: {
                    sourceview: 'PContract_PO_Edit_Price',
                    searchtype: 5,
                    // pcontractid_link: viewmodel.get('PContract.id'),
                    // productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
                }
            }
        });
        form.show();

        form.getController().on('AddMaterialIdLink', function (rec) {

            var pcontract_price_d_skus = record.get('pcontract_price_d_sku');

            const found = pcontract_price_d_skus.some(item => item.materialid_link === rec.get('id'));
            if(!found){
                console.log('not found');
                var newPriceDSKU = new Object();
                // newPriceDSKU.id = 0;
                newPriceDSKU.amount = 0;
                newPriceDSKU.totalprice = 0;
                newPriceDSKU.unitprice = 0
                newPriceDSKU.materialid_link = rec.get('id');
                newPriceDSKU.materialCode = rec.get('code');
                pcontract_price_d_skus.push(newPriceDSKU);

                record.set('pcontract_price_d_sku', []);
                record.set('pcontract_price_d_sku', pcontract_price_d_skus);
                console.log(record);
                // viewmodel.getStore('Price_DStore').load();
            }else{
                console.log('found');
            }

            form.close();
        })
    },
    onPriceD_Delete: function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var me=this;
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        var Price_DStore = viewmodel.getStore('Price_DStore');
        var price_data = viewSizeset.getView().selection.data;

        Ext.Msg.show({
            title: "Thông báo",
            msg: 'Bạn có chắc chắn muốn xóa dòng chi tiết giá?',
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
        po_data.exchangerate = parseFloat(po_data.exchangerate.toString().replace(/,/gi,''));
        price_data.price_sewingtarget = Math.round((price_data.price_cmp*po_data.exchangerate)*po_data.sewtarget_percent/100);
        viewmodel.set('po_price',price_data);
     }
})