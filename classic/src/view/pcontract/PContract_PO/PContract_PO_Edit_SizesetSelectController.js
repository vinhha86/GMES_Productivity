Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_SizesetSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_SizesetSelectController',
    init: function(){
        var parent = Ext.getCmp('PContract_PO_Edit');
        var p_viewmodel = parent.getViewModel();

        var viewmodel = this.getViewModel();
        var sizesetStore = viewmodel.getStore('SizeSetStore');
        sizesetStore.loadStore();
		sizesetStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				} else {
                    //remove sizeset that have been selected to PO
                    var priceStore = p_viewmodel.getStore('PriceStore');
                    for(var k =0; k < priceStore.data.length; k++){
                        var p_data = priceStore.data.items[k].data;
                        var fSizeset = sizesetStore.findRecord('id', p_data.sizesetid_link);
                        if (null != fSizeset){
                            sizesetStore.remove(fSizeset);
                        }
                    } 
                }
			}
		});  
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
        var parent = Ext.getCmp('PContract_PO_Edit');
        var p_viewmodel = parent.getViewModel();
        var productStore = p_viewmodel.getStore('ProductStore');
        var priceStore = p_viewmodel.getStore('PriceStore');
        console.log(priceStore);


        var me = this.getView();
        var po = p_viewmodel.get('po');
        var po_pricelist = po.pcontract_price;
        var select = me.getSelectionModel().getSelection();   

        if(select.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn dải cỡ',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        } else {
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;

                //Them Sizeset cho tat ca cac san pham trong bo
                for(var k =0; k < productStore.data.length; k++){
                    var p_data = productStore.data.items[k].data;
                    var newSizeset = new Object();
                    newSizeset.pcontractid_link = po.pcontractid_link;
                    newSizeset.pcontract_poid_link = po.id;
                    newSizeset.productid_link =p_data.id;
                    newSizeset.sizesetid_link = data.id;
                    newSizeset.sizesetname = data.name;
                    newSizeset.price_cmp = null;
                    newSizeset.price_fob = null;
                    newSizeset.price_sewingcost = null;
                    newSizeset.price_sewingtarget = null;
                    newSizeset.salaryfund = null;
                    newSizeset.totalprice = null;
                    priceStore.insert(0,newSizeset);
                }
            }  

            this.onThoat();
        }
    
    }
})