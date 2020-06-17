Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        var productStore = viewmodel.getStore('ProductStore');
        var productid_link = viewmodel.get('productpairid_link');
        productStore.loadStore_bypairid_Async(productid_link);

		productStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				} else {
                    var productStore = viewmodel.getStore('ProductStore');
                    this.enablePrice(productStore.getAt(0));
                }
			}
		});        
      

        if(viewmodel.get('plan.id') > 0){
            this.getInfo(viewmodel.get('plan.id'));
        } else {
            this.getInfo(null);
        }

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu' : {
            click: 'onSave'
        },
        '#btnThemMoiGia': {
            click: 'onThemMoiGia'
        },
        '#cboProduct': {
            select: 'onProductSelect'
        }
    },
    getInfo: function(id){
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
                        var store = viewmodel.getStore('PriceStore');
                        store.removeAll();
                        store.insert(0 , response.data.pcontract_price);               
                    }
                }
            })
        } else {
            var new_po = new GSmartApp.model.pcontract.PContractPO();
            viewmodel.set('po', new_po);
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
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

        //Xoa filter trc khi day len server
        priceStore.clearFilter();

        //Chuyen thanh dang array de dua vào po object
        var arrPrice = [];   
        priceStore.each(function (record) {
            record.data.id = null;
            arrPrice.push(record.data);
        });  
        viewmodel.set('po.pcontract_price',arrPrice);
        console.log(viewmodel.get('po.pcontract_price'));

        //Call API
        var mes = me.CheckValidate();
        if(mes == ""){
            var params = new Object();
            params.data = viewmodel.get('po');
            // params.list_price = me.getListPrice();
            params.pcontractid_link = viewmodel.get('pcontractid_link');
            console.log(params);
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
    onDropOrg: function(node, data, dropRec, dropPosition){
        // console.log(data.records[0].get('Id'));
        // console.log(data.records[0].get('Name'));
        // console.log(data.records[0].get('parentOrgId'));
        // console.log(data.records[0].get('parentName'));
        // var OrgGrantedStore = this.getViewModel().getStore('OrgGrantedStore');
        // OrgGrantedStore.add(
        //     {
        //         granttoorgid_link: data.records[0].get('parentOrgId'),
        //         granttoorg_name: data.records[0].get('parentName'),
        //         granttolineid_link: data.records[0].get('Id'),
        //         granttoline_name: data.records[0].get('Name'),
        //     }
        // );
        data.records[0].set('granttoorg_name',data.records[0].get('parentName'));
        data.records[0].set('granttoline_name',data.records[0].get('Name'));
        data.records[0].set('grantamount',0);
    },    
    onBeforeDropOrg:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
        dropHandlers.wait = true;
        var OrgGrantedStore = this.getViewModel().getStore('OrgGrantedStore');
        console.log(data.records[0].get('Id'));
        var orgRec = OrgGrantedStore.findRecord('granttolineid_link', data.records[0].get('Id'));

        if (null == orgRec) {
            dropHandlers.processDrop();
        } else {
            Ext.Msg.show({ 
                title: 'Phân chuyền',
                msg: 'Tổ chuyền đã được chọn'
                });            
            dropHandlers.cancelDrop();
        }
        
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
            var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
            // var storeDPrice = viewmodel.getStore('Price_DStore');
            var pcontract_price_d = viewSizeset.selection.data.pcontract_price_d;
            var viewPrice = Ext.getCmp('PContract_PO_Edit_Price');
            var storeDPrice = viewPrice.getView().getStore();
            for(var i=0;i<select.length;i++){
                var data = select[i].data;
                var rec = null;//storeDPrice.findRecord('fobprice_name', data.name);
                if(rec == null) {
                    var newRec = new Object({
                        fobprice_name : data.name,
                        fobpriceid_link: data.id,
                        price : 0,
                        cost: 0,
                        productid_link: viewmodel.get('productpairid_link')
                    })
                    pcontract_price_d.push(newRec);
                    // storeDPrice.insert(0 , newRec);
                }
            }
            var priceStore = viewmodel.getStore('PriceStore');
            console.log(priceStore);
            console.log(pcontract_price_d);
            form.close();
        })
    },
    getListPrice: function(){
        var viewmodel = this.getViewModel();
        var priceStore = viewmodel.getStore('PriceStore');

        var list = [];
        for(var i =0; i<priceStore.data.length; i++){
            var data = priceStore.data.items[i].data;
            var price = new Object();
            price.productid_link = data.productid_link;
            price.price = data.price;
            price.cost = data.cost;
            price.isfob = data.isfob == null ? false : data.isfob;
            price.status = 0;
            price.fobpriceid_link = data.fobpriceid_link;

            list.push(price);
        }
        return list;
    },
    onProductSelect: function(sender, record){
         this.enablePrice(record);
    },

    enablePrice: function(record){
        var viewPrice = Ext.getCmp('PContract_PO_Edit_Price');
        var viewPriceSumUp = Ext.getCmp('PContract_PO_Edit_PriceSumUp');
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        

        var viewmodel = this.getViewModel();
        viewmodel.set('productid_link', record.get('id'));
        viewmodel.set('producttypeid_link', record.get('producttypeid_link'));

        if (record.get('producttypeid_link') == 5){
            viewPrice.setDisabled(true);
        }
        else {
            viewPrice.setDisabled(false);   
        }   

        var priceStore = viewmodel.getStore('PriceStore');
        priceStore.clearFilter(); 
        priceStore.filter('productid_link',record.get('id'));
        // priceStore.filters.remove('granttoorgid_link');
        viewSizeset.getView().select(0);
    }

})