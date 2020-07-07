Ext.define('GSmartApp.view.pcontract.PContract_PO_Shipping_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Shipping_Main_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        if(viewmodel.get('id') > 0){
            this.getInfo(viewmodel.get('id'));
        } else {
            this.getInfo(null);
        }
        
        var PortStore = viewmodel.getStore('PortStore');
        PortStore.loadStore(null,null);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu' : {
            click: 'onSave'
        }
    },
    getInfo: function(id){
        var viewmodel = this.getViewModel();
        if (null != id){
            var params = new Object();
            params.id = id;
            GSmartApp.Ajax.post('/api/v1/po_shipping/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        viewmodel.set('shipping', response.data);
                    }
                }
            })
        } else {
            var new_shipping = new GSmartApp.model.pcontract.PContractPO_Shipping();
            new_shipping.data.id = null;

            //Lay thong tin parent po
            var params = new Object();
            params.id = viewmodel.get('pcontract_poid_link');
            GSmartApp.Ajax.post('/api/v1/pcontract_po/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    if(response.respcode == 200){
                        var parent_po = response.data;
                        new_shipping.data.pcontract_poid_link = parent_po.id;
                        new_shipping.data.pcontractid_link = parent_po.pcontractid_link;
                        new_shipping.data.productid_link = parent_po.productid_link;
                        new_shipping.data.shipdate = parent_po.shipdate;
                        new_shipping.data.shipamount = 0;
                        new_shipping.data.packingnotice = parent_po.packingnotice;
                        
                        viewmodel.set('shipping', new_shipping.data);
                    }
                }
            })            
           
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onSave: function(){
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = viewmodel.get('shipping');

        var arrShippingD = [];
        var Shipping_DStore = viewmodel.get('Shipping_DStore');
        
        Shipping_DStore.each(function (record) {
            //Neu la lenh moi (sencha tu sinh id) --> set = null
            if(!Ext.isNumber(record.data.id)) record.data.id = null;
            arrShippingD.push(record.data);
        });
        params.shipping_d = arrShippingD;

        GSmartApp.Ajax.post('/api/v1/po_shipping/create', Ext.JSON.encode(params),
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
    },
    onAddSKUTap: function(){
        var viewmodel = this.getViewModel();
        var shipping = viewmodel.get('shipping');
        console.log(shipping);
        var me = this;
        if (null != shipping){
            var form = Ext.create('Ext.window.Window', {
                height: 500,
                closable: true,
                title: 'Chi tiết màu, cỡ',
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
                    xtype: 'PContract_POrder_SKUSelect',
                    pcontract_poid_link: shipping.pcontract_poid_link,
                    pcontractid_link: shipping.pcontractid_link
                }]
            });
            form.show();
            //Refresh Data
            //Refresh Data
            form.down('#PContract_POrder_SKUSelect').on('SKUSave', function (select) {
                var Shipping_DStore = viewmodel.get('Shipping_DStore');
                for (var i = 0; i < select.length; i++) {
                    var data = select[i].data;
                    console.log(data);
                    var newShipping_D = new Object();
                    newShipping_D.id = null;
                    newShipping_D.skuid_link = data.skuid_link;
                    newShipping_D.skucode = data.skuCode;
                    newShipping_D.mauSanPham = data.mauSanPham;
                    newShipping_D.coSanPham = data.coSanPham;
                    newShipping_D.amount = data.pquantity_total;
                    Shipping_DStore.insert(0,newShipping_D);
                }                  
                form.close();
            })       
        }        
    }
})