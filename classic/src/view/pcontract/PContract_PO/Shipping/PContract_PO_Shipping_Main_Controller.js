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
                        new_shipping.data.pcontract_poid_link = parent_po.pcontract_poid_link;
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
})