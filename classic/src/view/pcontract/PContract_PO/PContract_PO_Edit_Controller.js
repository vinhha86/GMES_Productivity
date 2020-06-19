Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        var productStore = viewmodel.getStore('ProductStore');
        var productpairid_link = viewmodel.get('productpairid_link');
        console.log(productpairid_link);
        productStore.loadStore_bypairid_Async(productpairid_link);

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
      

        if(viewmodel.get('id') > 0){
            this.getInfo(viewmodel.get('id'));
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
            new_po.data.id = null;
            new_po.data.pcontractid_link = viewmodel.get('pcontractid_link');
            new_po.data.productid_link = viewmodel.get('productpairid_link');
            viewmodel.set('po', new_po.data);
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
            for(i=0;i<record.data.pcontract_price_d.length;i++){
                record.data.pcontract_price_d[i].id = null;
            }
            arrPrice.push(record.data);
        });  
        viewmodel.set('po.pcontract_price',arrPrice);

        //Khoi phu filter
        priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));

        //Call API
        var mes = me.CheckValidate();
        if(mes == ""){
            var params = new Object();
            params.data = viewmodel.get('po');
            // params.list_price = me.getListPrice();
            params.pcontractid_link = viewmodel.get('pcontractid_link');
            console.log(params);
            console.log(Ext.JSON.encode(params));
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
        console.log(viewmodel.get('productpairid_link'));

        if (record.get('product_type') == 5){
            viewPrice.setDisabled(true);
        }
        else {
            viewPrice.setDisabled(false);   
        }   

        var priceStore = viewmodel.getStore('PriceStore');
        priceStore.clearFilter(); 
        priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
        // priceStore.filters.remove('granttoorgid_link');
        viewSizeset.getView().select(0);
    }

})