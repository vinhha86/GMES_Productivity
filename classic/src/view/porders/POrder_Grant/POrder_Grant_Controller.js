Ext.define('GSmartApp.view.porders.POrder_Grant_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Controller',
    init: function(){
        var me = this.getView();
        var viewmodel =  this.getViewModel();

        viewmodel.set('granttoorgid_link', me.granttoorgid_link);
        viewmodel.set('granttoorg_name', me.granttoorg_name);

        //Lay thong tin POrder
        if (null != me.porderid_link){
            var params = new Object();
            params.porderid_link = me.porderid_link;
            GSmartApp.Ajax.post('/api/v1/porder/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        viewmodel.set('porder', response.data);
                        
                        //Lay danh sach PorderSKU
                        // var porderStore = viewmodel.getStore('POrderStore');
                        // porderStore.loadByPO(viewmodel.get('pcontractid_link'),viewmodel.get('po.id'));

                        //Lay danh sach Grantt SKU
                    }
                }
            })
        }        
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },    
    onThoat: function () {
        this.getView().up('window').destroy();
    },
    onLuu: function () {
        var me = this.getView();
        var porderid_link = me.porderid_link;
        var viewmodel = this.getViewModel();

        var select = me.getSelectionModel().getSelection();   

        if(select.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        } else {
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                var newSKU = new Object();
                newSKU.id = null;
                newSKU.porderid_link = porderid_link;
                newSKU.productid_link = data.productid_link;
                newSKU.skuid_link = data.skuid_link;
                newSKU.pquantity_sample = data.pquantity_sample;
                newSKU.pquantity_porder = data.pquantity_porder;
                newSKU.pquantity_total = data.pquantity_total;

                var params = new Object();
                params.data = newSKU;

                GSmartApp.Ajax.post('/api/v1/porder/create_sku', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            console.log(response.message);
                        }
                    }
                })                
            }  
            // var parent = Ext.getCmp('PContract_POrder_PorderSKU');
            // parent.getView().store.loadByPorderID(porderid_link);

            this.onThoat();
        }
    
    }
})