Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.PriceDSKU.PContract_PO_Edit_Price_D_SKUController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Price_D_SKUController',
    init: function(){
    },
    control: {      
        // '#btnThemMoiGia': {
        //     click: 'onThemMoiGia'
        // },
        // '#btnPriceCopy': {
        //     click: 'onPriceCopy'
        // },
        // '#btnPricePaste': {
        //     click: 'onPricePaste'
        // },
        // '#PContract_PO_Edit_Price': {
        //     // beforecelldblclick: 'onBeforePriceCellDblClick',
        //     celldblclick: 'onPriceCellDblClick'
        // }
    },
    onPriceDSKUItemBeforeEdit:function(){},
    onPriceDSKUItemEdit:function(editor, context){
        // console.log(context);
        var viewModel = this.getViewModel();
        var Price_D_SKUStore = viewModel.getStore('Price_D_SKUStore');
        var price_d_record = viewModel.get('price_d_record');

        if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
            Price_D_SKUStore.rejectChanges(); //commitChanges()
            return;
        }

        var amount = 0;
        var unitprice = 0;

        if(context.record.get('amount') != null && !isNaN(context.record.get('amount'))){
            amount = context.record.get('amount');
        }
        if(context.record.get('unitprice') != null && !isNaN(context.record.get('unitprice'))){
            unitprice = context.record.get('unitprice');
        }
        context.record.set('totalprice', amount*unitprice);
        Price_D_SKUStore.commitChanges(); //commitChanges()

        this.reCalculatePriceDUnitprice(price_d_record);
    },
    reCalculatePriceDUnitprice:function(price_d_record){
        var viewModel = this.getViewModel();
        var Price_DStore = viewModel.getStore('Price_DStore');
        var pcontract_price_d_sku = price_d_record.get('pcontract_price_d_sku');
        // console.log(price_d_record);
        // console.log(pcontract_price_d_sku);

        // tính tổng sl và tổng giá
        var amountSum = 0;
        var totalpriceSum = 0;

        for(var i = 0; i < pcontract_price_d_sku.length; i++) {
            var amount = parseFloat(pcontract_price_d_sku[i].amount);
            var unitprice = parseFloat(pcontract_price_d_sku[i].unitprice);

            if(!isNaN(amount)  &&  !isNaN(unitprice)){
                if(amount!= 0 && unitprice != 0){
                    var totalprice = amount * unitprice;
                    amountSum+=amount;
                    totalpriceSum+=totalprice;
                }
            }else{
                continue;
            }
        }

        // set đơn giá cho price_d
        var priceD_Unitprice = 0;
        if(amountSum > 0){
            priceD_Unitprice = totalpriceSum/amountSum;
        }
        price_d_record.set('unitprice', priceD_Unitprice);

        // tính giá chào cho price_d
        var priceD_lost_ratio = parseFloat(price_d_record.get('lost_ratio'));
        var priceD_quota = parseFloat(price_d_record.get('quota'));
        var priceD_price = 0;

        if(priceD_quota != null){
            if(priceD_lost_ratio != null){
                priceD_price = priceD_quota * priceD_Unitprice * (1 + priceD_lost_ratio/100)
            }else{
                priceD_price = priceD_quota * priceD_Unitprice;
            }
        }
        // console.log(priceD_lost_ratio);
        // console.log(priceD_quota);
        // console.log(priceD_Unitprice);
        // console.log(priceD_price);
        price_d_record.set('price', priceD_price);
        Price_DStore.commitChanges();

        this.calculateSumFOB();
    },
    calculateSumFOB: function(){
        var viewModel = this.getViewModel();
        var PContract_PO_Edit_PriceView = Ext.getCmp('PContract_PO_Edit_Price');
        var PContract_PO_Edit_PriceViewController = PContract_PO_Edit_PriceView.getController();
        // tính tổng fob
        var Price_DStore = viewModel.getStore('Price_DStore');
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        var price_data = viewSizeset.getView().selection.data;

        Price_DStore.filter('isfob',true);
        var fobSum = Price_DStore.sum('price');
        Price_DStore.clearFilter();
        price_data.price_fob = fobSum;
        var totalprice = price_data.price_cmp + price_data.price_fob;
        price_data.totalprice = totalprice;
        // console.log(totalprice);
        
        viewModel.set('po_price',price_data);

        //Neu khong phai la sizesetAll --> Tinh toan cho SizesetAll cua san pham do
        if (price_data.sizesetid_link != 1){
            PContract_PO_Edit_PriceViewController.calPrice_SizesetAll(viewModel.get('product_selected_id_link'));
        }

        //Tinh SizesetAll cho san pham cha
        PContract_PO_Edit_PriceViewController.calPrice_PairProduct();
    },
    onMenu_PriceDSKUList: function(grid, rowIndex, colIndex, item, e, record){
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Xoá chi tiết giá SKU',
                reference: 'deletePriceD',
                separator: true,
                margin: '0 0 0',
                iconCls: 'x-fa fas fa-trash violetIcon',
                handler: function() {
                    // var record = this.parentMenu.record;
                    me.onPriceDSKU_Delete(grid, rowIndex, colIndex);
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
    onPriceDSKU_Delete: function(grid, rowIndex, colIndex){
        var viewModel = this.getViewModel();
        var me=this;
        var price_d_record = viewModel.get('price_d_record');
        var price_d_sku_record = viewModel.get('price_d_sku_record');

        Ext.Msg.show({
            title: "Thông báo",
            msg: 'Bạn có chắc chắn muốn xóa dòng chi tiết giá SKU?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function(btn){
                if(btn==='yes'){
                    var objDel = grid.getStore().getAt(rowIndex);
                    grid.getStore().remove(objDel);

                    console.log(price_d_record);
                    console.log(price_d_sku_record);
                    console.log(objDel);

                    var materialid_link = objDel.get('materialid_link');
                    const condition = (obj) => obj.materialid_link == materialid_link;
                    var index = price_d_sku_record.findIndex(condition);
                    price_d_sku_record.splice(index, 1);

                    // var result = price_d_sku_record.filter(obj => {
                    //     return obj.materialid_link == materialid_link
                    // })
                    // price_d_sku_record

                    me.reCalculatePriceDUnitprice(price_d_record);
                }
            }
        });
    },
})