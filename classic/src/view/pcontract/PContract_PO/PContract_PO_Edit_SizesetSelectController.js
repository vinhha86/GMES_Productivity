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
                    var po_pricelist = p_viewmodel.get('po.pcontract_price');
                    console.log(po_pricelist);
                    for(var i in po_pricelist){
                        var fSizeset = sizesetStore.findRecord('id', po_pricelist[i].sizesetid_link);
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
                var newSizeset = new Object();
                newSizeset.pcontractid_link = po.pcontractid_link;
                newSizeset.pcontract_poid_link = po.id;
                newSizeset.productid_link = p_viewmodel.get('productid_link');
                newSizeset.sizesetid_link = data.id;
                newSizeset.sizesetname = data.name;
                po_pricelist.push(newSizeset);
            }  
            console.log(po);
            p_viewmodel.set('po', po);
            this.onThoat();
        }
    
    }
})