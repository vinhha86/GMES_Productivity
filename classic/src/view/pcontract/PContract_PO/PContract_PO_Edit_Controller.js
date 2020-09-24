Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        var ctrportfromto = Ext.getCmp('PContract_PO_Edit_Info_PortFromTo');
        if (ctrportfromto){
            ctrportfromto.setHidden(true);
        }
        
        var CurrencyStore = viewmodel.getStore('CurrencyStore');
        CurrencyStore.loadStore();
        var PackingTypeStore = viewmodel.getStore('PackingTypeStore');
        PackingTypeStore.loadStore();
        var QCOrgStore = viewmodel.getStore('QCOrgStore');
        QCOrgStore.GetOrgByTypeId(16);
        var ShipModeStore  =  viewmodel.getStore('ShipModeStore');
        ShipModeStore.loadStore();
        ShipModeStore.getSorters().add('name');

        var productStore = viewmodel.getStore('ProductStore');
        var productpairid_link = viewmodel.get('productpairid_link');
        productStore.loadStore_bypairid_Async(productpairid_link, null, false);

		productStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				} else {
                    var productStore = viewmodel.getStore('ProductStore');
                    this.enablePrice(productStore.getAt(0));

                    if(viewmodel.get('id') > 0){
                        this.getInfo(viewmodel.get('id'));
                    } else {
                        this.getInfo(null);
                    }
                }
			}
		});        
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu' : {
            click: 'onSave'
        },
        '#cboProduct': {
            select: 'onProductSelect'
        }
    },
    getInfo: function(id){
        var m = this;
        var me = this.getView();
        var viewmodel = this.getViewModel();
        if (null != id){
            var params = new Object();
            params.id = id;
            GSmartApp.Ajax.post('/api/v1/pcontract_po/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        viewmodel.set('po', response.data);
                        if(response.data.currencyid_link == null || response.data.currencyid_link == 0){
                            m.setDefaultCurrency(); // để mặc định là usd
                        }

                        //Chuyen packing notice ve array
                        var packing_str = response.data.packingnotice;
                        if(packing_str!=null){
                            var packing_arr = packing_str.split(';');
                            viewmodel.set('po.packingnotice', packing_arr);
                        }
                        
                        
                        var store = viewmodel.getStore('PriceStore');
                        store.clearFilter();
                        store.removeAll();
                        store.insert(0 , response.data.pcontract_price); 
                        me.down('#PContract_PO_Edit_Sizeset').getSelectionModel().select(0);
                        
                        store.filter('productid_link',viewmodel.get('product_selected_id_link'));

                        //Lay danh sach POrder_Req
                        var porderReqStore = viewmodel.getStore('porderReqStore');
                        porderReqStore.loadByPO(viewmodel.get('po.id'));
                    }
                }
            })
        } else {
            var new_po = new GSmartApp.model.pcontract.PContractPO();
            new_po.data.id = null;
            new_po.data.po_quantity = null;
            new_po.data.pcontractid_link = viewmodel.get('pcontractid_link');
            new_po.data.productid_link = viewmodel.get('productpairid_link');
            new_po.set('isauto_calculate', true);
            viewmodel.set('po', new_po.data);
            m.setDefaultCurrency(); // để mặc định là usd

            //Them sizeset all cho tat ca cac san pham
            var productStore = viewmodel.getStore('ProductStore');
            var priceStore = viewmodel.getStore('PriceStore');
            for(var k =0; k < productStore.data.length; k++){
                var p_data = productStore.data.items[k].data;
                var newSizeset = new Object();
                var pcontract_price_d = [];
                //Mac dinh them price CMP
                var newPriceD = new Object({
                    id: null,
                    isfob: false,
                    fobprice_name : 'Giá CMP',
                    fobpriceid_link: 1,
                    price : 0,
                    cost: 0,
                    productid_link: p_data.id
                })  
                pcontract_price_d.push(newPriceD);  
                
                var newSizeset = new Object();
                newSizeset.pcontractid_link = new_po.data.pcontractid_link;
                newSizeset.pcontract_poid_link = new_po.data.id;
                newSizeset.productid_link =p_data.id;
                newSizeset.sizesetid_link = 1;
                newSizeset.sortvalue = 1;
                newSizeset.sizesetname = 'ALL';
                newSizeset.price_cmp = null;
                newSizeset.price_fob = null;
                newSizeset.price_sewingcost = null;
                newSizeset.price_sewingtarget = null;
                newSizeset.salaryfund = null;
                newSizeset.totalprice = null;
                newSizeset.pcontract_price_d = pcontract_price_d;
                priceStore.insert(0,newSizeset);
            }            
        }
    },
    setDefaultCurrency: function(){
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.id = 1;
        GSmartApp.Ajax.post('/api/v1/currency/getone', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                var response = Ext.decode(response.responseText);
                if(response.respcode == 200){
                    viewmodel.set('po.currencyid_link', response.data.id);
                    viewmodel.set('po.exchangerate', response.data.exchangerate);
                }
            }
        })

    },
    onThoat: function(){
        // this.getView().up('window').close();
        this.fireEvent('Thoat');
    },
    CheckValidate: function(){
        var viewmodel = this.getViewModel();
        var mes = "";
        // if(viewmodel.get('plan.comment') == "" || viewmodel.get('plan.comment') == null){
        //     mes = "Bạn chưa nhập ghi chú";
        //     return mes;
        // }
        return mes;
    },
    onSave: function(){
        var me = this;
        var viewmodel = this.getViewModel();
        var priceStore = viewmodel.getStore('PriceStore');
        var porderReqStore = viewmodel.getStore('porderReqStore');

        //Xoa filter trc khi day len server
        priceStore.clearFilter();

        //Chuyen thanh dang array de dua vào po object
        var arrPrice = [];   
        priceStore.each(function (record) {
            record.data.id = null;
            for(i=0;i<record.data.pcontract_price_d.length;i++){
                record.data.pcontract_price_d[i].id = null;
            }
            arrPrice.push(record.data);
        });  
        viewmodel.set('po.pcontract_price',arrPrice);

        //Khoi phuc filter
        priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));

        //Call API
        var mes = me.CheckValidate();
        if(mes == ""){
            var params = new Object();
            var packing_arr = viewmodel.get('po.packingnotice')+""; 
            var packingnotice = '';
            for(i=0;i<packing_arr.length;i++){
                packingnotice = packingnotice + packing_arr[i];
                if (i < packing_arr.length-1) packingnotice = packingnotice  + ';';
            } 
            viewmodel.set('po.packingnotice',packingnotice); 
            params.data = viewmodel.get('po');
            params.data.po_quantity = viewmodel.get('po.po_quantity') == null ? 0 : parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi,''));
            params.data.exchangerate = viewmodel.get('po.exchangerate') == null ? 0 : parseFloat(viewmodel.get('po.exchangerate').toString().replace(/,/gi,''));
            //Set trang thai cho PO
            // if (viewmodel.get('isSizeset_CheckOK') == false || viewmodel.get('isPorderReq_CheckOK') == false)
            //     params.data.status = -2
            // else
            //     params.data.status = -1

            var arrPOrders = [];
            // porderStore.each(function (record) {
            //     //Neu la lenh moi (sencha tu sinh id) --> set = null
            //     if(!Ext.isNumber(record.data.id)) record.data.id = null;
            //     arrPOrders.push(record.data);
            // });
            
            porderReqStore.each(function (record) {
                //Neu la lenh moi (sencha tu sinh id) --> set = null
                if(!Ext.isNumber(record.data.id)) record.data.id = null;
                // var porder = new Object();
                // porder.granttoorgid_link = record.data.granttoorgid_link;
                // porder.totalorder = record.data.totalorder;
                delete record.data.product;

                arrPOrders.push(record.data);
            });
            params.po_orders = arrPOrders;

            // params.list_price = me.getListPrice();
            params.pcontractid_link = viewmodel.get('pcontractid_link');
            // console.log(params);
            // console.log(Ext.JSON.encode(params));
            // return;

            GSmartApp.Ajax.post('/api/v1/pcontract_po/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                       
                        if(response.respcode == 200){
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Lưu thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                },
                                fn: function(){
                                    me.getInfo(response.id);
                                }
                            });
                        }
                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        }
        else{
            Ext.Msg.show({
                title: 'Thông báo',
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        
    },
    onProductSelect: function(sender, record){
         this.enablePrice(record);
    },

    enablePrice: function(record){
        var viewPrice = Ext.getCmp('PContract_PO_Edit_Price');
        var viewPriceSumUp = Ext.getCmp('PContract_PO_Edit_PriceSumUp');
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        

        var viewmodel = this.getViewModel();
        viewmodel.set('product_selected_id_link', record.get('id'));
        viewmodel.set('product_selected_typeid_link', record.get('product_type'));
        // console.log(viewmodel.get('productpairid_link'));

        if (record.get('product_type') == 5){
            viewPrice.setDisabled(true);
            viewmodel.set('isSewPriceReadonly', true);
        }
        else {
            viewPrice.setDisabled(false);   
            viewmodel.set('isSewPriceReadonly', false);
        }   

        var priceStore = viewmodel.getStore('PriceStore');
        priceStore.clearFilter(); 
        priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
        // priceStore.filters.remove('granttoorgid_link');
        viewSizeset.getView().select(0);
    },
    // onSewCostChange: function (sender, newValue, oldValue, eOpts) {
    //     var viewmodel = this.getViewModel();
    //     var po_data = viewmodel.get('po');
    //     var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
    //     if (null != viewSizeset.getView().selection){
    //         var price_data = viewSizeset.getView().selection.data;
    //         //Tinh Salary Fund
    //         price_data.salaryfund = price_data.price_sewingcost*price_data.quantity;
    //         viewmodel.set('po_price',price_data);

    //         this.calRootPairProductPrice(price_data.sizesetid_link);    
    //     }
    // },
    // //Cong don cho bo san pham
    // calRootPairProductPrice: function(sizesetid_link){
    //     var viewmodel = this.getViewModel();
    //     if (viewmodel.get('isproductpair') == 1){
    //         var priceStore = viewmodel.getStore('PriceStore');
    //         filters = priceStore.getFilters();

    //         filters.add({
    //             // id: 'porderFilter',
    //             property: 'productid_link',
    //             operator: '!=',
    //             value: viewmodel.get('productpairid_link'),
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //         filters.add({
    //             // id: 'porderFilter',
    //             property: 'sizesetid_link',
    //             operator: '=',
    //             value: sizesetid_link,
    //             anyMatch: true,
    //             caseSensitive: false
    //         });

    //         var sum_price_cmp = priceStore.sum('price_cmp');
    //         var sum_price_fob = priceStore.sum('price_fob');
    //         var sum_price_sewingtarget = priceStore.sum('price_sewingtarget');
    //         var sum_price_sewingcost = priceStore.sum('price_sewingcost');
    //         var sum_totalprice = priceStore.sum('totalprice');
    //         var sum_salaryfund = priceStore.sum('salaryfund');

    //         priceStore.clearFilter();
    //         filters.add({
    //             // id: 'porderFilter',
    //             property: 'productid_link',
    //             operator: '=',
    //             value: viewmodel.get('productpairid_link'),
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //         filters.add({
    //             // id: 'porderFilter',
    //             property: 'sizesetid_link',
    //             operator: '=',
    //             value: sizesetid_link,
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //         for(var k =0; k<priceStore.data.length; k++){
    //             var price_root = priceStore.data.items[k].data;
    //             price_root.price_cmp = sum_price_cmp;
    //             price_root.price_fob = sum_price_fob;
    //             price_root.price_sewingtarget = sum_price_sewingtarget;
    //             price_root.price_sewingcost = sum_price_sewingcost;
    //             price_root.totalprice = sum_totalprice;
    //             price_root.salaryfund = sum_salaryfund;
    //         };  
    //         priceStore.clearFilter();
    //         priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
    //     }
    // },    
})