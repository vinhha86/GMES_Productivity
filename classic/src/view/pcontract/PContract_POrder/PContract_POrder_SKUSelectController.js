Ext.define('GSmartApp.view.pcontract.PContract_POrder_SKUSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrder_SKUSelectController',
    init: function(){
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontract_poid_link =  this.getView().pcontract_poid_link;
        var pcontractid_link =  this.getView().pcontractid_link;
        console.log(pcontract_poid_link);
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
                    var pcontract_price_d = [];
                    //Neu da co Price --> Lay danh sach PriceD de dua vao cac Price moi
                    if (priceStore.data.length > 0){
                        var price_data = priceStore.data.items[0].data;
                        for(var j =0; j < price_data.pcontract_price_d.length; j++){
                            var price_d = price_data.pcontract_price_d[j];
                            var newPriceD = new Object({
                                id: null,
                                fobprice_name : price_d.fobprice_name,
                                fobpriceid_link: price_d.fobpriceid_link,
                                price : 0,
                                cost: 0,
                                productid_link: p_data.id
                            })  
                            pcontract_price_d.push(newPriceD);
                        }
                    }
                    newSizeset.pcontractid_link = po.pcontractid_link;
                    newSizeset.pcontract_poid_link = po.id;
                    newSizeset.productid_link =p_data.id;
                    newSizeset.sizesetid_link = data.id;
                    newSizeset.sizesetname = data.name;
                    newSizeset.price_cmp = null;
                    newSizeset.price_fob = null;
                    //Mac dinh price_sewingtarget =  20% price_cmp (tinh theo tien viet)
                    newSizeset.sewfobratio = 20;
                    newSizeset.price_sewingcost = null;
                    newSizeset.price_sewingtarget = null;
                    newSizeset.salaryfund = null;
                    newSizeset.totalprice = null;
                    newSizeset.pcontract_price_d = pcontract_price_d;
                    priceStore.insert(0,newSizeset);
                }
            }  
            var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
            viewSizeset.getView().select(0);
            this.onThoat();
        }
    
    }
})