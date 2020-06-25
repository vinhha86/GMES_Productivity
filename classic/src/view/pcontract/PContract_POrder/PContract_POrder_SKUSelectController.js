Ext.define('GSmartApp.view.pcontract.PContract_POrder_SKUSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrder_SKUSelectController',
    init: function(){
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontract_poid_link =  this.getView().pcontract_poid_link;
        var pcontractid_link =  this.getView().pcontractid_link;
        // console.log(productid_link);
        storeSku.loadStoreByPO(pcontractid_link, pcontract_poid_link);
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
                        } else {
                            me.fireEvent("SKUSave");
                        }
                    }
                })                
            }  
            
        }
    
    }
})