Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_SizesetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_SizesetController',
    control: {      
        '#btnSizesetSelect': {
            click: 'onSizesetSelect'
        },
        'PContract_PO_Edit_Sizeset': {
            select: 'onItemSelect'
        }
    },    
    onSizesetSelect: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('product_selected_typeid_link') && 5 != viewmodel.get('product_selected_typeid_link')){
            var form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thêm mới dải cỡ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 400,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'PContract_PO_Edit_SizesetSelect',
                    // productid_link: viewmodel.get('productid_link')
                }]
            });
            form.show();
        } else {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Không được thêm mới Dải cỡ cho bộ?',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                },
            });
        }
    },
    onXoa: function(grid, rowIndex, colIndex){
        var me=this;
        var objDel = grid.getStore().getAt (rowIndex);
        //Chi xoa cac Sizeset != ALL
        if (objDel.data.sizesetid_link != 1){
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'bạn có chắc chắn muốn xóa dải cỡ?',
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function(btn){
                    if(btn==='yes'){
                        var colDel = grid.getStore().query('sizesetid_link',objDel.data.sizesetid_link);
                        // console.log(colDel);
                        grid.getStore().remove(colDel.items);

                        for (i=0; i< colDel.items.length; i++){
                            me.calPrice_SizesetAll(colDel.items[i].data.productid_link);
                        }
                        me.calPrice_PairProduct();
                    }
                }
            });
        }
    },
    
    onItemSelect: function(m, rec){
        var viewModel = this.getViewModel();
        viewModel.set('po_price', rec.data);

        var Price_DStore = viewModel.getStore('Price_DStore');
        Price_DStore.loadData(rec.data.pcontract_price_d);
    },
    onSizesetItemEdit: function(editor, e){
        var viewmodel = this.getViewModel();
        var priceStore = viewmodel.getStore('PriceStore');
        var price_data = e.record.data;

        priceStore.clearFilter();
        var total = 0;
        // priceStore.each(function (record) {
        //     //Neu la lenh moi (sencha tu sinh id) --> set = null
        //     if(record.data.sizesetid_link == price_data.sizesetid_link) record.data.quantity = price_data.quantity;
        // });
        var length = priceStore.data.length;
        for(var i=1; i< length; i++){
            var record = priceStore.data.items[i];
            if(record.data.sizesetid_link == price_data.sizesetid_link) record.data.quantity = price_data.quantity;

            if(i<length-1){
                total+= record.data.quantity;
            }
        }
        var rec = priceStore.data.items[length-1];
        var recAll = priceStore.data.items[0];
        rec.set('quantity', recAll.data.quantity - total);

        priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
    },
    onSizesetBeforeEdit: function(editor, context, eOpts){
        if (context.record.data.sizesetid_link ==1) context.cancel = true;
    },
    renderSum: function(value, summaryData, dataIndex){
        var viewmodel = this.getViewModel();
        var po_totalorder = viewmodel.get('po.po_quantity');
        if (null == po_totalorder) po_totalorder = 0;
        if (null == value) value = 0;
        if (po_totalorder != value){
            viewmodel.set('isSizeset_CheckOK', false);
            return '<div style="font-weight: bold; color:red;">' + Ext.util.Format.number(value, '0,000') + '</div>';   
        }
        else {
            viewmodel.set('isSizeset_CheckOK', true);
            return '<div style="font-weight: bold; color:black;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
        }
    },
    //Cong don cho sizeset ALL theo binh quan gia quyen
    calPrice_SizesetAll: function(productid){
        console.log(productid);
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
            sum_price_sewingtarget = sum_price_sewingtarget + price_sizeset.price_sewingtarget*price_sizeset.quantity;
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
                price_SizesetALL.price_sewingtarget = Ext.Number.roundToPrecision(sum_price_sewingtarget/sum_quantity,0);
                price_SizesetALL.price_sewingcost = Ext.Number.roundToPrecision(sum_price_sewingcost/sum_quantity,0);
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
    renderValue: function (value, metaData, record, rowIndex) {
        if (null == value) value = 0;
        return Ext.util.Format.number(value, '0,000');    
    }  
})